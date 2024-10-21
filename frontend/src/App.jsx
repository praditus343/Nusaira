import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Impor BrowserRouter
import LandingPage from './page/landingPage';


function App() {
  return (
    <Router> {/* Tambahkan Router di sini */}
      <Fragment>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
