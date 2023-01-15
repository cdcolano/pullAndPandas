import logging
from sqlalchemy.orm import Session

from app import crud
from app.db import base
from app import schemas  # noqa: F401

logger = logging.getLogger(__name__)

FIRST_EMPLOYEE = "1"

# make sure all SQL Alchemy models are imported (app.db.base) before initializing DB
# otherwise, SQL Alchemy might fail to initialize relationships properly
# for more details: https://github.com/tiangolo/full-stack-fastapi-postgresql/issues/28


def init_db(db: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next line
    # Base.metadata.create_all(bind=engine)
    if FIRST_EMPLOYEE:
        employee = crud.employee.get_by_ID(db, ID=FIRST_EMPLOYEE)
        if not employee:
            for i in range (1,5):
                employee_in = schemas.EmployeeCreate(
                    id=i,
                    password="pass{}".format(i)
                )
                employee_in = crud.employee.create(db, obj_in=employee_in)  # noqa: F841
        else:
            logger.warning(
                "Skipping creating superuser. User with email "
                f"{FIRST_EMPLOYEE} already exists. "
            )
    else:
        logger.warning(
            "Skipping creating superuser.  FIRST_SUPERUSER needs to be "
            "provided as an env variable. "
            "e.g.  FIRST_SUPERUSER=admin@api.coursemaker.io"
        )
