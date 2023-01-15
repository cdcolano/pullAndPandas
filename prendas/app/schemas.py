from pydantic import BaseModel, HttpUrl

from typing import Sequence
from bson import ObjectId
from typing import List, Optional
from pydantic import BaseModel, Field


class Stock(BaseModel):
    size:str = Field(example="M")
    quantity:int= Field(example=20)

class ValoracionInput(BaseModel):
    valor:int= Field(example=4)
    
class Valoracion(BaseModel):
    valor:int= Field(example=4)
    email:str= Field(example="example@gmail.com")

class ComentarioInput(BaseModel):
    text:str=Field(example="Me ha gustado mucho")

class Comentario(BaseModel):
    text:str=Field(example="Me ha gustado mucho")
    email:str=Field(example="example@gmail.com")
    fullName:str=Field(example="Carlos")
    avatarUrl:str=Field(example="https://ui-avatars.com/api/name=example&background=random")

class User(BaseModel):
    id_cliente: int
    email: str=Field(example="example@gmail.com")
    nombre: str=Field(example="Carlos")

class Prenda(BaseModel):
    id_prenda: int= Field(example=1)
    nombre:str=Field(example="sudadera m1")
    description: str=Field(example="sudadera de algodon, comoda y transpirable")
    precio: float=Field(example=20)
    marca:str=Field(example="nike")
    stocks: List[Stock]
    img:str=Field(example="./images/2/sudadera.png")
    comentarios:Optional[List[Comentario]]
    valoraciones:Optional[List[Valoracion]]
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: int}

class UpdateImage(BaseModel):
    img:str=Field(example="./images/2/sudadera.png")

class PrendasCreate(BaseModel):
    description: str=Field(example="sudadera de algodon, comoda y transpirable")
    precio: float=Field(example=20)
    nombre:str=Field(example="sudadera m1")
    marca:str=Field(example="nike")

    # img:str
    # stocks: List[Stock]

class PrendasUpdate(BaseModel):
    # description: str
    # precio: float
    # nombre:str
    # marca:str
    description: str=Field(example="sudadera de algodon, comoda y transpirable")
    precio: float=Field(example=20)
    nombre:str=Field(example="sudadera m1")
    marca:str=Field(example="nike")

class StockUpdate(BaseModel):
    size:str = Field(example="M")
    quantity:int= Field(example=20)


class StockDecrement(BaseModel):
    talla:str= Field(example="M")

class EmployeeLogon(BaseModel):
    id: int= Field(example=1)
    password: str= Field(example="pass1")

class EmployeeCreate(BaseModel):
    id: int= Field(example=1)
    password: str= Field(example="pass1")


class EmployeeUpdate(BaseModel):
    password: str= Field(example="pass1")


