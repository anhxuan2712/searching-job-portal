import React from "react";
import Nav from './Nav';
import { Redirect } from 'react-router-dom'
import SidebarNav from './SidebarNav';
import { sendMailForJobseeker } from "../util/APIUtils";
import Alert from 'react-s-alert'

class SendMail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            toEmail: '',
            description:'',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        console.log(props);
    }
    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });        
    }

    handleSubmit(event) {
        event.preventDefault();
        const request = Object.assign({}, this.state);

        sendMailForJobseeker(this.props.match.params.id,request)
        .then(response => {
            console.log(response)
        }).catch(
            Alert.success("Email đã gửi tới ứng viên")
        )
        
    }

    render(){
        if (!this.props.authenticated || this.props.roleName !== "ROLE_RECRUITER") {
			return <Redirect
				to={{
					pathname: "/login-recruiter",
					state: { from: this.props.location }
				}} />;
		}
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
                <Nav onLogout={this.props.onLogout} />

                <main className="content">
                    <div className="container-fluid p-0">
                        <h1 className="h3 mb-3"><strong>Dashboard</strong></h1>

                    </div>
                    <div class="card">
                            <div class="card-header">
                                <h5 class="card-title">Gửi mail cho ứng viên</h5>

                            </div>
                            <div class="card-body">
                                <form onSubmit={this.handleSubmit}>
                                <div class="mb-3">
                                        <label class="form-label">Email người nhận</label>
                                        <input type="email" class="form-control" name='toEmail' 
                                        value={this.state.toEmail} onChange={this.handleInputChange}/>
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label">Tiêu đề mail</label>
                                        <input type="text" class="form-control" name='title' 
                                        value={this.state.title} onChange={this.handleInputChange}/>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Lời nhắn</label>
                                        <textarea class="form-control" placeholder="Mô tả" rows="1" style={{height: "365px"}} name='description'
                                        value={this.state.description} onChange={this.handleInputChange}></textarea>
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

export default SendMail;