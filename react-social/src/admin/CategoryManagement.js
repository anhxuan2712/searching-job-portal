import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import Nav from './Nav';
import SidebarNav from './SidebarNav';
import { deleteAdvertisement, getAdvertisement, getCategory } from '../util/APIUtils';
import Alert from 'react-s-alert'


class CatgoryManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAdvertisment: [],
            keyword: '',
        }

        this.loadAdvertisement = this.loadAdvertisement.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    loadAdvertisement() {
        getCategory(1, 1000)
            .then(response => {
                console.log("Response:", response)
                this.setState({
                    listAdvertisment: response.content,
                });
            }).catch(error => {
                this.setState({
                    loading: false
                });
            });
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue,
        });
    }


    handleEditAdvertisement = (id) => {
        this.props.history.push("/admin/category/" + id);
    }

    componentDidMount() {
        this.loadAdvertisement();

    }

    render() {
        if (!this.props.authenticated || this.props.roleName !== "ROLE_ADMIN") {
            return <Redirect
                to={{
                    pathname: "/login-admin",
                    state: { from: this.props.location }
                }} />;
        }
        let list = this.state.listAdvertisment;
        list.map(job => console.log(job))

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
                    <Nav onLogout={this.props.onLogout} />

                    <main className="content">
                        <div className="container-fluid p-0">
                            <h1 className="h3 mb-3"><strong>Dashboard</strong></h1>

                        </div>

                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title">Quản lý danh mục</h5>
                            </div>

                            <table class="table">
                                <thead>
                                    <tr>
                                        <th style={{ width: "90%" }}>Tên danh mục</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.map(adv => {
                                        return (
                                            <tr>
                                                <td>{adv.name}</td>
                                                <td class="table-action" style={{textAlign :"center"}}>
                                                    <a href="#" onClick={() => this.handleEditAdvertisement(adv.id)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>
                                                   </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}

export default CatgoryManagement;