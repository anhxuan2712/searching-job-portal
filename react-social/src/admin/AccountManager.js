import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Nav from './Nav';
import SidebarNav from './SidebarNav';
import { getAllAccount, lockedAccount } from '../util/APIUtils';
import Alert from 'react-s-alert';
import Pagination from './Pagination';

const AccountManager = (props) => {
    const [listAccount, setListAccount] = useState([]);
    const [numberOfElements, setNumberOfElements] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        loadAccount();
    }, [currentPage]);

    const loadAccount = () => {
        getAllAccount(currentPage, itemsPerPage)
            .then(response => {
                console.log("Response:", response)
                setNumberOfElements(response.totalElements);
                setListAccount(response.content);
            }).catch(error => {
                // Handle error
            });
    };

    const handleDisableAccount = (id) => {
        lockedAccount(id)
            .then(response => {
                console.log(response);
            }).catch(error => {
                // Handle error
                Alert.success("Cập nhật khóa thành công!!!");
                loadAccount()
            });
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (!props.authenticated || props.roleName !== "ROLE_ADMIN") {
        return (
            <Redirect
                to={{
                    pathname: "/login-admin",
                    state: { from: props.location }
                }}
            />
        );
    }

    console.log("DATA:", listAccount);

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
                <Nav onLogout={props.onLogout} />

                <main className="content">
                    <div className="container-fluid p-0">
                        <h1 className="h3 mb-3"><strong>Dashboard</strong></h1>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Quản lý tài khoản </h5>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th style={{ width: "40%" }}>Tên Tài Khoản</th>
                                    <th style={{ width: "25%" }}>Email</th>
                                    <th className="d-none d-md-table-cell" style={{ width: "25%" }}>Số điện thoại</th>
                                    <th style={{ width: "25%" }}>Khóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listAccount.map(account => (
                                    <tr key={account.id}>
                                        <td>{account.name}</td>
                                        <td>{account.email}</td>
                                        <td className="d-none d-md-table-cell">
                                            {account.recruiter && account.recruiter.phone ? account.recruiter.phone : account.jobseeker.phone}
                                        </td>
                                        <td>
                                            {account.isLocked === false ? (
                                                <button
                                                    type="button"
                                                    onClick={() => handleDisableAccount(account.id)}
                                                    className="btn btn-success"
                                                >
                                                    Khóa
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => handleDisableAccount(account.id)}
                                                    className="btn btn-primary"
                                                >
                                                    Mở
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={numberOfElements}
                            currentPage={currentPage}
                            paginate={paginate}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AccountManager;