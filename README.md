# TapSOS

TapSOS is a communication aid designed to assist individuals with disabilities in emergency situations. Our mission is to bridge the communication gap for those who are deaf, hard of hearing, or non-verbal, ensuring they can convey critical information quickly and effectively when it matters most.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)

## Introduction

TapSOS empowers vulnerable individuals in emergencies by providing an intuitive platform that facilitates clear and efficient communication with first responders and bystanders. The app enables users to generate and display customized emergency communication cards with pre-written messages, symbols, and medical information, tailored to the specific emergency they are facing. Designed to function both online and offline, TapSOS ensures accessibility even in situations where internet connectivity is unavailable.

## Features

- **Personal Profile Setup**: Users can input and store personal details, including emergency contacts and medical information.
- **Customizable Emergency Cards**: Users can create and personalize emergency communication cards to suit their unique needs.
- **Scenario-Based Cards**: The app suggests relevant communication cards based on the selected emergency category.
- **Offline Access**: Emergency cards are stored locally on the device for use without internet access.
- **AI-Powered Card Creation**: The app leverages AI to dynamically generate communication cards based on the user’s profile.

## Installation
Connect your laptop to your mobile device's hotspot and check the IP address using ipconfig

1. Create a virtual environment:
   ```bash
   conda create --name <env_name> python=3.11
2. pip install -r requirements.txt
3. backend:
   3.1. Find your ip address by doing ipconfig
   3.2. Change the ALLOWED_HOSTS = ['INSERT_IP_ADDRESS_HERE'] in backend/TapSOS/TapSOS/settings.py
   3.3. Add the ip address line to runserver.bat in the last line, so it looks like:
   "python manage.py runserver IP_ADDRESS_HERE"
   
   After that, run the .bat file
    ```bash
    
    runserver.bat
5. frontend: 
    ```bash
   cd frontend/TapSOS
   set REACT_NATIVE_PACKAGER_HOSTNAME=IP_ADDRESS_HERE 
   npx expo start --lan
