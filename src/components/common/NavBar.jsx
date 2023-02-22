import React, { useContext} from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import SubMenu from "./SubMenu";

export default function NavBar() {
  const auth = useContext(AuthContext);
  const {roles} = auth;

  const isLoggedIn = auth.isLoggedIn;
  const logoutHandler = () => {
    auth.logout();
  };

  const hasRole = (roles, role) => {
      return roles.includes(role);
  };

    return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Trackzilla</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarScroll">
      <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" role="menubar" >
          { isLoggedIn && 
            <React.Fragment>
                  { hasRole(roles, 'ROLE_APPLICATION_USER') &&
                     <SubMenu menuName="Applications" links={[{"name":"View","route":"/viewapplications"},{"name":"Create","route":"/createapplication"}]} /> }
                  { hasRole(roles, 'ROLE_RELEASE_USER') &&
                   <SubMenu menuName="Releases" links={[{"name":"View","route":"/viewreleases"},{"name":"Create","route":"/createrelease"}]} /> }
                  { hasRole(roles, 'ROLE_TICKET_USER') &&
                    <SubMenu menuName="Tickets" links={[{"name":"View","route":"/viewtickets"},{"name":"Create","route":"/createticket"}]} />}
            </React.Fragment>
          }
          { !isLoggedIn && 
            (<React.Fragment>
              <li className="nav-item" data-testid="Login" >
                <button className="nav-link btn btn-link" href="" >
                  <Link role="menuitem" className="dropdown-item" to="/login"> Login </Link>
                </button>
              </li>
            </React.Fragment>)
          }
          <React.Fragment>
            <li className="nav-item" data-testid="Login" >
              <button className="nav-link btn btn-link" href="" >
                <Link role="menuitem" className="dropdown-item" to="/createaccount"> Create Account </Link>
              </button>
            </li>
          </React.Fragment>
          { isLoggedIn && 
            (<React.Fragment>
              <li className="nav-item" data-testid="Login" >
                <button className="nav-link btn btn-link" href="" onClick={logoutHandler} >
                  Logout
                </button>
              </li>
            </React.Fragment>)
          }
      </ul>
    </div>
  </div>
</nav>
    );
}