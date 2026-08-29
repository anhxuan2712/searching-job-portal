import React from "react"
import { Link, NavLink } from 'react-router-dom';

class Nav extends React.Component {
    render(){
    return (
        <nav className="navbar navbar-expand navbar-light navbar-bg">
        <a className="sidebar-toggle js-sidebar-toggle">
          <i className="hamburger align-self-center"></i>
        </a>

        <div className="navbar-collapse collapse">
          <ul className="navbar-nav navbar-align">
            <li className="nav-item dropdown">
              <a className="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-bs-toggle="dropdown">
                <i className="align-middle" data-feather="settings"></i>
              </a>

              <a className="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-bs-toggle="dropdown">
                <img src="../assets/img/logo/logo.png" className="avatar img-fluid rounded me-1" alt="" /> <span className="text-dark">RECRUITER</span>
              </a>
              
              <div className="dropdown-menu dropdown-menu-end">
                <Link className="dropdown-item" to="/recruiter/profile"><i className="align-middle me-1" data-feather="user"></i> Profile</Link>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" onClick={this.props.onLogout}>Logout</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    )
}}

export default Nav;