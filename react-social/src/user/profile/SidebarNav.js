import React from "react";
import { Link, NavLink } from 'react-router-dom';

class SidebarNav extends React.Component {
    render() {
        return (
            <ul className="sidebar-nav">
                <li className="sidebar-header">
                    Quản lí
                </li>

                <li className="sidebar-item">
                    <NavLink to="/profile" className="sidebar-link">
                        <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Thông tin cá nhân</span>
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink to="/add-cv" className="sidebar-link">
                        <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Thêm CV</span>
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink to="/cv-manager" className="sidebar-link">
                        <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Quản lý CV</span>
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink to="/recruiment-manager" className="sidebar-link">
                        <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Quản lý đơn ứng tuyển</span>
                    </NavLink>
                </li>
            </ul>
        )
    }
}
export default SidebarNav;