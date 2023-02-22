import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import App from "./App";
import rootReducer from "./redux/reducers";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";

import ErrorBoundary from "./components/common/ErrorBoundary";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "@popperjs/core/dist/cjs/popper.js";
import "bootstrap/dist/js/bootstrap.min.js";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <AuthContextProvider>
    <BrowserRouter>
      <Provider store={store}>
        <React.StrictMode>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </React.StrictMode>
      </Provider>
    </BrowserRouter>
  </AuthContextProvider>
);
