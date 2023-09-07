import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import Detail from "./pages/detail";
import { CartProvider } from "./hooks/CartContext";
import { CartVisibilityProvider } from "./hooks/useCartVisibility";
import CartPage from "./components/CartView";
function App() {
  return (
    <CartVisibilityProvider>
      <CartProvider>
        <CartPage />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="*" element={<div>No Found Route</div>} />
        </Routes>
      </CartProvider>
    </CartVisibilityProvider>
  );
}

export default App;
