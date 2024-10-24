import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Login from './page/login';
import SignUp from './page/singup';
import LandingPage from './page/landingPage';
import Homeuser from './page/Home';
import InputTambak from './page/InputTambakBaru';
import PondManagement from './page/DaftarKolam';
import InputExcel from './page/InputExcel';
import TambakSimulation from './page/Simulasi';
import HargaLele from './page/HargaLele';
import PenyakitLele from './page/PenyakitLele';
import Notification from './page/Notifikasi';
import Blog from './page/Blog';




function App() {
  return (
    <Router> {/* Tambahkan Router di sini */}
      <Fragment>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/Home" element={<Homeuser/>} />
          <Route path="/InputTambak" element={<InputTambak/>} />
          <Route path="/DaftarKolam" element={<PondManagement/>} />
          <Route path="/InputExcel" element={<InputExcel/>} />
          <Route path="/Simulasi" element={<TambakSimulation/>} />
          <Route path="/HargaLele" element={<HargaLele/>} />
          <Route path="/PenyakitLele" element={<PenyakitLele/>} />
          <Route path="/Notifikasi" element={<Notification/>} />
          <Route path="/Blog" element={<Blog/>} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
