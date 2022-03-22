import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './helpers/PrivateRoutes.js';
import PublicRoutes from './helpers/PublicRoutes.js';
import Home from './components/Home/Home.js';
import NotFoundPage from './components/NotFoundPage/NotFoundPage.js';
import FindDoctor from './components/FindDoctor/FindDoctor.js';
import MedicalProfessionalCollection from './components/MedicalProfessionalCollection/MedicalProfessionalCollection.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route path='/home' element={<Home />} />
          </Route>
          <Route path='/staff' element={<FindDoctor />} />
          <Route path='/medical-professionals' element={<MedicalProfessionalCollection />} />
          <Route path='*' element={<NotFoundPage />} />
          <Route path='/404' element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
