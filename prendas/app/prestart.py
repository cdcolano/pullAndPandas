import subprocess
import sys

from alembic.config import Config
from alembic import command
from pathlib import Path



ROOT = Path(__file__).resolve().parent.parent
alembic_cfg = Config(ROOT / "alembic.ini")

subprocess.run([sys.executable, "./app/db/backend_pre_start.py"])
command.upgrade(alembic_cfg, "head")
subprocess.run([sys.executable, "./app/initial_data.py"])