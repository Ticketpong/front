import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";

import Header from "./components/base/Header";
import Footer from "./components/base/Footer";
import Ticketing from "./pages/ticketing/Ticketing";
import Homepage from "./pages/homepage/HomePage";
import MyPage from "./pages/mypage/MyPage";
import WriteReview from "./components/base/WriteReview";
import Performance from "./pages/performance/Performance";
import Community from "./pages/community/Community";
import LoginPage from "./pages/manageuser/LoginPage";
import SignupPage from "./pages/manageuser/SignupPage";
import MyReview from "./components/features/MyPage/MyReview";
import EditMyReview from "./components/features/MyPage/EditMyReview";
import ReviewDetail from "./components/features/Community/ReviewDetail";
import ManageLoginPage from "./pages/managepage/ManageLoginPage";
import ManagePage from "./pages/managepage/ManagePage";
import ApiDataFetcher from "./components/base/ApiDataFetcher";
import SearchResult from "./pages/searchresult/SearchResult";
import FindId from "./pages/findidpw/FindId";
import FindPw from "./pages/findidpw/FindPw";
import ConfirmId from "./pages/findidpw/ConfirmId";

// 자동 스크롤 기능 추가
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  document.body.style.margin = "0";
  const pathname = window.location.pathname;

  // 현재 경로가 login, signup이면 false
  const showHF = !["/login", "/signup"].includes(pathname);
  

  return (
    <div className="App">
      <BrowserRouter>
        {showHF && <Header />}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/writereview" element={<WriteReview />} />
          <Route path="/community" element={<Community />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/viewall" element={<Performance />} />
          <Route path="/ticketing/:mt20id" element={<Ticketing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/manage" element={<ManageLoginPage />} />
          <Route path="/managepage" element={<ManagePage />} />
          <Route
            path="/editmyreview/:prfnmText"
            element={<EditMyReview />}
          ></Route>
          <Route path="/myreview" element={<MyReview />}></Route>
          <Route
            path="/reviewdetail/:prfnmText"
            element={<ReviewDetail />}
          ></Route>
          <Route path="apiData" element={<ApiDataFetcher />}></Route>
          <Route path="/searchresult" element={<SearchResult />} />
          <Route path="/findid" element={<FindId />} />
          <Route path="/findpw" element={<FindPw />} />
          <Route path="/confirmid" element={<ConfirmId />} />
        </Routes>
        {showHF && <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;
