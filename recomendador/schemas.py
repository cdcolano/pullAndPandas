from pydantic import BaseModel, HttpUrl

from typing import Sequence
from bson import ObjectId
from typing import List
from pydantic import BaseModel, Field
from typing import Optional

class User(BaseModel):
    id_cliente: int =Field(example=1)
    altura: int =Field(example=180)
    peso: float= Field(example=70)
    edad:int = Field(example=25)
    
class Talla(BaseModel):
    talla:str=Field(example="M")