import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ComingSoon from "./pages/ComingSoon";
import NotesHub from "./pages/NotesHub";

function AppRouter() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notes" element={<NotesHub />} />
          <Route
            path="/bazaar"
            element={<ComingSoon feature="College Bazaar" />}
          />
          <Route
            path="/events"
            element={<ComingSoon feature="Event Calendar" />}
          />
          <Route
            path="/doubt-solver"
            element={<ComingSoon feature="Doubt Solver" />}
          />
          <Route path="/ai-tools" element={<ComingSoon feature="AI Tools" />} />
          <Route
            path="/freelance"
            element={<ComingSoon feature="Freelance Projects" />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default AppRouter;
