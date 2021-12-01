import './App.css';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import BreedCreate from "./components/BreedCreate";
import Detail from "./components/Detail";
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <Router>
    <div>
    <Routes>
          <Route exact path="/" element={<LandingPage/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/createbreed" element={<BreedCreate/>} />
          <Route path="/breed/:id" element={<Detail/>} />
      </Routes>
    </div>
 </Router> );
}

export default App;
