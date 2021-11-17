import React from "react";
import { Link } from "react-router-dom";
import SubMenu from "./SubMenu";

export default function NavBar() {
    return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Trackzilla</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarScroll">
      <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" role="menubar" >
          <SubMenu menuName="Applications" links={[{"name":"View","route":"/viewapplications"},{"name":"Create","route":"/createapplication"}]} />
          <SubMenu menuName="Releases" links={[{"name":"View","route":"/viewreleases"},{"name":"Create","route":"/createrelease"}]} />
          <SubMenu menuName="Tickets" links={[{"name":"View","route":"/viewtickets"},{"name":"Create","route":"/createticket"}]} />
      </ul>
    </div>
  </div>
</nav>
    );
}