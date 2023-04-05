import './App.css';
import ReactDOM from "react-dom/client";

import React, { Component } from 'react'
import News from './components/News';


import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<News />}/>
        <Route exact path="/Home" element={<News  country={"in"}   catagory={"general"}/>}/>
        <Route exact path="/About" element={<News  country={"in"}   catagory={"About"}/>}/>
        <Route exact path="/Science" element={<News  country={"in"}   catagory={"science"}/>}/>
        <Route exact path="/Entertainment" element={<News  country={"in"}   catagory={"entertainment"}/>}/>
        <Route exact path="/Sports" element={<News  country={"in"}   catagory={"sports"}/>}/>
        <Route exact path="/Health" element={<News  country={"in"}   catagory={"healt"}/>}/>
        <Route exact path="/Buisness" element={<News  country={"in"}   catagory={"buisness"}/>}/>
        <Route exact path="/Technology" element={<News  country={"in"}   catagory={"technology"}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

