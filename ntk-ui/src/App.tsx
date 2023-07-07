import React from "react";
import ReactDOM from "react-dom";
import Button from "./Components/Button/Button";

import "./index.css";

const App = () => (
  <div className="container">
    <Button />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
