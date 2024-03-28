import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/homepage/HomePage";
import MyPage from "./pages/mypage/MyPage";
import WriteReview from "./components/WriteReview";
import ViewAll from "./pages/ViewAll/ViewAll";
import Community from "./pages/community/Community";
import Header from "./components/Header";
import Ticketing from "./pages/ticketing/Ticketing";
import MyReview from "./features/MyPage/MyReview";
import EditMyReview from "./features/MyPage/EditMyReview";

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
          <Route path="/ticketing" element={<Ticketing />}></Route>
          <Route
            path="/editmyreview/:prfnmText"
            element={<EditMyReview />}
          ></Route>
          <Route path="/myreview" element={<MyReview />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
