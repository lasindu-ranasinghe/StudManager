import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import ProfilePage from "./Pages/Profile/ProfilePage";
import StudRegisterPage from "./Pages/StudRegister/StudRegisterPage";
import LogPage from "./Pages/Logs/LogPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/StudRegister" element={<StudRegisterPage />} />
            <Route path="/logs" element={<LogPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
