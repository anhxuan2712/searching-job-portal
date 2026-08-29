import React from "react";
import { Link, Redirect } from 'react-router-dom'
import Nav from "../Nav";
import SidebarNav from "../SidebarNav";
import FileService from "../../user/service/FileService";
import Alert from "react-s-alert";
import { getAdvertisementById } from "../../util/APIUtils";

class EditAdvertisement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            image: '',
            description: '',




        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getAdvertisementId = this.getAdvertisementId.bind(this);

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


    getAdvertisementId() {
        getAdvertisementById(this.props.match.params.id).then(response => {
            this.setState({
                title: response.title,
                image: response.image,
                description: response.description,
            })
        })
    }


    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', this.state.title)
        if (this.state.image) {
            for (const key of Object.keys(this.state.image)) {
                formData.append('image', this.state.image[key]);
            }
        }
        formData.append('description', this.state.description)
        FileService.updateImageOfAdvertisement(this.props.match.params.id, formData).then((response) => {
            console.log(response.data);
            Alert.success("Cập nhật quảng cáo thành công!!");
            this.props.history.push("/admin/advertisement-manager");
        }).catch(error => {
            console.log(error);
        });

    }

    componentDidMount() {
        this.getAdvertisementId()
    }
    render() {

        if (!this.props.authenticated || this.props.roleName !== "ROLE_ADMIN") {
            return <Redirect
                to={{
                    pathname: "/login-admin",
                    state: { from: this.props.location }
                }} />;
        }

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
                                <h5 class="card-title">Sửa Quảng Cáo</h5>

                            </div>
                            <div class="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div class="mb-3">
                                        <label class="form-label">Tên Quảng Cáo</label>
                                        <input type="text" class="form-control" placeholder="Tên quảng cáo" name='title'
                                            value={this.state.title} onChange={this.handleInputChange} />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Mô Tả</label>
                                        <textarea class="form-control" placeholder="Mô tả" rows="1" style={{ height: "65px" }} name='description'
                                            value={this.state.description} onChange={this.handleInputChange}></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Tải Hình Ảnh</label>
                                        <input class="form-control" type="file" onChange={this.handleInputChange} />
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

export default EditAdvertisement;