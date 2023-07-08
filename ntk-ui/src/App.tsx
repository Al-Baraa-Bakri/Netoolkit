import React from "react";
import ReactDOM from "react-dom";
import Button from "./Components/Button/Button";
import "./index.scss";

const App = () => (
  <div className="container">
    <Button label="NTK-BTN"/>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
