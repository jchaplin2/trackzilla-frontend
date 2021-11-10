import React from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";

import ViewReleases from "./components/releases/ViewReleases";
import CreateReleases from "./components/releases/ViewReleases";

import ViewTickets from "./components/tickets/ViewTickets";
import CreateTickets from "./components/tickets/CreateTickets";

import CreateApplication from "./components/application/CreateApplication";
import ViewApplications from "./components/application/ViewApplications";

function App() {
  return (
    <div className="container">
      <NavBar />
      <main role="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/createapplication"
            element={<CreateApplication />}
          />
          <Route
            path="/viewapplications"
            element={<ViewApplications />}
          />
          <Route
            path="/createticket"
            element={<CreateTickets />}
          />
          <Route
            path="/viewtickets"
            element={<ViewTickets />}
          />
          <Route
            path="/createrelease"
            element={<CreateReleases />}
          />
          <Route
            path="/viewreleases"
            element={<ViewReleases />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
