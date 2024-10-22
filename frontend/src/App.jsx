import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Login from './page/login';
import LandingPage from './page/landingPage';
import Homeuser from './page/Home';
import InputTambak from './page/InputTambakBaru';
import PondManagement from './page/DaftarKolam';
import InputExcel from './page/InputExcel';
import TambakSimulation from './page/Simulasi';




function App() {
  return (
    <Router> {/* Tambahkan Router di sini */}
      <Fragment>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/Home" element={<Homeuser/>} />
          <Route path="/InputTambak" element={<InputTambak/>} />
          <Route path="/DaftarKolam" element={<PondManagement/>} />
          <Route path="/InputExcel" element={<InputExcel/>} />
          <Route path="/Simulasi" element={<TambakSimulation/>} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
