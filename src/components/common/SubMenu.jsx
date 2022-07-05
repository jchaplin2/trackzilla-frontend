import React from "react";
import { Link } from "react-router-dom";

export default function SubMenu({menuName, links}) {
    return (
        <li className="nav-item dropdown" data-testid={menuName.toLowerCase()} >
          <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {menuName}
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown" role="menu">
          {links.map((link, index, arr) => {
            let divider = index < arr.length - 1 ? <li key={index} ><hr className="dropdown-divider" /></li> : "";

            return (
                <React.Fragment key={index}>
                    <li role="none"><Link role="menuitem" className="dropdown-item" to={link['route']}> {link["name"]} </Link></li>
                    {divider}
                </React.Fragment>
             );
          })}
          </ul>
        </li>
    );
}