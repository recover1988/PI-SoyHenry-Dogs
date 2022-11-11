import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

//Here connect the localhost with axios
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001/";

//Here connect the store from redux and the routes from redux
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter  >
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
