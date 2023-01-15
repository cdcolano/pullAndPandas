from pydantic import BaseModel, HttpUrl

from typing import Sequence
from bson import ObjectId
from typing import List,Optional
from pydantic import BaseModel, Field





class Stock(BaseModel):
    size:str=Field(example="M")
    quantity:int=Field(example=20)

class Prenda(BaseModel):
    id_prenda: int=Field(example=1)
    nombre:str=Field(example="sudadera m1")
    description: str=Field(example="sudadera de algodon, comoda y transpirable")
    precio: float=Field(example=20)
    marca:str=Field(example="Nike")
    stocks: List[Stock]
    img:str=Field(example="./images/2/sudadera.png")
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: int}

class User(BaseModel):
    id_cliente:int=Field(example=1)
    nombre:str=Field(example="Carlos")
    email:str=Field(example="example@gmail.com")
    peso: float=Field(example=70)
    altura: int =Field(example=180)
    edad: int=Field(example=25)
    password:str=Field(example="deusto")
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: int}


class Compra(BaseModel):
    id_compra:int=Field(example=1)
    prenda_id:int=Field(example=1)
    user_id:int=Field(example=1)
    talla:str=Field(example="M")
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: int}


class ComprasCreate(BaseModel):
    prenda_id:int=Field(example=1)
    talla:str=Field(example="M")
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: int}
