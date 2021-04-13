import React, {useContext, useEffect, Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import AuthContext from "../layouts/auth/AuthContext"

const Header = props => {
  const authContext = useContext(AuthContext)
  const {user, isAuthenticated, logout} = authContext
  const Exit = () => {
    logout();
  }
  const authlink = (
    <Fragment>
      <li
        class={`nav-item  ${
        props.location.pathname === "/curriculum" ? "active" : ""
        }`}
        >
        <Link class="nav-link" to="/curriculum">
          Curriculum
        </Link>
      </li>
      <li
        class={`nav-item  ${
          props.location.pathname === "/profile" ? "active" : ""
        }`}
      >
        <Link class="nav-link" to="/profile">
          Profile
        </Link>
      </li>
      <li class={`nav-item`}>
      <Link class="nav-link" to="/add-curriculum">
          Add Curriculum
        </Link>
      </li>  
      <li
        class={`nav-item`}
        >
        <a onClick={Exit} class="nav-link" href="/login">
          Logout
        </a>
      </li>

    </Fragment>
  )
  const unauthlink = (
    <Fragment>
      <li
        class={`nav-item  ${
          props.location.pathname === "/login" ? "active" : ""
        }`}
      >
        <Link class="nav-link" to="/login">
          Sign-In
          <span class="sr-only">(current)</span>
        </Link>
      </li>
      <li
        class={`nav-item  ${
          props.location.pathname === "/register" ? "active" : ""
        }`}
      >
        <Link class="nav-link" to="/register">
          Sign Up
        </Link>
      </li>
    </Fragment>
  )
  return (
    <div className="header">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
          <Link class="navbar-brand" to="/">
            Professor's Place
          </Link>
          <div>
            <ul class="navbar-nav ml-auto">
              {isAuthenticated ? authlink : unauthlink}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Header);