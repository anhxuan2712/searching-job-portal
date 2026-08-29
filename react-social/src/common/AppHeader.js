import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const AppHeader = ({ authenticated, onLogout }) => {
    useEffect(() => {
        if (window.location.pathname === '/') {
          
        }
      }, []);
    return (
        <header>
            <div className="header-area header-transparrent">
                <div className="headder-top header-sticky">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-3 col-md-2">
                                <div className="logo">
                                    <Link to="/">
                                        <img src="../assets/img/logo/logo-full.png" alt="" style={{ width: "50%", borderRadius: "15px" }} />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-9">
                                <div className="menu-wrapper">
                                    <div className="main-menu">
                                        <nav className="d-none d-lg-block">
                                            <ul id="navigation">
                                                <li>
                                                    <NavLink to="/" exact>
                                                        Trang chủ
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/job-list">Việc làm</NavLink>
                                                </li>
                                                <li>
                                                    <a href="#">Thông tin</a>
                                                    <ul className="submenu">
                                                        <li>
                                                            <NavLink to="/advertisement">Quảng Cáo</NavLink>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <NavLink to="/contact">Liên hệ</NavLink>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>

                                    {!authenticated ? (
                                        <div className="header-btn d-none f-right d-lg-block">
                                            <NavLink to="/login" className="btn head-btn1">
                                                Đăng Nhập
                                            </NavLink>
                                            <NavLink to="/signup" className="btn head-btn1">
                                                Đăng Kí
                                            </NavLink>
                                            <NavLink to="/login-recruiter" className="btn btn-primary head-btn2">
                                                Đăng tuyển
                                            </NavLink>
                                        </div>
                                    ) : (
                                        <div className="header-btn d-none f-right d-lg-block">
                                            <NavLink to="/profile" className="btn head-btn1">
                                                Profile
                                            </NavLink>
                                            <a className="btn head-btn1" onClick={onLogout}>
                                                Logout
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="mobile_menu d-block d-lg-none"></div>
                        </div>
                    </div>
                </div>
            </div>
      
    </header >
  );
};

export default AppHeader;