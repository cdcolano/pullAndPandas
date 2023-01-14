from fastapi import FastAPI, APIRouter
import time
from schemas import Prenda, PrendasCreate, PrendasUpdate, StockUpdate, EmployeeLogon, Stock, ValoracionInput,Comentario,Valoracion,UpdateImage, User, ComentarioInput, StockDecrement
import os
from fastapi import FastAPI, Body, HTTPException, status
from fastapi.responses import Response, JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, Field, EmailStr
from fastapi import FastAPI, File, UploadFile
from typing import List
import pymongo
import crud
from db import base # noqa: F401
from db.session import SessionLocal
import os
import fastapi
from fastapi.templating import Jinja2Templates
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
import shutil
from jose import jwt,JWTError
from fastapi import FastAPI, status, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.security import OAuth2PasswordBearer
from fastapi.responses import RedirectResponse
import pymongo
import requests

ACCESS_TOKEN_EXPIRE_MINUTES = 30  # 30 minutes
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 # 7 days
ALGORITHM = "HS256"
JWT_SECRET_KEY = "gfg_jwt_secret_key"


client = pymongo.MongoClient("mongodb+srv://deusto:deusto@cluster0.knpxqxl.mongodb.net/prendas?retryWrites=true&w=majority")
db = client.Comercial
try:
    db_employee = SessionLocal()
except:
    raise Exception("MYSQL DATABASE FOR EMPLOYEES NOT FOUND")

app = FastAPI(title="Prendas API", openapi_url="/openapi.json")

origins=["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
api_router = APIRouter()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="http://localhost:4000/clientes/signin" )
oauth2_scheme_admin = OAuth2PasswordBearer(tokenUrl="/employee/logon" )

async def get_current_user(token: str= Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY)#, algorithms=[ALGORITHM])
        userId = payload.get("userId")
        if userId is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    redirect_url='http://host.docker.internal:4000/clientes/{}'.format(userId)
    user = requests.get(
                url=redirect_url).json()
    user_ob=User(
        id_cliente=user['id_cliente'],
        email=user['email'],
        nombre=user['nombre'],
    )
    print(user_ob)
    return user_ob
async def get_is_admin(token: str= Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY)#, algorithms=[ALGORITHM])
        userId = payload.get("employeeId")
        if userId is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return 1

#def getPrenda():
    
def getPrenda(prenda_id):
    dictionary= db["prendas"].find_one({"id_prenda": prenda_id, "inactive":0})
    if dictionary!=None:
        prenda=Prenda(
            id_prenda=dictionary['id_prenda'],
            precio=dictionary['precio'],
            description=dictionary['description'],
            nombre=dictionary['nombre'],
            img=dictionary['img'],
            marca=dictionary['marca'],
            stocks=dictionary['stocks'],
        )
        try:
            prenda.comentarios=dictionary['comentarios']
        except:
            pass
        try:
            prenda.valoraciones=dictionary['valoraciones']
        except:
            pass
        print(prenda.comentarios)
        return prenda
    return None
@api_router.get("/", status_code=200)
def root(request: Request) -> dict:
    # p1=Prenda(
    #     id_prenda=0,
    #     description="hola",
    #     precio=10,
    #     nombre="prueba",
    #     marca="m1",
    #     stocks=[])
    # p2=Prenda(
    #     id_prenda=0,
    #     description="hola",
    #     precio=10,
    #     nombre="prueba",
    #     marca="m1",
    #     stocks=[])
    # products=[p1,p2]
    # templates = Jinja2Templates(directory="./")
    # marcas=['m1,m2']
    # r=templates.TemplateResponse("lista-productos.html", {'request':request,"products": [ob.__dict__ for ob in products], "marcas": marcas})
    # return r
    content = """
        <body>
        <form action="/uploadfiles/1" enctype="multipart/form-data" method="post">
        <input name="files" type="file" multiple>
        <input type="submit">
        </form>
        </body>
            """
    return HTMLResponse(content=content)


# New addition, path parameter
# https://fastapi.tiangolo.com/tutorial/path-params/
@api_router.get("/prendas/{prenda_id}", status_code=200)
def fetch_prenda(*, prenda_id: int) -> dict:
    """
    Fetch a single recipe by ID
    """
    return getPrenda(prenda_id)

@api_router.get("/prendas/", status_code=200, response_model=List[Prenda])
def fetch_prendas() -> dict:
    prendas=[]
    query= db["prendas"].find({"inactive":0})
    for dictionary in query:
        prenda=Prenda(
        id_prenda=dictionary['id_prenda'],
        precio=dictionary['precio'],
        description=dictionary['description'],
        nombre=dictionary['nombre'],
        img=dictionary['img'],
        marca=dictionary['marca'],
        stocks=dictionary['stocks'],
     )
        try:
            prenda.comentarios=dictionary['comentarios']
        except:
            pass
        try:
            prenda.valoraciones=dictionary['valoraciones']
        except:
            pass
        prendas.append(prenda)
    print(prendas)
    
    # return prenda
    return prendas




# New addition, path parameter
# https://fastapi.tiangolo.com/tutorial/path-params/
@api_router.post("/employee/logon/", status_code=200)
def logon_employee(*, employee_logon:EmployeeLogon) -> dict:
    """
    Fetch a single recipe by ID
    """
    employee=crud.employee.get_by_ID(db_employee, ID=employee_logon.id)
    if employee.password==employee_logon.password:
        to_encode = {"time": time.time(), "employeeId": employee_logon.id}
        encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, ALGORITHM)
        return{'access_token':encoded_jwt,
                'type':"bearer",'role':1}
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

    # result = [recipe for recipe in PRENDAS if recipe["id"] == recipe_id]
    # if result:
    #     return result[0]

# New addition, using Pydantic model `RecipeCreate` to define
# the POST request body


@api_router.post("/prendas/", status_code=201, response_model=Prenda)
def create_prenda(*, prenda_in: PrendasCreate,isAdmin:int=Depends(get_is_admin)) -> dict:
    """
    Create a new recipe (in memory only)
    """
    new_entry_id = db["prendas"].count_documents({}) + 1
    prenda_entry = Prenda(
        id_prenda=new_entry_id,
        precio=prenda_in.precio,
        description=prenda_in.description,
        nombre=prenda_in.nombre,
        marca=prenda_in.marca,
        stocks=[],
        img=""
    )
    dictionary=prenda_entry.dict()
    dictionary['inactive']=0
 #await

    new_prenda = db["prendas"].insert_one(dictionary)
    created_prenda = db["prendas"].find_one({"id_prenda": prenda_entry.id_prenda})
    return created_prenda
   # PRENDAS.append(prenda_entry.dict())

  #  return prenda_entry

@api_router.post("/prendas/{prenda_id}", status_code=201, response_model=Prenda)
def update_prenda(*, prenda_id: int, update:PrendasUpdate, isAdmin:int=Depends(get_is_admin)) -> dict:
    if getPrenda(prenda_id) is not None:
        db["prendas"].update_one({ "id_prenda": prenda_id },{ "$set": {"precio": update.precio,"marca":update.marca,"nombre": update.nombre,"description": update.description}})
        return getPrenda(prenda_id)
 
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Prenda with ID {id} not found")


@api_router.post("/prendas/img/{prenda_id}", status_code=201, response_model=Prenda)
def update_prenda_img(*, prenda_id: int, update:UpdateImage) -> dict:
    print(prenda_id)
    if getPrenda(prenda_id) is not None:
        db["prendas"].update_one({ "id_prenda": prenda_id },{ "$set": {"img": update.img}})
        return getPrenda(prenda_id)
 
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Prenda with ID {id} not found")

  #  prenda.image=update.image


#Publica un comentario sobre una prenda
@api_router.post("/prendas/comentar/{prenda_id}", status_code=201) #response_model=Prenda)
async def update_prenda_comentarios(*, prenda_id: int, user:User=Depends(get_current_user), update:ComentarioInput) -> dict:
   
    comentario= Comentario(
        text=update.text,
        email=user.email,
        fullName=user.nombre,
        avatarUrl='https://ui-avatars.com/api/name={}&background=random'.format(user.nombre)
    )
    if getPrenda(prenda_id) is not None:
        db["prendas"].update_one({ "id_prenda": prenda_id },{ "$push": {"comentarios": comentario.__dict__}})
        return getPrenda(prenda_id)
 
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Prenda with ID {id} not found")


@api_router.post("/prendas/valorar/{prenda_id}", status_code=201, response_model=Prenda)
def update_prenda_valoraciones(*, prenda_id: int, update:ValoracionInput,user:User=Depends(get_current_user) ) -> dict:
    prenda=getPrenda(prenda_id)
    if prenda is not None:
        valorado=False
        if prenda.valoraciones is not None:
            for valoracion in prenda.valoraciones:
                if valoracion['email']==user.email:
                    valoracion['valor']=update.valor
                    valorado=True
            print(prenda.valoraciones)
        if valorado:
            db["prendas"].update_one({ "id_prenda": prenda_id },{ "$set": {"valoraciones": prenda.valoraciones}})
        else:
            d1={'email':user.email}
            db["prendas"].update_one({ "id_prenda": prenda_id },{ "$push": {"valoraciones":dict(update.__dict__,**d1)}})
        return getPrenda(prenda_id)
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Prenda with ID {id} not found")
#@api_router.delete("/prendas/{prenda_id}", status_code=201, response_model=Prenda)
#def delete_prenda(*, prenda_id: int) -> dict:
  
      

@api_router.post("/prendas/stock/{prenda_id}", status_code=201, response_model=Prenda)
def update_stock(*, prenda_id: int, stock_update:StockUpdate,isAdmin:int=Depends(get_is_admin)) -> dict:
    """
    Create a new recipe (in memory only)
    """
    prenda=getPrenda(prenda_id)
    if prenda!=None:
        indice = [index for index in range(len(prenda.stocks)) if prenda.stocks[index].size == stock_update.size]
        new_stock=Stock(size=stock_update.size, quantity=stock_update.quantity)
        if len(indice)>0:
            prenda.stocks[indice[0]]=new_stock
        else:
            prenda.stocks.append(new_stock)
        db["prendas"].update_one({ "id_prenda": prenda_id },{ "$set": {"stocks": [ob.__dict__ for ob in prenda.stocks]}})
        return getPrenda(prenda_id)
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Prenda with ID {id} not found")

@api_router.post("/prendas/stock/decrement/{prenda_id}", status_code=201)
def update_stock(*, prenda_id: int, stock_update:StockDecrement) -> dict:
    """
    Create a new recipe (in memory only)
    """
    prenda=getPrenda(prenda_id)
    if prenda!=None:
        indice = [index for index in range(len(prenda.stocks)) if prenda.stocks[index].size == stock_update.talla]
        if len(indice)>0:
            prenda.stocks[indice[0]]=Stock(size=stock_update.talla, quantity=prenda.stocks[indice[0]].quantity-1)
        db["prendas"].update_one({ "id_prenda": prenda_id },{ "$set": {"stocks": [ob.__dict__ for ob in prenda.stocks]}})
        return getPrenda(prenda_id)
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Prenda with ID {id} not found")

@api_router.delete("/prendas/{prenda_id}", status_code=201)
def delete_prenda(*, prenda_id: int,isAdmin:int=Depends(get_is_admin)) -> dict:
    prenda=getPrenda(prenda_id)
    if prenda is not None:
        db["prendas"].update_one({ "id_prenda": prenda_id },{ "$set": {"inactive": 1}})
        return
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Prenda with ID {id} not found")
#TODO esto hay que cambiarlo al gateway


  #TODO DELETE FROM DATABASE PRENDA WITH ID=ID
 #TODO GET PRENDA FROM DATABASE
 #TODO CREATE MODELS
 #TODO INTEGRAR LOS UPDATES Y LOS CREATES CON LA DB
app.include_router(api_router)


if __name__ == "__main__":
    # Use this for debugging purposes only
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="debug")
