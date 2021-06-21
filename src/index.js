import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { AuthProvider, VideosProvider } from "./contexts";
import { BrowserRouter as Router } from "react-router-dom";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <AuthProvider>
      <VideosProvider>
        <Router>
          <App />
        </Router>
      </VideosProvider>
    </AuthProvider>
  </StrictMode>,
  rootElement
);
