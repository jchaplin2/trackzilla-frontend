import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/common/NavBar";
import PageNotFound from "./components/common/PageNotFound";
import Home from "./components/Home";

import ViewReleases from "./components/releases/ViewReleases";
import EditReleases from "./components/releases/EditReleases";
import CreateReleases from "./components/releases/CreateReleases";

import ViewTickets from "./components/tickets/ViewTickets";
import CreateTickets from "./components/tickets/CreateTickets";

import CreateApplication from "./components/application/CreateApplication";
import ViewApplications from "./components/application/ViewApplications";

function App() {
  return (
    <div id="app" className="container">
      <NavBar />
      <main role="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/createapplication/"
            element={<CreateApplication />}
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
