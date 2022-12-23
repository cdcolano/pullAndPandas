from pydantic import BaseModel, HttpUrl

from typing import Sequence
from bson import ObjectId
from typing import List
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


class PrendasCreate(BaseModel):
    description: str
    precio: float
    nombre:str
    marca:str
    img:str
    stocks: List[Stock]

class PrendasUpdate(BaseModel):
    description: str
    precio: float
    nombre:str
    marca:str
    img:str

class StockUpdate(BaseModel):
    size:str
    quantity:int

class EmployeeLogon(BaseModel):
    id: int
    password: str

class EmployeeCreate(BaseModel):
    id: int
    password: str


class EmployeeUpdate(BaseModel):
    password: str


