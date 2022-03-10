// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import PaymentResultPage from './PaymentResultPage.js';
import Payment from './Payment';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Payment />} />
            <Route path="/payresult" element={<PaymentResultPage />} />
        </Routes>
    </BrowserRouter>
 
  );
}

export default App;
