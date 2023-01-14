from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

#TODO CAMBIAR POR HOST DOCKERIZADO
SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:root@db:3306/employee"


engine = create_engine(
    SQLALCHEMY_DATABASE_URI
    # required for sqlite
    #connect_args={"check_same_thread": False},
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
