import './App.css';
import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { SpinnerDiamond } from 'spinners-react';
// import PrivateRoutes from './helpers/PrivateRoutes.js';
// import PublicRoutes from './helpers/PublicRoutes.js';
import Navigation from './components/Navigation/Navigation.js';
import Footer from './components/Footer/Footer.js';
import Home from './components/Home/Home.js';
import NotFoundPage from './components/NotFoundPage/NotFoundPage.js';
import FindDoctor from './components/FindDoctor/FindDoctor.js';
import MedicalProfessionalCollection from './components/MedicalProfessionalCollection/MedicalProfessionalCollection.js';
import Login from './components/Login/Login.js';
import LoginMedical from './components/LoginMedical/LoginMedical.js';
import Register from './components/Register/Register.js';
import RegisterMedical from './components/RegisterMedical/RegisterMedical.js';
import Appointments from './components/Appointments/Appointments.js';
import PublicMedicalProfile from './components/PublicMedicalProfile/PublicMedicalProfile.js';
import PublicPatientProfile from './components/PublicPatientProfile/PublicPatientProfile.js';

const MyPatients = lazy(() => {
  return Promise.all([
    import('./components/MyPatients/MyPatients.js'),
    new Promise(resolve => setTimeout(resolve, 5000))
  ]).then(([moduleExports]) => moduleExports);
});

function App() {
  const isMedical = sessionStorage.getItem('role') === 'medical-professional';
  const checkMedical = isMedical === true;

  function FullSpinner() {
    return (
      <div className="full-spinner">
        <SpinnerDiamond size={150} thickness={180} speed={100} color="rgba(57, 97, 172, 1)" secondaryColor="rgba(73, 156, 223)" />
      </div>
    )
  }

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
            ? <Route path='/users/medical/:userId' element={<PublicMedicalProfile />} />
            : <Route path='/users/patient/:userId' element={<PublicPatientProfile />} />
          }
          <Route path='/medicals' element={<MedicalProfessionalCollection />} />
          <Route path='/medicals/my-patients/:userId' element={
            <Suspense fallback={<FullSpinner />}>
              <MyPatients />
            </Suspense>
          } />
          <Route path='/medicals/request-appointment/:userId' element={<Appointments />} />
          <Route path='/my-medical-professional/:medicalId' element={<PublicMedicalProfile />} />
          <Route path='/my-patients/patient/:patientId' element={<PublicPatientProfile />} />
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
