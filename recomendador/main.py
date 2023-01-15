from fastapi import FastAPI, APIRouter
import time
import os
from fastapi import FastAPI, Body, HTTPException, status
from fastapi.responses import Response, JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, Field, EmailStr
from fastapi import FastAPI, File, UploadFile
from typing import List
from fastapi.responses import RedirectResponse, HTMLResponse
import os
import fastapi
from fastapi.templating import Jinja2Templates
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
import shutil
import requests
from schemas import User, Talla
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os
from datetime import datetime, timedelta
from typing import Union, Any
from jose import jwt,JWTError
from fastapi import FastAPI, status, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.security import OAuth2PasswordBearer
from fastapi.responses import RedirectResponse
import pymongo
#from schemas import UserOut, UserAuth, TokenSchema
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # 30 minutes
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 # 7 days
ALGORITHM = "HS256"
JWT_SECRET_KEY = "gfg_jwt_secret_key"  # should be kept secret
#JWT_REFRESH_SECRET_KEY = os.environ['JWT_REFRESH_SECRET_KEY']

client = pymongo.MongoClient("mongodb+srv://deusto:deusto@cluster0.knpxqxl.mongodb.net/prendas?retryWrites=true&w=majority")
db = client.Comercial

from sklearn.tree import DecisionTreeClassifier
import pandas as pd
data=pd.read_csv('./final_test.csv')
data=data.dropna()
print(data['size'].unique())
talla=data[['size']]
data=data.drop('size', axis=1)
clf = DecisionTreeClassifier().fit(data, talla)
response_404 = {404: {"description": "Item not found"}}
response_403= {403:{"description": "Error en el inicio de sesion"}}
response_401= {401:{"description": "No autorizado"}}
origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app = FastAPI(title="Recomendador tallas", openapi_url="/openapi.json")

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
#"http:host.docker.internal:4000/clientes/signin" 
#
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="http://localhost:4000/clientes/signin" )


async def get_current_user(token: str= Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY)#, algorithms=[ALGORITHM])
        userId = payload.get("userId")
        if userId is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        #http://clientes-clientes-1:4000/clientes/
    redirect_url='http://host.docker.internal:4000/clientes/{}'.format(userId)
    user = requests.get(
                url=redirect_url).json()
    user_ob=User(
        id_cliente=user['id_cliente'],
        peso=user['peso'],
        altura=user['altura'],
        edad=user['edad']
    )
    print(user_ob)
    return user_ob




@api_router.get("/recomendador", status_code=200, response_model=Talla, responses=response_401)
def root(user: User=Depends(get_current_user)) -> dict:
   talla=clf.predict([[user.peso,user.edad,user.altura]])[0]
   return {'talla':talla}


app.include_router(api_router)


if __name__ == "__main__":
    # Use this for debugging purposes only
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8090, log_level="debug")
