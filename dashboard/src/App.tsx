import React from "react";
import ReactDOM from "react-dom";
import './index.d';
import  Button  from 'ntk_ui/Button';
import "./index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Pages/Layout";
import Netx from "./Pages/Netx";
import Graph from "./Pages/Graph";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Netx />} />
          <Route path="graph" element={<Graph />} />
        </Route>  
      </Routes>
    </BrowserRouter>
  )
}
ReactDOM.render(<App />, document.getElementById("app"));
