import "./App.css";
import Layout from "./pages/Layout";
import Authenticate from "./pages/Authenticate";
import BurgerBuilder from "./pages/BurgerBuilder";
import Orders from "./pages/Orders";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<BurgerBuilder />} />
            <Route path="auth" element={<Authenticate />} />
            <Route path="signup" element={<Signup />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
