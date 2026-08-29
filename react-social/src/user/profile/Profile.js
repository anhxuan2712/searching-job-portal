import React, { Component } from 'react';
import './Profile.css';
import SidebarNav from './SidebarNav';
import Footer from '../../home/Footer';
import { editInfo, getJobseeker } from '../../util/APIUtils';
import Alert from 'react-s-alert';
import FileService from '../service/FileService';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            files: null,



        }
        this.loadUser = this.loadUser.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        console.log(props);
    }

    loadUser() {
        getJobseeker()
            .then(response => {
                console.log("Response:", response)
                this.setState({
                    phone: response.phone,
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
            [inputName]: inputValue
        });
    }


    onFileChange = (event) => {
        this.setState({
            files: event.target.files
        });
    }

    validatePhone(phone) {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    }

    handleSubmit(event) {
        event.preventDefault();


        if (!this.validatePhone(this.state.phone)) {
            Alert.success("Số điện thoại không hợp lệ")
        } else {
            

            const formData = new FormData();
            formData.append('phone', this.state.phone)

            for (const key of Object.keys(this.state.files)) {
                formData.append('file', this.state.files[key]);
            }
            FileService.editJobseekerInfo(formData)
                .then(response => {
                    Alert.success("Cập nhật thông tin thành công!!");
                    this.props.loadCurrentUser();
                }).catch(error => {

                });

        }
    }



    componentDidMount() {
        this.loadUser();

    }

    render() {
        console.log("Phone", this.state.phone)
        return (
            <div className="profile-container">
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
                                <h1 className="h3 mb-3"><strong>Thông tin cá nhân</strong></h1>

                                <div className="profile-info">
                                    <div className="profile-avatar">
                                        {
                                            this.props.currentUser.imageUrl ? (
                                                <img 
                                                src={ this.props.currentUser.imageUrl.indexOf("http") !== -1 ? this.props.currentUser.imageUrl : `http://localhost:8080/image/` + this.props.currentUser.imageUrl.replace('photographer/files/', '')}
                                                alt={this.props.currentUser.name} />
                                            ) : (
                                                <div className="text-avatar">
                                                    <span>{this.props.currentUser.name && this.props.currentUser.name[0]}</span>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="profile-name">
                                        <h2>{this.props.currentUser.name}</h2>
                                        <p className="profile-email">{this.props.currentUser.email}</p>
                                    </div>
                                </div>

                                <div class="card">
                                    <div class="card-body">
                                        <form onSubmit={this.handleSubmit}>
                                            <div class="row">
                                                <div class="mb-3 col-md-6">
                                                    <label class="form-label">Email</label>
                                                    <input type="email" className="form-control" name='email' value={this.props.currentUser.email} id="inputEmail4" placeholder="Email" disabled />
                                                </div>
                                                <div class="mb-3 col-md-6">
                                                    <label class="form-label" >Số điện thoại</label>
                                                    <input type="text" className="form-control" name='phone' value={this.state.phone} onChange={this.handleInputChange} id="inputPassword4" placeholder="Số điện thoại" />
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label" for="inputAddress">Họ và Tên</label>
                                                <input type="text" className="form-control" name='name' value={this.props.currentUser.name} id="inputAddress" placeholder="Peter Parker" disabled />
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Tải Hình Ảnh</label>
                                                <input class="form-control" type="file" onChange={this.onFileChange} />
                                            </div>
                                            <button type="submit" class="btn btn-primary">Submit</button>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </main>
                    </div>
                </div>
                <Footer />
            </div>

        );
    }
}

export default Profile