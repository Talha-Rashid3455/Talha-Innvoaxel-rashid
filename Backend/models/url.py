from configuration import Base
from sqlalchemy import  Column, Integer, String, TIMESTAMP


#Table to keep records required for short code
class URL(Base):
    __tablename__ = "urlshortener"
    id = Column(Integer, primary_key=True, index=True)
    originalurl = Column(String, index=True)
    shortcode = Column(String, unique=True, index=True)
    createdat = Column(TIMESTAMP)
    updatedat = Column(TIMESTAMP)
    accesscount = Column(Integer, default=0)