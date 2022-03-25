import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import PrivateRoutes from './helpers/PrivateRoutes.js';
// import PublicRoutes from './helpers/PublicRoutes.js';
import Navigation from './components/Navigation/Navigation.js';
import Footer from './components/Footer/Footer.js';
import Home from './components/Home/Home.js';
import NotFoundPage from './components/NotFoundPage/NotFoundPage.js';
import FindDoctor from './components/FindDoctor/FindDoctor.js';
import PatientProfile from './components/PatientProfile/PatientProfile.js';
import MedicalProfile from './components/MedicalProfile/MedicalProfile.js';
import MedicalProfessionalCollection from './components/MedicalProfessionalCollection/MedicalProfessionalCollection.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import RegisterMedical from './components/RegisterMedical/RegisterMedical.js';
import Appointments from './components/Appointments/Appointments.js';

function App() {
  const isMedical = sessionStorage.getItem('medical');

  return (
    <div className="App">
      <Navigation />
      <main>
        <Routes>
          {/* <Route element={<PublicRoutes />}> */}
          <Route path='/' element={<Home />} />
          <Route path='/users/login' element={<Login />} />
          <Route path='/users/register-patient' element={<Register />} />
          <Route path='/users/register-medical' element={<RegisterMedical />} />
          {/* </Route> */}

          {/* <Route element={<PrivateRoutes />}> */}
          <Route path='/home' element={<Home />} />
          {/* </Route> */}
          <Route path='/staff' element={<FindDoctor />} />
          {isMedical
            ? <Route path='/profile/:medicalId' element={<MedicalProfile />} />
            : <Route path='/profile/:patientId' element={<PatientProfile />} />
          }
          <Route path='/medical-professionals' element={<MedicalProfessionalCollection />} />
          <Route path='/request-appointment' element={<Appointments />} />
          <Route path='*' element={<NotFoundPage />} />
          <Route path='/404' element={<NotFoundPage />} />
        </Routes>
        <ToastContainer />
      </main>
      <Footer />
    </div>
  );
}

export default App;
