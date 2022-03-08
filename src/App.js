import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './helpers/PrivateRoutes.js';
import PublicRoutes from './helpers/PublicRoutes.js';
import Home from './components/Home/Home.js';
import NotFoundPage from './components/NotFoundPage/NotFoundPage.js';

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path='/' element={<Home />} />
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route path='/home' element={<Home />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
          <Route path='/404' element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
