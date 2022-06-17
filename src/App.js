import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home/Home";
import CharacterDetail from "./components/CharacterDetail/CharacterDetail";
import { CartProvider } from "./components/CartContext/CartContext";
import CategoryDetail from "./views/CategoryDetail/CategoryDetail";
import Checkout from "./views/Checkout/Checkout";
import { ToastContainer } from "react-toastify";
import { Cart } from "./views/Cart/Cart";

function App() {
  const [loading, setloading] = useState(true);

  //PARA PROBAR EL SPINNER
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 1);
  }, []);

  return (
    <CartProvider>
      <BrowserRouter>
        <div style={{ textAlign: "center" }}>
          <NavBar />
          {loading && <div className="spinner-border" role="status"></div>}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<CharacterDetail />} />
            <Route path="/category/:category" element={<CategoryDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<h1>Esta pagina no existe.</h1>} />
            <Route path="/detail/*" element={<h1>Esta item no existe.</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </CartProvider>
  );
}

export default App;
