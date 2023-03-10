from pydantic import BaseModel, HttpUrl

from typing import Sequence
from bson import ObjectId
from typing import List, Optional
from pydantic import BaseModel, Field

class Stock(BaseModel):
    size:str
    quantity:int

class ValoracionInput(BaseModel):
    valor:int

class Valoracion(BaseModel):
    valor:int
    email:str=Field(example="example@gmail.com")

class ComentarioInput(BaseModel):
    text:str

class Comentario(BaseModel):
    text:str
    email:str=Field(example="example@gmail.com")
    fullName:str
    avatarUrl:str

class Prenda(BaseModel):
    id_prenda: int
    nombre:str
    description: str
    precio: float
    marca:str
    stocks: List[Stock]
    img:str
    comentarios:Optional[List[Comentario]]
    valoraciones:Optional[List[Valoracion]]
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: int}


class PrendasCreate(BaseModel):
    description: str
    precio: float
    nombre:str
    marca:str
    # img:str
    # stocks: List[Stock]

class PrendasUpdate(BaseModel):
    description: str
    precio: float
    nombre:str
    marca:str

class ComprasCreate(BaseModel):
    prenda_id:int
    talla:str

class StockUpdate(BaseModel):
    size:str
    quantity:int
    
class Compra(BaseModel):
    id_compra:int=Field(example=1)
    prenda_id:int=Field(example=1)
    user_id:int=Field(example=1)
    talla:str=Field(example="M")
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: int}



class UserSignin(BaseModel):
    email: str=Field(example="example@gmail.com")
    password: str

class UserSignup(BaseModel):
    email: str=Field(example="example@gmail.com")
    nombre:str
    password: str
    peso:float
    edad:int
    altura:int


class EmployeeLogon(BaseModel):
    id: int
    password: str

class EmployeeCreate(BaseModel):
    id: int
    password: str


class EmployeeUpdate(BaseModel):
    password: str


