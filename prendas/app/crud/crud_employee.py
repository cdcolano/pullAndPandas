from typing import Any, Dict, Optional, Union

from sqlalchemy.orm import Session
import sys
sys.path.insert(0, './')
from app.crud.base import CRUDBase
from app.models.models import Employee
from app.schemas import EmployeeCreate,EmployeeUpdate


class CRUDEmployee(CRUDBase[Employee, EmployeeCreate, EmployeeUpdate]):
    def get_by_ID(self, db: Session, *, ID: int) -> Optional[Employee]:
        return db.query(Employee).filter(Employee.id == ID).first()


employee = CRUDEmployee(Employee)
