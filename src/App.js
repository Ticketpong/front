import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Ticketing from "./pages/ticketing/Ticketing";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/"></Route>
          <Route path="/ticketing" element={<Ticketing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
