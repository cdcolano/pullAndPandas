from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Employee(Base):
    id = Column(Integer, primary_key=True, index=True)
    password = Column(String(256), nullable=False)
