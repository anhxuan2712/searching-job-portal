import React from "react";
import SidebarNav from "./SidebarNav";
import Nav from "./Nav";
import Alert from 'react-s-alert'
import { editInfo, editInfoRecruiter, getRecruiter } from "../util/APIUtils";
import FileService from "../user/service/FileService";


class ProfileRecruiter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recruiterAddress: "",
            recruiterPhone: "",
            skypeAccount: "",
            workplace: "",
            companyAddress: "",
            companyPhone: "",
            companyName: "",
            description: null,
            image: "",
            files: "",
            personalSize: null,
            website: "",
            currentUser: {
                name: "",
                email: ""

            }


        }
        this.loadUser = this.loadUser.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        console.log(props);
    }

    loadUser() {
        getRecruiter()
            .then(response => {
                console.log("Response:", response)
                this.setState({
                    recruiterAddress: response.address,
                    recruiterPhone: response.phone,
                    skypeAccount: response.skypeAccount,
                    workplace: response.workplace,
                    companyAddress: response.company.address,
                    companyName: response.company.name,
                    description: response.company.description,
                    image: response.company.image,
                    personalSize: response.company.personalSize,
                    website: response.company.website,
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

        if (!this.validatePhone(this.state.recruiterPhone)) {
            Alert.success("Số điện thoại không hợp lệ")
        } else {
            const formData = new FormData();
            formData.append('recruiterAddress', this.state.recruiterAddress);
            formData.append('recruiterPhone', this.state.recruiterPhone);
            formData.append('workplace', this.state.workplace);
            formData.append('skypeAccount', this.state.skypeAccount);
            formData.append('companyName', this.state.companyName);
            formData.append('companyAddress', this.state.companyAddress);
            formData.append('description', this.state.description);
            formData.append('website', this.state.website);
            formData.append('personalSize', this.state.personalSize);

            if (this.state.files && Object.keys(this.state.files).length > 0) {
                for (const key of Object.keys(this.state.files)) {
                    formData.append('image', this.state.files[key]);
                }
            }

            FileService.editInfoRecruiter(formData)
                .then(response => {
                    Alert.success("Cập nhật thông tin thành công!!");
                    this.loadUser();
                }).catch(error => {
                    Alert.error("Có lỗi xảy ra khi cập nhật thông tin!");
                });
        }
    }


    componentDidMount() {
        this.loadUser();

    }

    render() {
        ``
        console.log("PROFILE", this.state)
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
                    <Nav />

                    <main className="content">
                        <div className="container-fluid p-0">
                            <h1 className="h3 mb-3"><strong>Thông tin cá nhân</strong></h1>

                            <div className="profile-info">
                                <div className="profile-avatar">
                                </div>
                                <div className="profile-name">
                                    <h2>{this.props.currentUser.name ? this.props.currentUser.name : ""}</h2>
                                    <p className="profile-email">{this.props.currentUser.email ? this.props.currentUser.email : ""}</p>
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
                                                <label class="form-label">Số điện thoại</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name='recruiterPhone' 
                                                    value={this.state.recruiterPhone} 
                                                    onChange={this.handleInputChange} 
                                                    id="inputPhone" 
                                                    placeholder="Số điện thoại" 
                                                />
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="inputAddress">Họ và Tên</label>
                                            <input type="text" className="form-control" name='name' value={this.props.currentUser.name} id="inputAddress" placeholder="Peter Parker" disabled />
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="inputAddress">Địa Chỉ</label>
                                            <input type="text" className="form-control" name='recruiterAddress' value={this.state.recruiterAddress} onChange={this.handleInputChange} placeholder="Địa Chỉ" required />
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="inputAddress">Vị Trí</label>
                                            <input type="text" className="form-control" name='workplace' value={this.state.workplace} onChange={this.handleInputChange} placeholder="Vị trí" required />
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="inputAddress">Tài khoản Skype</label>
                                            <input type="text" className="form-control" name='skypeAccount' value={this.state.skypeAccount} onChange={this.handleInputChange} placeholder="Ace" required />
                                        </div>
                                        <div className="or-separator">
                                            <span>Thông tin Công ty*</span>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="inputAddress">Tên công ty</label>
                                            <input type="text" className="form-control" name='companyName' value={this.state.companyName} onChange={this.handleInputChange} placeholder="Tên công ty" required />
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="inputAddress">Địa chỉ</label>
                                            <input type="text" className="form-control" name='companyAddress' value={this.state.companyAddress} onChange={this.handleInputChange} placeholder="Địa chỉ công ty" required />
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="inputAddress">Mô Tả</label>
                                            <input type="text" className="form-control" name='description' value={this.state.description} onChange={this.handleInputChange} placeholder="Mô tả" required />
                                        </div>
                                        <div class="mb-3">

                                            <label class="form-label">Tải Logo</label>
                                            <br /><br />
                                            {/* <img
                                                src={this.state.imageUrl
                                                    ?
                                                    this.state.imageUrl
                                                    :
                                                    `http://localhost:8080/image/` + this.state.imageUrl.replace(`photographer/files/`, '')
                                                }
                                                alt="Logo" style={{ height: "100px", width: "100px", marginBottom: "5px" }} /> */}
                                            <br />
                                            <input class="form-control" type="file" onChange={this.onFileChange} />
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="inputAddress">Website</label>
                                            <input type="text" className="form-control" name='website' value={this.state.website} onChange={this.handleInputChange} placeholder="Website" required />
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="inputAddress">Số lượng người</label>
                                            <input type="text" className="form-control" name='personalSize' value={this.state.personalSize} onChange={this.handleInputChange} placeholder="19, 20" required />
                                        </div>
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </main>
                </div>
            </div>

        );
    }
}

export default ProfileRecruiter