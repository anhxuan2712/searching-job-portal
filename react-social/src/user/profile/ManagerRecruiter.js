import React from "react";
import SidebarNav from './SidebarNav';
import Alert from 'react-s-alert';
import { Redirect } from "react-router-dom";
import { deleteByID, getAllRecruitment } from "../../util/APIUtils";
import Footer from "../../home/Footer";

class ManagerRecruiter extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            listRecruitment: [],
            clicked: false,
        }

        this.loadAdvertisement = this.loadAdvertisement.bind(this);
    }

    loadAdvertisement() {
        getAllRecruitment()
            .then(response => {
                console.log("Response:", response)
                this.setState({
                    listRecruitment: response.content,
                });
            }).catch(error => {
                this.setState({
                    loading: false
                });
            });
    }

    handleDelete = (id) =>
    {
        deleteByID(id);
        Alert.success("Xóa thành công!!!!") 
        this.setState({ clicked: true });
    }

    componentDidUpdate() {
        if (this.state.clicked) {
          this.loadAdvertisement();
        }
      }


    componentDidMount() {
        this.loadAdvertisement();

    }

    render() {
        if (!this.props.authenticated || this.props.roleName !== "ROLE_JOBSEEKER") {
            return <Redirect
                to={{
                    pathname: "/login",
                    state: { from: this.props.location }
                }} />;
        }
        let list = this.state.listRecruitment;
        list.map(job => console.log(job))

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
                                <h5 class="card-title">Quản lý Đơn Ứng Tuyển</h5>
                            </div>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th style={{ width: "40%" }}>Tên Công Việc</th>
                                        <th style={{ width: "25%" }}>Level</th>
                                        <th class="d-none d-md-table-cell" style={{ width: "25%" }}>Tên Ứng Viên</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.map(adv => {
                                        return (
                                            <tr>
                                                <td>{adv.job.jobTitle}</td>
                                                <td>{adv.job.level}</td>
                                                <td class="d-none d-md-table-cell">{adv.jobseeker.user.name}</td>
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

export default ManagerRecruiter;