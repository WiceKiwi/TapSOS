# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt /app/

# Install any dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . /app/

# Set environment variables if needed (example)
ENV PYTHONUNBUFFERED 1

# Expose port 8000 to the outside world
EXPOSE 8000

# Run the Django development server
CMD ["python", "backend/TapSOS/manage.py", "runserver", "0.0.0.0:8000"]
