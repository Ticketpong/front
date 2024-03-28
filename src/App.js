import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Ticketing from "./pages/ticketing/Ticketing";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  const pathname = window.location.pathname;

  // 현재 경로가 login, signup이면 false
  const showHF = !["/login", "/signup"].includes(pathname);

  return (
    <div className="App">
      <BrowserRouter>
        {showHF && <Header />}
        <Routes>
          <Route path="/ticketing" element={<Ticketing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
        {showHF && <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;
