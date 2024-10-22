import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Login from './page/login';
import SignUp from './page/singup';
import LandingPage from './page/landingPage';
import Homeuser from './page/Home';
import about from './page/about';



function App() {
  return (
    <Router> {/* Tambahkan Router di sini */}
      <Fragment>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/Home" element={<Homeuser/>} />
          <Route path="/about" element={<about/>} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
