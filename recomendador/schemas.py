from pydantic import BaseModel, HttpUrl

from typing import Sequence
from bson import ObjectId
from typing import List
from pydantic import BaseModel, Field
from typing import Optional

class User(BaseModel):
    id_cliente: int
    altura: int
    peso: float
    edad:int
    
