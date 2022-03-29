# NewLife Hospital
Web application representing a hospital website. During the Covid-19 pandemic, the work of doctors and medical staff was even more difficult and stressful. To facilitate communication with their patients, we are creating an application that will provide maximum information so as to relieve medical staff of their responsibilities to deal with administrative matters and respond to basic inquiries from patients. 
The application will be developed as a Single Page Application (SPA) using React.js as front-end, and Node.js + express as backend technologies. Each view will have a distinct URL, and the routing between pages will be done client side using React Router. The backend will be implemented as a REST/JSON API using JSON data serialization. There will be also a real-time event streaming from the server to the web client using Socket.IO and Server Sent Events (SSE)/WebSocket in order to allow the Patient and the Medical Professional send messages to each other and chat in real time.

## Project start up:
* frontend: npm run api;
* frontend: npm run start;
* backend: npm run server; 

## Public Part (Accessible without authentication) - access control
* The public part of the project is visible without authentication
* Home page containing general information
* Presents basic information about the Hospital and answers the question of why a patient would choose its services. 
* Describes the locations of the directories of the hospital.
* Provides statistic news about Covid-19, using json-server db file with data from an external Medical API.
* Displays contact information and social media links. Prominently offers ability to register and login new Patients and new Medical Professionals.
* Ability to view the entire library of all medical professionals, but without the functionality to choose a medic or to set an appointment with him
* No access to edit and delete functionality

## Private Part (Available for Registered Users) - access control
* Registration of users separated by their role - patients or medicals
* Registered users have personal areas in the web application accessible after their successful login:
1. Home page giving access to all medical professionals but now with option to choose medical or to request an appointment if you have already chosen one before
2. Profile page containing information about the current user:
    - Two kinds of profile pages - for patients and for medicals
    - Patients can edit their own personal information
    - Medicals can edit their own personal information
    - Medicals have access to the medical panel information of their patients
3. Access to patients list by the medicals
4. Patients can cancel service and choose another medical
5. Only patient who had chosen a medical, can make an appointment with the latter

## Technologies
* HTML, CSS, JavaScript, React.JS
* Back-end Dependencies: 
    bcryptjs": "^2.4.3",
    "colors": "^1.4.0",
    "cors": "^2.8.5",
    "dotenv": "^15.0.1",
    "express": "^4.17.2",
    "express-async-handler": "^1.2.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.1.9",
    "turnstone"
* Front-end Dependecies:
    "@emotion/react": "^11.8.2",
    "@emotion/styled": "^11.8.1",
    "@mui/material": "^5.5.0",
    "@reduxjs/toolkit": "^1.8.0",
    "@testing-library/jest-dom": "^5.16.2",
    "@testing-library/react": "^12.1.3",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^0.26.1",
    "json-server": "^0.17.0",
    "materialize-css": "^1.0.0-rc.2",
    "react": "^17.0.2",
    "react-calendar": "^3.7.0",
    "react-dom": "^17.0.2",
    "react-icons": "^4.3.1",
    "react-markdown": "^8.0.0",
    "react-redux": "^7.2.6",
    "react-router-dom": "^6.2.2",
    "react-scripts": "5.0.0",
    "react-toastify": "^8.2.0"


