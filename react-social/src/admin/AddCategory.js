import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import Nav from './Nav';
import SidebarNav from './SidebarNav';
import Alert from "react-s-alert";
import { addCategory } from '../util/APIUtils';


class AddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',




        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        console.log(props);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue,
            image: event.target.files,
        });      
    }


    handleSubmit(event) {
        event.preventDefault();

        const categoryRequest = Object.assign({}, this.state);

        addCategory(categoryRequest).then((response) => {
            console.log(response.data);
            Alert.success("Thêm danh mục thành công!!");
            this.setState({
                name: '',
            }) 
        }).catch(error => {
            console.log(error);
        });
        

    }

    render() {
        if (!this.props.authenticated || this.props.roleName !== "ROLE_ADMIN") {
            return <Redirect
                to={{
                    pathname: "/login-admin",
                    state: { from: this.props.location }
                }} />;
        }
        console.log(this.state)
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
                                <h5 class="card-title">Thêm Danh Mục</h5>

                            </div>
                            <div class="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div class="mb-3">
                                        <label class="form-label">Tên Danh Mục</label>
                                        <input type="text" class="form-control" placeholder="Tên danh mục" name='name'
                                            value={this.state.name} onChange={this.handleInputChange} />
                                    </div>

                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        )
    }
}

export default AddCategory;