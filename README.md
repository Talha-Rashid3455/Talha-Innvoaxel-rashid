# URL-Shortener
Overview: The URL Shortener project is a web application designed to convert long URLs into short and shareable links. This tool allows users to generate a shorter version of any URL, which is easier to share and more efficient in terms of space when posting on social media, emails, or other messaging platforms. 



## Features
- **Shorten URL**: Convert long URLs into shorter, shareable versions.
- **Retrieve Original URL**: Given a short URL, the system will retrieve the original URL.
- **Update Shortened URL**: Update the long URL for an existing short code.
- **Delete Shortened URL**: Remove a short URL from the database.
- **View Stats**: Get access count statistics for any shortened URL.

## Technologies Used
- **Backend**: 
  - **FastAPI**: A modern Python framework for building APIs quickly and efficiently.
  - **SQLAlchemy**: Object-relational mapper (ORM) for Python used to interact with the database.
  - **PostgreSQL** (or other relational databases): Database for storing URLs and metadata.

- **Frontend**:
  - **React.js**: A front-end JavaScript library for building interactive user interfaces.

## API Endpoints
1. **POST /shorten** - Create a short URL

2. **GET /shorten/{short_code}** - Retrieve original URL from short code

3. **PUT /shorten/{short_code}** - Update short URL

4. **DELETE /shorten/{short_code}** - Delete short URL

5. **GET /shorten/{short_code}/stats** - View statistics for short URL

## Getting Started

To run the application, you need both the backend (FastAPI) and frontend (React) to work together.

### Prerequisites
- Python 3.x
- Node.js and npm
- PostgreSQL or other relational database
