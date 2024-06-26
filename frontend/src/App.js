import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import ProfilePage from "./Pages/Profile/ProfilePage";
import StudRegisterPage from "./Pages/StudRegister/StudRegisterPage";
import StudUpdatePage from "./Pages/StudUpdate/StudUpdatePage";
import LogPage from "./Pages/Logs/LogPage";
import NavBar from "./Components/Navigation/NavBar";
import Drower from "./Components/Drawer/Drower";
import "./App.css";
import StudCourseUpdate from "./Pages/StudCourses/StudCourseUpdate";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="app-container">
        <Drower />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile/:studRegNumber" element={<ProfilePage />} />
            <Route path="/StudRegister" element={<StudRegisterPage />} />
            <Route
              path="/StudUpdate/:studRegNumber"
              element={<StudUpdatePage />}
            />
            <Route path="/logs" element={<LogPage />} />
            <Route
              path="/courses/:studRegNumber"
              element={<StudCourseUpdate />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
