from fastapi import FastAPI, APIRouter
import time
from schemas import Prenda, PrendasCreate, PrendasUpdate, StockUpdate, EmployeeLogon, Stock
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
from fastapi.responses import HTMLResponse
import shutil




client = pymongo.MongoClient("mongodb+srv://deusto:deusto@cluster0.knpxqxl.mongodb.net/prendas?retryWrites=true&w=majority")
db = client.Comercial
try:
    db_employee = SessionLocal()
except:
    raise Exception("MYSQL DATABASE FOR EMPLOYEES NOT FOUND")

app = FastAPI(title="Prendas API", openapi_url="/openapi.json")

api_router = APIRouter()

#def getPrenda():
    
def getPrenda(prenda_id):
    dictionary= db["prendas"].find_one({"id_prenda": prenda_id})
    prenda=Prenda(
        id_prenda=dictionary['id_prenda'],
        precio=dictionary['precio'],
        description=dictionary['description'],
        nombre=dictionary['nombre'],
        img=dictionary['img'],
        marca=dictionary['nombre'],
        stocks=dictionary['stocks']
    )
    return prenda

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



# New addition, path parameter
# https://fastapi.tiangolo.com/tutorial/path-params/
@api_router.post("/employee/logon/", status_code=200)
def logon_employee(*, employee_logon:EmployeeLogon) -> dict:
    """
    Fetch a single recipe by ID
    """
    employee=crud.employee.get_by_ID(db_employee, ID=employee_logon.id)
    if employee.password==employee_logon.password:
        return time.time()*10000000 #* 10000000 para evitar que sea float
    else:
        return -1
    # result = [recipe for recipe in PRENDAS if recipe["id"] == recipe_id]
    # if result:
    #     return result[0]

# New addition, using Pydantic model `RecipeCreate` to define
# the POST request body


@api_router.post("/prendas/", status_code=201, response_model=Prenda)
def create_prenda(*, prenda_in: PrendasCreate) -> dict:
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
        img=prenda_in.img,
        stocks=prenda_in.stocks
    )
 #await
    new_prenda = db["prendas"].insert_one(prenda_entry.dict())
    created_prenda = db["prendas"].find_one({"id_prenda": prenda_entry.id_prenda})
    return created_prenda
   # PRENDAS.append(prenda_entry.dict())

  #  return prenda_entry

@api_router.post("/prendas/{prenda_id}", status_code=201, response_model=Prenda)
def update_prenda(*, prenda_id: int, update:PrendasUpdate) -> dict:
    if getPrenda(prenda_id) is not None:
        db["prendas"].update_one({ "id_prenda": prenda_id },{ "$set": {"precio": update.precio,"nombre": update.nombre,"description": update.description}})
        return getPrenda(prenda_id)
 
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Prenda with ID {id} not found")

  #  prenda.image=update.image


#@api_router.delete("/prendas/{prenda_id}", status_code=201, response_model=Prenda)
#def delete_prenda(*, prenda_id: int) -> dict:
  
      

@api_router.post("/prenda/{prenda_id}/stock", status_code=201, response_model=Prenda)
def update_stock(*, prenda_id: int, stock_update:StockUpdate) -> dict:
    """
    Create a new recipe (in memory only)
    """
    prenda=getPrenda(prenda_id)
    print(prenda.nombre)
    indice = [index for index in range(len(prenda.stocks)) if prenda.stocks[index].size == stock_update.size][0]
    new_stock=Stock(size=stock_update.size, quantity=stock_update.quantity)
    prenda.stocks[indice]=new_stock
    db["prendas"].update_one({ "id_prenda": prenda_id },{ "$set": {"stocks": [ob.__dict__ for ob in prenda.stocks]}})


#TODO esto hay que cambiarlo al gateway
@app.post("/uploadfiles/{prenda_id}")
async def create_upload_files(*,prenda_id: int,files: List[UploadFile]=File(...)):
    try:
        os.mkdir('./images/{}'.format(prenda_id))
    except:
        print("Directorio ya creado")
    for image in files:
        with open('./images/{}/{}'.format(prenda_id,image.filename), "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

  #TODO DELETE FROM DATABASE PRENDA WITH ID=ID
 #TODO GET PRENDA FROM DATABASE
 #TODO CREATE MODELS
 #TODO INTEGRAR LOS UPDATES Y LOS CREATES CON LA DB
app.include_router(api_router)


if __name__ == "__main__":
    # Use this for debugging purposes only
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="debug")
