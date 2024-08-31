@echo off

REM Navigate to the directory containing manage.py
cd backend\TapSOS

REM Check if db.sqlite3 exists and delete it if present
IF EXIST db.sqlite3 (
    echo db.sqlite3 found. Deleting...
    del db.sqlite3
) ELSE (
    echo db.sqlite3 not found. Proceeding...
)

REM Run migrations
python manage.py makemigrations TapSOS
python manage.py migrate

REM Start the development server 
python manage.py runserver 192.168.86.25:8000