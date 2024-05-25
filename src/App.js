import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import DashBoard from "./components/DashBoard";
import UploadPost from "./components/UploadPost";
import ViewPosts from "./components/ViewPosts";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/upload" element={<UploadPost />} />
        <Route path="/view-posts" element={<ViewPosts />} />
      </Routes>
    </div>
  );
}

export default App;
