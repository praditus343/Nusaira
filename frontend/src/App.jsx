import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Login from './page/login';
import LandingPage from './page/landingPage';
import Homeuser from './page/Home';




function App() {
  return (
    <Router> {/* Tambahkan Router di sini */}
      <Fragment>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/Home" element={<Homeuser/>} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
