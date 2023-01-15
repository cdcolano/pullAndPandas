from fastapi import FastAPI, APIRouter
import os
from fastapi import FastAPI, Body, HTTPException, status
from fastapi.encoders import jsonable_encoder
from pydantic import  Field
from fastapi import FastAPI, File, UploadFile
from typing import List
from schemas import Prenda, UserSignup, PrendasCreate, PrendasUpdate,ValoracionInput,StockUpdate, UserSignin,ComentarioInput,ComprasCreate,EmployeeLogon, Compra
from fastapi.responses import RedirectResponse
import os
from fastapi import FastAPI, Request,Depends
import shutil
import requests
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.security import OAuth2PasswordBearer

response_404 = {404: {"description": "Item not found"}}
response_403= {403:{"description": "Error en el inicio de sesion"}}
response_401= {401:{"description": "No autorizado"}}
response_400= {400:{"description": "No autorizado"}}
response_500={500:{"description":"Error en el servidor"}}
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="http:localhost:4000/clientes/signin" )
oauth2_scheme_admin = OAuth2PasswordBearer(tokenUrl="http:localhost:8001/employee/logon")
origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app = FastAPI(title="Gateway", openapi_url="/openapi.json")

api_router = APIRouter()
origins=["*"]
#def getPrenda():
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def getPrenda(prenda_id:int):
    redirect_url='http://localhost:8001/prendas/{}'.format(prenda_id)
    prendas = requests.get(
                url=redirect_url
    )
    prendas_json=prendas.json()
    prenda=Prenda(
        id_prenda=prendas_json['id_prenda'],
        precio=prendas_json['precio'],
        description=prendas_json['description'],
        nombre=prendas_json['nombre'],
        img=prendas_json['img'],
        marca=prendas_json['marca'],
        stocks=prendas_json['stocks']
    )
    return prenda

@app.post("/uploadfiles/{prenda_id}")
async def create_upload_files(*,prenda_id: int,files: List[UploadFile]=File(...)):
    try:
        os.mkdir('./images/{}'.format(prenda_id))
    except:
        print("Directorio ya creado")
    for image in files:
        with open('./images/{}/{}'.format(prenda_id,image.filename), "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        redirect_url='http://localhost:8001/prendas/img/{}'.format(prenda_id)
        prendas = requests.post(
                    url=redirect_url,
                    json={'img':'./images/{}/{}'.format(prenda_id,image.filename)}
        )

@api_router.get("/prendas/{prenda_id}", status_code=200,response_model=Prenda, responses=response_404)
def root(*, prenda_id:int,request: Request) -> dict:
    return RedirectResponse('http://localhost:8001/prendas/{}'.format(prenda_id))

@api_router.get("/prendas/{prenda_id}/img", status_code=200)
def getImg(*, prenda_id:int,request: Request) -> FileResponse:
    prenda=getPrenda(prenda_id)
    return FileResponse(prenda.img)
    # #print("{}".format(prendas))
    # return prendas

@api_router.get("/prendas/", status_code=200, response_model=List[Prenda])
def root(*, request: Request) -> dict:
    return RedirectResponse('http://localhost:8001/prendas')

@api_router.delete("/prendas/{prenda_id}", status_code=200,response_model=Prenda)
def delete_prenda(*, prenda_id: int, token:str=Depends(oauth2_scheme)) -> dict:
    return RedirectResponse('http://localhost:8001/prendas/{}'.format(prenda_id))

@api_router.post("/prendas/", status_code=200,response_model=Prenda, responses={**response_401})
def root(*, prenda_in:PrendasCreate,token:str=Depends(oauth2_scheme)) -> dict:
    return RedirectResponse('http://localhost:8001/prendas')

@api_router.post("/prendas/update/{prenda_id}", status_code=201, response_model=Prenda, responses={**response_401,**response_404})
def update_prenda(*, prenda_id: int, update:PrendasUpdate, token:str=Depends(oauth2_scheme)) -> dict:
    url='http://localhost:8001/prendas/{}'.format(prenda_id)
    return RedirectResponse(url)

@api_router.post("/prendas/stock/{prenda_id}", status_code=201, response_model=Prenda,responses={**response_401,**response_404})
def update_stock(*, prenda_id: int, stock_update:StockUpdate,token:str=Depends(oauth2_scheme)) -> dict:
    url='http://localhost:8001/prendas/stock/{}'.format(prenda_id)
    print(url)
    return RedirectResponse(url)

@api_router.post("/signup", status_code=201)
def root(*, user:UserSignup) -> dict:
    return RedirectResponse('http://localhost:4000/clientes/')

@api_router.post("/signin", status_code=200)
def root(*, user:UserSignin) -> dict:
    return RedirectResponse('http://localhost:4000/clientes/signin')



@api_router.post("/clientes/{cliente_id}", status_code=201, responses={**response_400,**response_404, **response_500})
def root(*, cliente_id:int, user:UserSignup,token: str= Depends(oauth2_scheme) ) -> dict:
    return RedirectResponse('http://localhost:4000/clientes/{}'.format(cliente_id))


@api_router.get("/clientes/user", status_code=200)
def root( *, token: str= Depends(oauth2_scheme)) -> dict:
    return RedirectResponse('http://localhost:4000/clientes/user/')



@api_router.get("/recomendador", status_code=200)
def root( *,token: str= Depends(oauth2_scheme)) -> dict:
    return RedirectResponse('http://localhost:8090/recomendador')



@api_router.post("/prendas/comentar/{prenda_id}", status_code=201, response_model=Prenda,responses={**response_401,**response_404})
def root(*, prenda_id:int, update:ComentarioInput,token: str= Depends(oauth2_scheme) ) -> dict:
    return RedirectResponse('http://localhost:8001/prendas/comentar/{}'.format(prenda_id))

@api_router.post("/prendas/valorar/{prenda_id}", status_code=201, response_model=Prenda,responses={**response_401,**response_404})
def root(*, prenda_id:int, update:ValoracionInput,token: str= Depends(oauth2_scheme) ) -> dict:
    return RedirectResponse('http://localhost:8001/prendas/valorar/{}'.format(prenda_id))

@api_router.post("/compras/", status_code=201,response_model=Compra, responses=response_401)
def root(*,entrada:ComprasCreate,token: str= Depends(oauth2_scheme) ) -> dict:
    return RedirectResponse('http://localhost:8006/compras')

@api_router.post("/logon/employee", status_code=201,responses=response_403)
def root(*,entrada:EmployeeLogon ) -> dict:
    return RedirectResponse('http://localhost:8001/employee/logon/')

@api_router.delete("/clientes/{cliente_id}", status_code=200,response_model=Prenda,responses={**response_401,**response_404})
def delete_prenda(*, cliente_id: int, token:str=Depends(oauth2_scheme)) -> dict:
    return RedirectResponse('http://localhost:4000/clientes/{}'.format(cliente_id))



# New addition, path parameter
# # https://fastapi.tiangolo.com/tutorial/path-params/
# @api_router.post("/employee/logon/", status_code=200)
# def logon_employee(*, employee_logon:EmployeeLogon) -> dict:
# #     """
# #     Fetch a single recipe by ID
# #     """
# #     employee=crud.employee.get_by_ID(db_employee, ID=employee_logon.id)
# #     if employee.password==employee_logon.password:
# #         return time.time()*10000000 #* 10000000 para evitar que sea float
# #     else:
# #         return -1
#     # result = [recipe for recipe in PRENDAS if recipe["id"] == recipe_id]
#     # if result:
#     #     return result[0]

# # New addition, using Pydantic model `RecipeCreate` to define
# # the POST request body


# @api_router.post("/prendas/", status_code=201, response_model=Prenda)
# def create_prenda(*, prenda_in: PrendasCreate) -> dict:
#     """
#     Create a new recipe (in memory only)
#     """
#     new_entry_id = db["prendas"].count_documents({}) + 1
#     prenda_entry = Prenda(
#         id_prenda=new_entry_id,
#         precio=prenda_in.precio,
#         description=prenda_in.description,
#         nombre=prenda_in.nombre,
#         marca=prenda_in.marca,
#         #image=prenda_in.image,
#         stocks=prenda_in.stocks
#     )
#  #await
# #     new_prenda = db["prendas"].insert_one(prenda_entry.dict())
# #     created_prenda = db["prendas"].find_one({"id_prenda": prenda_entry.id_prenda})
# #     return created_prenda
# #    # PRENDAS.append(prenda_entry.dict())

# #   #  return prenda_entry

# # @api_router.post("/prendas/{prenda_id}", status_code=201, response_model=Prenda)
# # def update_prenda(*, prenda_id: int, update:PrendasUpdate) -> dict:
# #     if getPrenda(prenda_id) is not None:
# #         db["prendas"].update_one({ "id_prenda": prenda_id },{ "$set": {"precio": update.precio,"nombre": update.nombre,"description": update.description}})
# #         return getPrenda(prenda_id)

# #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Prenda with ID {id} not found")

# #   #  prenda.image=update.image


# #@api_router.delete("/prendas/{prenda_id}", status_code=201, response_model=Prenda)
# #def delete_prenda(*, prenda_id: int) -> dict:



# @api_router.post("/prenda/{prenda_id}/stock", status_code=201, response_model=Prenda)
# def update_stock(*, prenda_id: int, stock_update:StockUpdate) -> dict:
#     """
#     Create a new recipe (in memory only)
#     """
#     prenda=getPrenda(prenda_id)
#     print(prenda.nombre)
#     indice = [index for index in range(len(prenda.stocks)) if prenda.stocks[index].size == stock_update.size][0]
#     new_stock=Stock(size=stock_update.size, quantity=stock_update.quantity)
#     prenda.stocks[indice]=new_stock
#     db["prendas"].update_one({ "id_prenda": prenda_id },{ "$set": {"stocks": [ob.__dict__ for ob in prenda.stocks]}})


# #TODO esto hay que cambiarlo al gateway
# @app.post("/uploadfiles/{prenda_id}")
# async def create_upload_files(*,prenda_id: int,files: List[UploadFile]=File(...)):
#     try:
#         os.mkdir('./images/{}'.format(prenda_id))
#     except:
#         print("Directorio ya creado")
#     for image in files:
#         with open('./images/{}/{}'.format(prenda_id,image.filename), "wb") as buffer:
#             shutil.copyfileobj(image.file, buffer)

  #TODO DELETE FROM DATABASE PRENDA WITH ID=ID
 #TODO GET PRENDA FROM DATABASE
 #TODO CREATE MODELS
 #TODO INTEGRAR LOS UPDATES Y LOS CREATES CON LA DB
app.include_router(api_router)


if __name__ == "__main__":
    # Use this for debugging purposes only
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8002, log_level="debug")
