import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/homepage/HomePage";
import MyPage from "./pages/mypage/MyPage";
import WriteReview from "./components/WriteReview";
import ViewAll from "./pages/ViewAll/ViewAll";
import Community from "./pages/community/Community";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/writereview" element={<WriteReview />}></Route>
          <Route path="/community" element={<Community />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/viewall" element={<ViewAll />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
