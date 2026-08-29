import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import Nav from './Nav';
import SidebarNav from './SidebarNav';
import AddJob from './AddJob';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

class Dashboard extends React.Component {

  render() {
		if (!this.props.authenticated || this.props.roleName !== "ROLE_RECRUITER") {
			return <Redirect
				to={{
					pathname: "/login-recruiter",
					state: { from: this.props.location }
				}} />;
		}

    console.log("USER",this.props.username)
    return (
      <div className="wrapper">
        <nav id="sidebar" className="sidebar js-sidebar">
          <div className="sidebar-content js-simplebar">
            <a className="sidebar-brand" href="index.html">
              <span className="align-middle">Nhà Tuyển Dụng</span>
            </a>
            <SidebarNav />
          </div>
        </nav>

        <div className="main">
          <Nav onLogout={this.props.onLogout} username={this.props.username}/>

          <main className="content">
            <div className="container-fluid p-0">
              <h1 className="h3 mb-3"><strong>Dashboard</strong></h1>
                <span>Quản lí của Nhà Tuyển Dụng ✨✨✨</span>
            </div>
          </main>
        </div>
      </div>
    )
  }
}

export default Dashboard;