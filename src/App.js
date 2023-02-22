import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/common/NavBar";
import PageNotFound from "./components/common/PageNotFound";
import Home from "./components/Home";

import ViewReleases from "./components/releases/ViewReleases";
import EditReleases from "./components/releases/EditReleases";
import CreateReleases from "./components/releases/CreateReleases";

import ViewTickets from "./components/tickets/ViewTickets";
import EditTickets from "./components/tickets/EditTickets";
import CreateTickets from "./components/tickets/CreateTickets";

import CreateApplications from "./components/application/CreateApplications";
import EditApplications from "./components/application/EditApplications";
import ViewApplications from "./components/application/ViewApplications";

import Login from "./components/login/Login";
import CreateAccount from "./components/login/CreateAccount";
import AuthContext from "./store/auth-context";

function App() {
  const authContext = useContext(AuthContext);
  return (
    <div id="app" className="container">
      <NavBar />
      <main role="main">
        <Routes>
          <Route path="/" element={<Home />} />
          {authContext.isLoggedIn && (
            <>
              <Route
                path="/createapplication/"
                element={<CreateApplications />}
              />
              <Route
                path="/editapplication/:id"
                element={<EditApplications />}
              />
              <Route
                path="/viewapplications/"
                element={<ViewApplications />}
              />
              <Route
                path="/createticket/"
                element={<CreateTickets />}
              />
              <Route
                path="/viewtickets/"
                element={<ViewTickets />}
              />
              <Route
                path="/editticket/:id"
                element={<EditTickets />}
              />
              <Route
                path="/createrelease/"
                element={<CreateReleases />}
              />
              <Route
                path="/editrelease/:id"
                element={<EditReleases />}
              />
              <Route
                path="/viewreleases/"
                element={<ViewReleases />}
              />
            </>
          )}
          <Route path="/login/" element={<Login />} />
          <Route
            path="/createaccount/"
            element={<CreateAccount />}
          />
          <Route path="/404" element={<PageNotFound />} />
          <Route
            path="*"
            element={<Navigate replace to="/404" />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
