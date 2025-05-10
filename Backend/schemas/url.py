from pydantic import BaseModel
from datetime import datetime

#For Input of URL
class URLRequest(BaseModel):
    url: str

    class Config:
        from_attributes = True

#For Output of URL
class URLResponse(BaseModel):
    id: int
    originalurl: str
    shortcode: str
    createdat: datetime
    updatedat: datetime
    accesscount: int

    class Config:
        from_attributes = True
