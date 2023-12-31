import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ToDoPage from "./pages/ToDoPage";
import SignalPage from "./pages/SignalPage";
import LoginPage from "./pages/LoginPage";
import Sidebar from "./components/Sidebar";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Sidebar />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/todo"
              element={
                <PrivateRoute>
                  <ToDoPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/signal"
              element={
                <PrivateRoute>
                  <SignalPage />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
