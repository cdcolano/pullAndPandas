from pydantic import BaseModel, HttpUrl

from typing import Sequence
from bson import ObjectId
from typing import List,Optional
from pydantic import BaseModel, Field





class Stock(BaseModel):
    size:str
    quantity:int

class Prenda(BaseModel):
    id_prenda: int
    nombre:str
    description: str
    precio: float
    marca:str
    stocks: List[Stock]
    img:str
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: int}

class User(BaseModel):
    id_cliente:int
    nombre:str
    email:str
    peso: float
    altura: int 
    edad: int
    password:str
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: int}


class Compra(BaseModel):
    id_compra:int
    prenda_id:int
    user_id:int
    talla:str
    valoracion: Optional[int]
    comentario:Optional[str]
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: int}


class ComprasCreate(BaseModel):
    prenda_id:int
    user_id:int
    talla:str
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: int}
