from configuration import app
from models import URL
from sqlalchemy.orm import Session 
from schemas import URLRequest, URLResponse 
from fastapi import FastAPI, HTTPException,Depends,Response
from methods import *  
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

# Cors Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], ) 


# POST Rrestful API endpoint
@app.post("/shorten", response_model=URLResponse)  # Specify response model
def create_short_url(request: URLRequest, response : Response, db: Session = Depends(get_db)):
    
    db_url = db.query(URL).filter(URL.originalurl == request.url).first()
    if db_url :
        raise HTTPException(status_code=400, detail="URL already present ")
    short_code = generate_short_code()
    # print(short_code)
    current_time=datetime.now()
    db_url = URL(
        originalurl=request.url,
        shortcode=short_code,
        createdat=current_time,  # Set createdat to the current time
        updatedat=current_time   # Set updatedat to the current time
    )    
    db.add(db_url)
    db.commit()
    db.refresh(db_url)
    response.status_code=201
    return response 
#Above method will be creating short URL

# GET Restful API endpoint 
@app.get("/shorten/{short_code}", response_model=URLResponse)
def get_original_url(short_code: str, db: Session = Depends(get_db)):
    
    db_url = db.query(URL).filter(URL.shortcode == short_code).first()
    # print(db_url)
    # print(shortcode)
    if db_url is None:
        raise HTTPException(status_code=404, detail="Short URL not found")
    db_url.accesscount += 1
    db.commit()
    return db_url.originalurl
#Above method to acces the original URL


# PUT RestFul APUI endpoint
@app.put("/shorten/{short_code}", response_model=URLResponse)
def update_short_url(short_code: str, request: URLRequest, db: Session = Depends(get_db)):
    
    db_url = db.query(URL).filter(URL.shortcode == short_code).first()
    if db_url is None:
        raise HTTPException(status_code=404, detail="Short URL not found")
    db_url.originalurl = request.url
    current_time=datetime.now()
    db_url.updatedat = current_time
    db.commit()
    return db_url 
#This will update the already existing short URL

# DELETE Restful API endpoint
@app.delete("/shorten/{short_code}")
def delete_short_url(short_code: str,response:Response, db: Session = Depends(get_db)):
    
    db_url = db.query(URL).filter(URL.shortcode == short_code).first()
    if db_url is None:
        raise HTTPException(status_code=404, detail="Short URL not found")
    db.delete(db_url)
    db.commit()
    response.status_code=204
    return response
#This will delete the existing short URL in DB

# GET Restful API endpoint for stats
@app.get("/shorten/{short_code}/stats", response_model=URLResponse)
def get_url_stats(short_code: str, db: Session = Depends(get_db)):
    
    db_url = db.query(URL).filter(URL.shortcode == short_code).first()
    if db_url is None:
        raise HTTPException(status_code=404, detail="Short URL not found")
    return db_url  
# This will be returning the whole stats of a short URL