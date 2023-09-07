import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import Detail from "./pages/detail";
import { CartProvider } from "./hooks/CartContext";

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<div>No Found Route</div>} />
      </Routes>
    </CartProvider>
  );
}

export default App;
