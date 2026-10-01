import "./App.css";

import Header from "./components/HeaderFooter/Header";
import Footer from "./components/HeaderFooter/Footer";

import Home from "./components/Pages/Home";
import Product from "./components/Pages/Product";
import Contact from "./components/Pages/Contact";
import Hooks from "./components/Pages/Hooks";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from "./components/Pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hooks" element={<Hooks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout/>} />

       
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;