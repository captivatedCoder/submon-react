import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">      
        <div className="navbar-nav">
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link px-2" to="/subscriptions">
                {user.name}
              </NavLink>
              <NavLink className="nav-item nav-link px-2" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>      
    </nav>
  );
};

export default NavBar;
