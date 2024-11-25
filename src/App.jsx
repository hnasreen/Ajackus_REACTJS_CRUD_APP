import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./components/Create";
import Home from "./components/Home";
import Update from "./components/Update";
import View from "./components/View";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/update/:id" element={<Update />}></Route>
        <Route path="/view/:id" element={<View />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
