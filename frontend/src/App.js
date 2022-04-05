import './App.css';
import React, { Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import { SpinnerDiamond } from 'spinners-react/lib/esm/SpinnerDiamond';
import PrivateRoutes from './helpers/PrivateRoutes';
import PublicRoutes from './helpers/PublicRoutes.js';
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
import Socket from './components/Socket/Socket.js';
import RegisterAdmin from './components/RegisterAdmin/RegisterAdmin.js';
import LoginAdmin from './components/LoginAdmin/LoginAdmin.js';
import EditUser from './components/EditUser/EditUser.js';
import EditMedical from './components/EditMedical/EditMedical.js';

const MyPatients = lazy(() => {
  return Promise.all([
    import('./components/MyPatients/MyPatients.js'),
    new Promise(resolve => setTimeout(resolve, 5000))
  ]).then(([moduleExports]) => moduleExports);
});

function App() {
  const isAdmin = sessionStorage.getItem('role') === 'admin';
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
      <ToastContainer />
      <main>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path='/users/patient/login' element={<Login />} />
            <Route path='/users/medical/login' element={<LoginMedical />} />
            <Route path='/users/register-patient' element={<Register />} />
            <Route path='/users/register-medical' element={<RegisterMedical />} />
          </Route>
          
          <Route path='/' element={<Home />}>
            <Route path='/home' element={<Home />} />
          </Route>
          <Route path='/users/login-admin' element={<LoginAdmin />} />
          <Route path='/users/register-admin' element={<RegisterAdmin />} />
          <Route path='/staff' element={<FindDoctor />} />
          <Route path='/medicals' element={<MedicalProfessionalCollection />} />
          {isAdmin
            ? <Route>
              <Route path='/users/admin/dashboard/:userId' element={<LoginAdmin />} />
            </Route>
            : null
          }

          <Route element={<PrivateRoutes />}>
            <Route path='/users/medical/:userId' element={<PublicMedicalProfile />} />
            <Route path='/users/patient/:userId' element={<PublicPatientProfile />} />
            <Route path='/medicals/my-patients/:userId' element={
              <Suspense fallback={<FullSpinner />}>
                <MyPatients />
              </Suspense>
            } />
            <Route path='/users/patient/:userId/edit' element={<EditUser />} />
            <Route path='/medicals/edit/:userId' element={<EditMedical />} />
            <Route path='/medicals/request-appointment/:userId' element={<Appointments />} />
            <Route path='/my-medical-professional/:medicalId' element={<PublicMedicalProfile />} />
            <Route path='/my-patients/patient/:patientId' element={<PublicPatientProfile />} />
            <Route path='/chat/:userId' element={<Socket />} />
          </Route>

          <Route path='*' element={<NotFoundPage />} />
          <Route path='/404' element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
