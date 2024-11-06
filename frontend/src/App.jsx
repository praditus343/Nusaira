import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Login from './page/login';
import SignUp3 from './page/singup3';
import SignUp2 from './page/singup2';
import SignUp from './page/singup';
import LandingPage from './page/landingPage';
import Homeuser from './page/Home';
import InputTambak from './page/InputTambakBaru';
import TambakSimulation from './page/Simulasi';
import UserProfile from './page/UserProfile';
import Invoice from './page/Invoice';
import Premium from './page/Premium';
import HargaLele from './page/HargaLele';
import PenyakitLele from './page/PenyakitLele';
import Notifikasi from './page/Notifikasi';
import FinalStepUI from './page/FInalStep';
import Pengeluaran from './page/Pengeluaran';
import Pemasukan from './page/Pemasukan';
import Management from './page/ManajemenTambak';
import KabarLele from './page/KabarLele';
import Laporan from './page/Laporan';
import Ringkasan from './page/Ringkasan';
import AquacultureDashboard from './componen/AquacultureDashboard';
import ChatAi from './page/ChatAi';
import PriceHistory from './page/PriceHistory';
import PriceTrending from './page/PriceTrending';
import SupplierDetail from './page/SupplierDetail';
import SuccessfulPayment from './componen/PembayaranBerhasil';
import ElearningSidebar from './componen/ElearningSidebar';
import MyBooks from './page/BukuSaya';
import RingkasanLearning from './page/RingkasanLearning';
import ArticlePage from './page/ArtikelPenyakit';
import PengatutanTambak from './page/PengaturanTambak';
import PondManagement from './page/DaftarKolam';
import LupaPass1 from './page/LupaPass1';
import LupaPass2 from './page/LupaPass2';
import LupaPass3 from './page/LupaPass3';
import Pembayaran from './page/Pembayaran';


function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup2" element={<SignUp2 />} />
          <Route path="/signup3" element={<SignUp3 />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/Home" element={<Homeuser />} />
          <Route path="/InputTambak" element={<InputTambak />} />
          <Route path="/DaftarKolam" element={<PondManagement />} />
          <Route path="/ManajemenTambak" element={<Management />} />
          <Route path="/Simulasi" element={<TambakSimulation />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/AksesPremium" element={<Premium />} />
          <Route path="/HargaLele" element={<HargaLele />} />
          <Route path="/PenyakitLele" element={<PenyakitLele />} />
          <Route path="/Notifikasi" element={<Notifikasi />} />
          <Route path="/Blog" element={<KabarLele />} />
          <Route path="/FinalStep" element={<FinalStepUI />} />
          <Route path="/Pengeluaran" element={<Pengeluaran />} />
          <Route path="/Pemasukan" element={<Pemasukan />} />  
          <Route path="/Laporan" element={<Laporan />} />  
          <Route path="/KabarLele" element={<KabarLele />} /> 
          <Route path="/Ringkasan" element={<Ringkasan />} />
          <Route path="/AquacultureDashboard" element={<AquacultureDashboard />} /> 
          <Route path="/ChatAi" element={<ChatAi />} />
          <Route path="/PriceHistory" element={<PriceHistory />} />
          <Route path="/PriceTrend" element={<PriceTrending />} />
          <Route path="/supplier/:supplierId" element={<SupplierDetail />} />
          <Route path="/PembayaranBerhasil" element={<SuccessfulPayment />} />
          <Route path="/ElearningSidebar" element={<ElearningSidebar />} />
          <Route path="/MyBooks" element={<MyBooks />} />
          <Route path="/Invoice" element={<Invoice />} />
          <Route path="/RingkasanLearning" element={<RingkasanLearning />} />
          <Route path="/artikel/:id" element={<ArticlePage />} />
          <Route path="/PengaturanTambak" element={<PengatutanTambak />} />
          <Route path="/LupaPass1" element={<LupaPass1 />} />
          <Route path="/LupaPass2" element={<LupaPass2 />} />
          <Route path="/LupaPass3" element={<LupaPass3 />} />
          <Route path="/Pembayaran" element={<Pembayaran />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
