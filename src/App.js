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
import MyPatients from './components/MyPatients/MyPatients.js';
import Login from './components/Login/Login.js';
import LoginMedical from './components/LoginMedical/LoginMedical.js';
import Register from './components/Register/Register.js';
import RegisterMedical from './components/RegisterMedical/RegisterMedical.js';
import Appointments from './components/Appointments/Appointments.js';

function App() {
  const isMedical = sessionStorage.getItem('role') === 'medical-professional';
  const checkMedical = isMedical === true;

  return (
    <div className="App">
      <Navigation />
      <main>
        <Routes>
          {/* <Route element={<PublicRoutes />}> */}
          <Route path='/' element={<Home />} />
          <Route path='/users/patient/login' element={<Login />} />
          <Route path='/users/medical/login' element={<LoginMedical />} />
          <Route path='/users/register-patient' element={<Register />} />
          <Route path='/users/register-medical' element={<RegisterMedical />} />
          {/* </Route> */}

          {/* <Route element={<PrivateRoutes />}> */}
          <Route path='/home' element={<Home />} />
          {/* </Route> */}
          <Route path='/staff' element={<FindDoctor />} />
          {checkMedical
            ? <Route path='/users/medical/:userId' element={<MedicalProfile />} />
            : <Route path='/users/patient/:userId' element={<PatientProfile />} />
          }
          <Route path='/medicals' element={<MedicalProfessionalCollection />} />
          <Route path='/my-patients' element={<MyPatients />} />
          <Route path='/request-appointment/:medicalId' element={<Appointments />} />
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
