import React from "react";
import ReactDOM from "react-dom";
import './index.d';
import  Button  from 'ntk_ui/Button';
import "./index.scss";

const App = () => {
  return (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <Button label={ "BTN" }/>
  </div>
  )
}
ReactDOM.render(<App />, document.getElementById("app"));
