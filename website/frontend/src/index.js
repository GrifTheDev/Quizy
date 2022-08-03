import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import addressJson from "./address.json";
import "./App.css";

const { address } = addressJson;
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <h1>Starting...</h1>
    <p>
      Attempting to ping the web-server at {address}.
    </p>
  </>
);
axios
  .get(address)
  .then((res) => {
    if (res.status == 200) { //eslint-disable-line
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    }
  })
  .catch((error) => {
    root.render(
      <React.StrictMode>
        <h1>Well, something's gone wrong...</h1>
        <p>It appears that the backend server (located at {address}) cannot be reached. This server is <b>required</b> to play Quizzy. 
        <br></br>
        <br></br>
        Please check that:
        <br></br>
        - The web server is running. For more infromation go to: https://example.com.
        <br></br>
        - No errors have been logged in the backend server console.
        <br></br>
        - Network requests to {address} aren't being blocked.
        <br></br>
        </p>
        <p class="spicy">If you're feeling spicy, you can set the <span class="codeblock">dontPingServer</span> config option to <span class="codeblock"> false </span> for the website to not ping the server on startup. This will most likely break things.</p>
      </React.StrictMode>
    );
  });
