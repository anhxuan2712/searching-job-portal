import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import Nav from './Nav';
import SidebarNav from './SidebarNav';


class DashboardAdmin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.authenticated || this.props.roleName !== "ROLE_ADMIN") {
      return <Redirect
        to={{
          pathname: "/login-admin",
          state: { from: this.props.location }
        }} />;
    }
    const name = this.props.currentUser;

    return (
      <div className="wrapper">
        <nav id="sidebar" className="sidebar js-sidebar">
          <div className="sidebar-content js-simplebar">
            <a className="sidebar-brand" href="index.html">
              <span className="align-middle">ADMIN PRO</span>
            </a>
            <SidebarNav />
          </div>
        </nav>

        <div className="main">
          <Nav onLogout={this.props.onLogout}/>

          <main className="content">
            <div className="container-fluid p-0">
              <h1 className="h3 mb-3"><strong>Dashboard</strong></h1>
                <span>Quản lí của Admin ✨✨✨</span>
            </div>

            
          </main>
        </div>
      </div>
    )
  }
}

export default DashboardAdmin;