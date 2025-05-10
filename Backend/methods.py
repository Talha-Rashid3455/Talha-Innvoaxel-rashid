import random
import string
from configuration.DBsetup import SessionLocal

# Random code generator for short codes 
def generate_short_code():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=6))

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()