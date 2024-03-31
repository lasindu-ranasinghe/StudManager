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

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="app-container">
        <Drower />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/StudRegister" element={<StudRegisterPage />} />
            <Route path="/StudUpdate" element={<StudUpdatePage />} />
            <Route path="/logs" element={<LogPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
