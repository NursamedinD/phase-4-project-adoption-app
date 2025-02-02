## Adoptify (Child Adoption App)

This project was made by: Nursamedin Abdi Dualle

Flask (Backend) Render Link: https://phase-4-project-backend-api-2.onrender.com/

React (FrontEnd) Render Link: https://phase-4-project-backend-api-1.onrender.com/

## Features

- Add a Parent
- Add a Child
- Submit an Adoption request

## How to run locally
You will need a:

- A laptop or computer.
- Stable internet.
- A web browser.

## For the cloning process:
- VS Code.
- Ubuntu.

## Frontend Deployment (Static Site):
- Navigate to Render Dashboard
- Click "New +" and select "Static Site"
### Settings:
- Name: your-frontend-name
- Build Command: npm install && npm run build
- Publish Directory: dist
-Root Directory: my-app

## Backend Deployment (Web Service):
- Navigate to Render Dashboard
- Click "New +" and select "Web Service"
- Settings:
- Name: your-backend-name
- Build Command: pip install -r requirements.txt
- Start Command: cd server && gunicorn app:app

## Required Files:
- requirements.txt
- Flask
- Flask-Migrate
- Flask-RESTful
- Flask-Cors
- Flask-Marshmallow
- marshmallow-sqlalchemy
- SQLAlchemy
- psycopg2-binary
- python-dotenv
- gunicorn
- Werkzeug
- marshmallow
- sqlalchemy-serializer


