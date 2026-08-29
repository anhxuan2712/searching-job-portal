import React from "react";
import { changeStatusById, deleteCVByID, getAllCV } from "../../util/APIUtils";
import SidebarNav from './SidebarNav';
import Alert from 'react-s-alert';
import { Redirect } from "react-router-dom";
import Footer from "../../home/Footer";

class ManagerCV extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listCV:[],
            clicked: false,
        }

        this.loadCvOfJobseeker = this.loadCvOfJobseeker.bind(this);
    }

    loadCvOfJobseeker() {
        getAllCV()
            .then(response => {
                console.log("Response:", response.content)
                this.setState({
                    listCV: response.content,
                });
            }).catch(error => {
                this.setState({
                    loading: false
                });
            });
    }

    handleDelete = (id) =>
    {
        this.setState({ clicked: true });
        deleteCVByID(id).then(response => {
           
        }).catch(data => {
            Alert.success("Xóa CV thành công!!!!") 
        });

        
    }

    handleChangeStatus = (id) => {
        this.setState({ clicked: true });
        changeStatusById(id).then(response => {
           
        }).catch(data => {
            Alert.success("Đặt cv là cv chính!!") 
        });
    }

    componentDidUpdate() {
        if (this.state.clicked === true) {
          this.loadCvOfJobseeker();
        }
      }


    componentDidMount() {
        this.loadCvOfJobseeker();

    }

    render() {
        if (!this.props.authenticated || this.props.roleName !== "ROLE_JOBSEEKER") {
            return <Redirect
                to={{
                    pathname: "/login",
                    state: { from: this.props.location }
                }} />;
        }
        let list = this.state.listCV;

        return (
            <div className="wrapper">
                <nav id="sidebar" className="sidebar js-sidebar">
                    <div className="sidebar-content js-simplebar">
                        <a className="sidebar-brand" href="index.html">
                            <span className="align-middle">Ứng Viên</span>
                        </a>
                        <SidebarNav />
                    </div>
                </nav>

                <div className="main">

                    <main className="content">
                        <div className="container-fluid p-0">
                            <h1 className="h3 mb-3"><strong>Dashboard</strong></h1>
                        </div>

                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title">Quản lý CV</h5>
                            </div>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th style={{ width: "40%" }}>Tên CV</th>
                                        <th style={{ width: "25%" }}></th>
                                        <th style={{ width: "25%" }}>Thay đổi</th>
                                        <th style={{ width: "25%" }}>Action</th>
                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.map(adv => {
                                        return (
                                            <tr>
                                                <td>{adv.name}</td>
                                                <td><button type="button" class="btn btn-success">
                                                <a href={`http://localhost:8080/document/`+adv.fileCV.replace('photographer/files/','')} target="_blank">Xem</a>    
                                                </button></td>
                                                <td><button type="button" onClick={() => this.handleChangeStatus(adv.id)} class="btn btn-success">
                                                {adv.status === true ? "CV chính" : "CV phụ"}   
                                                </button></td>
                                                <td class="table-action">
                                                &nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={() => this.handleDelete(adv.id)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>
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

export default ManagerCV;