import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx"; // ✅ import the provider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider> {/* ✅ wrap your app with the provider */}
      <App />
    </CartProvider>
  </StrictMode>
);