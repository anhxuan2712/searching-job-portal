import React from "react";
import SidebarNav from './SidebarNav';
import Footer from '../../home/Footer';
import FileService from '../service/FileService';
import Alert from 'react-s-alert';
import { Redirect } from "react-router-dom";

class AddCv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            files: null,




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
        });
    }


    onFileChange = (event) => {
        this.setState({
            files: event.target.files
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', this.state.name)
        

        if (this.state.files) {
            for (const key of Object.keys(this.state.files)) {
                formData.append('cv', this.state.files[key]);
                checkFileSize(this.state.files[key])
            }
        } else {
            Alert.error("Vui lòng upload file cv");
        }



        FileService.uploadImage(formData)
        .then((response) => {
            console.log(response.data);
                Alert.success('Thêm CV mới thành công');
            this.setState({
                name: '',
                files: null,
            })
        }).catch(error => {
            console.log(error && error.message);
        });
    }

    render() {
        if (!this.props.authenticated) {
            return <Redirect
                to={{
                    pathname: "/login",
                    state: { from: this.props.location }
                }} />;
        }
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
                            <div class="card">
                                <div class="card-header">
                                    <h5 class="card-title">Thêm Quảng Cáo</h5>

                                </div>
                                <div class="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <div class="mb-3">
                                            <label class="form-label">Tên CV</label>
                                            <input type="text" class="form-control" name='name'
                                                value={this.state.name} onChange={this.handleInputChange} />
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
        )
    }

}

function checkFileSize(file) {
    const fileSizeInMB = file.size / (1024 * 1024); // Convert file size to MB
    const maxSizeInMB = 1; // Maximum allowed file size in MB
  
    if (fileSizeInMB > maxSizeInMB) {
        Alert.error('Dung lượng của file quá 1MB. Mong người dùng kiểm tra lại');
    }
  
    return "File size is within the allowed limit.";
  }

export default AddCv;