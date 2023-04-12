import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { YogaProvider } from "./YogaContext";
import Home from "./pages/Home";
import Yoga from "./pages/Yoga";
import About from "./pages/About";
import Tutorials from "./pages/Tutorials";
import YogaCanvas from "./pages/YogaCanvas";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <YogaProvider>
      <Router>
        <div className="w-screen h-screen bg-gradient">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/start" element={<Yoga />} />
            <Route path="/about" element={<About />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/yoga" element={<YogaCanvas />} />
          </Routes>
        </div>
      </Router>
    </YogaProvider>
  );
}