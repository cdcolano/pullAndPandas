from fastapi import FastAPI, APIRouter
import time
import os
from fastapi import FastAPI, Body, HTTPException, status
from fastapi.responses import Response, JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, Field, EmailStr
from fastapi import FastAPI, File, UploadFile
from typing import List
from schemas import Prenda, User, ComprasCreate, Compra
from fastapi.responses import RedirectResponse, HTMLResponse
import os
import fastapi
from fastapi.templating import Jinja2Templates
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
import shutil
import requests
from fastapi.testclient import TestClient
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import pymongo


client = pymongo.MongoClient("mongodb+srv://deusto:deusto@cluster0.knpxqxl.mongodb.net/prendas?retryWrites=true&w=majority")
db = client.Comercial

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

def getCompra(compra_id):
    doc= db["compras"].find_one({"id_compra": compra_id})
    compra=Compra(
        id_compra=doc['id_compra'],
        talla=doc['talla'],
        prenda_id=doc['prenda_id'],
        user_id=doc['user_id'],
        valoracion=doc['valoracion'],
        comentario=doc['comentario']
    )
    return compra

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
        marca=prendas_json['nombre'],
        stocks=prendas_json['stocks']
    )
    return prenda


@api_router.get("/compras/prenda/valoraciones/{prenda_id}", status_code=200)
def getCompra_Route(*,  prenda_id:int,request: Request) -> dict:
    iterator= db["compras"].find({"prenda_id": prenda_id})
    valoraciones=[]
    for doc in iterator:
        valoraciones.append({
            "user_id":doc['user_id'],
            "valoracion":doc['valoracion'],
        })
    return valoraciones

@api_router.get("/compras/prenda/comentarios/{prenda_id}", status_code=200)
def getCompra_Route(*,  prenda_id:int,request: Request) -> dict:
    iterator= db["compras"].find({"prenda_id": prenda_id})
    valoraciones=[]
    for doc in iterator:
        valoraciones.append({
            "user_id":doc['user_id'],
            "valoracion":doc['comentario'],
        })
    return valoraciones

@api_router.get("/compras/usuario/comentarios/{user_id}", status_code=200)
def getCompra_Route(*,  user_id:int,request: Request) -> dict:
    iterator= db["compras"].find({"user_id": user_id})
    valoraciones=[]
    for doc in iterator:
        valoraciones.append({
            "user_id":doc['user_id'],
            "valoracion":doc['comentario'],
        })
    return valoraciones


@api_router.get("/compras/usuario/comentarios/{user_id}", status_code=200)
def getCompra_Route(*,  user_id:int,request: Request) -> dict:
    iterator= db["compras"].find({"user_id": user_id})
    valoraciones=[]
    for doc in iterator:
        valoraciones.append({
            "user_id":doc['user_id'],
            "valoracion":doc['valoracion'],
        })
    return valoraciones




@api_router.get("/compras/prenda/{prenda_id}", status_code=200)
def getCompra_Route(*,  prenda_id:int,request: Request) -> dict:
    iterator= db["compras"].find({"prenda_id": prenda_id})
    compras=[]
    for doc in iterator:
        compras.append(Compra(
            id_compra=doc['id_compra'],
            talla=doc['talla'],
            prenda_id=doc['prenda_id'],
            user_id=doc['user_id'],
            valoracion=doc['valoracion'],
            comentario=doc['comentario']
        ))
    return compras

@api_router.get("/compras/prenda/{prenda_id}/{user_id}", status_code=200)
def getCompra_Route(*,  prenda_id:int, user_id:int,request: Request) -> dict:
    iterator= db["compras"].find({"prenda_id": prenda_id, "user_id":user_id})
    compras=[]
    for doc in iterator:
        compras.append(Compra(
            id_compra=doc['id_compra'],
            talla=doc['talla'],
            prenda_id=doc['prenda_id'],
            user_id=doc['user_id'],
            valoracion=doc['valoracion'],
            comentario=doc['comentario']
        ))
    return compras

@api_router.post("/compras/{compra_id}/valorar", status_code=201, response_model=Compra)
def create_prenda(*,compra_id:int, valoracion: int) -> dict:
    """
    Create a new recipe (in memory only)
    """
    db["compras"].update_one({ "id_compra": compra_id },{ "$set": {"valoracion":valoracion}})

    return getCompra(compra_id)
   # PRENDAS.append(prenda

@api_router.post("/compras/{compra_id}/comentar", status_code=201, response_model=Compra)
def create_prenda(*,compra_id:int, comentario: str) -> dict:
    """
    Create a new recipe (in memory only)
    """
    db["compras"].update_one({ "id_compra": compra_id },{ "$set": {"comentario":comentario}})

    return getCompra(compra_id)
   # PRENDAS.append(prenda

@api_router.post("/compras/", status_code=201, response_model=Compra)
def create_prenda(*, compra_in: ComprasCreate) -> dict:
    """
    Create a new recipe (in memory only)
    """
    new_entry_id = db["compras"].count_documents({}) + 1
    compra_entry = Compra(
        id_compra=new_entry_id,
        prenda_id=compra_in.prenda_id,
        user_id=compra_in.user_id,
        talla=compra_in.talla
    )
 
    db["compras"].insert_one(compra_entry.dict())
    created_compra = db["compras"].find_one({"id_compra": new_entry_id})
    #TODO update STOCK
    updateStock(compra_entry.prenda_id)
    return created_compra
   # PRENDAS.append(prenda




app.include_router(api_router)


if __name__ == "__main__":
    # Use this for debugging purposes only
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8006, log_level="debug")
