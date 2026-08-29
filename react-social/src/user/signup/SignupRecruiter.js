import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { signup } from '../../util/APIUtils';
import Alert from 'react-s-alert';

class SignupRecruiter extends React.Component {
    render() {
        if (this.props.authenticated) {
            return <Redirect
                to={{
                    pathname: "/",
                    state: { from: this.props.location }
                }} />;
        }

        return (
            <div className="signup-container">
                <div className="signup-content">
                    <h1 className="signup-title">Đăng ký Nhà Tuyển Dụng</h1>
                    <div className="or-separator">
                        <span>Tài khoản*</span>
                    </div>
                    <SignupForm {...this.props} />


                    <span className="login-link">Bạn đã có tài khoản? <Link to="/login-recruiter">Đăng nhập!</Link></span>
                </div>
            </div>
        );
    }
}


class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: "ROLE_RECRUITER",
            recruiter_info: {
                gender: '',
                companyName: '',
                workplace: '',
                address: '',
                skypeAccount: '',
                phone: ''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        const field = name.split('.');
        if (field.length === 1) {
            this.setState({ [name]: value });
        } else {
            const info = { ...this.state[field[0]], [field[1]]: value };
            this.setState({ [field[0]]: info });
        }
    
    }


    handleSubmit(event) {
        event.preventDefault();

        if (this.state.password !== this.state.confirmPassword) {
            Alert.error('Mật khẩu không trùng vui lòng nhập lại!!');
        }

        const signUpRequest = Object.assign({}, this.state);

        signup(signUpRequest)
            .then(response => {
                Alert.success("You're successfully registered. Please login to continue!");
                this.props.history.push("/login-recruiter");
            }).catch(error => {
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
    }

    render() {
        const { name, email, password, confirmPassword, role, recruiter_info } = this.state;
        const { gender, companyName, workplace, address, skypeAccount, phone } = recruiter_info;


        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <input type="email" name="email"
                        className="form-control" placeholder="Email"
                        value={email} onChange={this.handleInputChange} required />
                </div>
                <div className="form-item">
                    <input type="password" name="password"
                        className="form-control" placeholder="Mật Khẩu"
                        value={password} onChange={this.handleInputChange} required />
                </div>
                <div className="form-item">
                    <input type="password" name="confirmPassword"
                        className="form-control" placeholder="Nhật lại mật khẩu"
                        value={confirmPassword} onChange={this.handleInputChange} required />
                </div>
                <div className="or-separator">
                    <span>Thông tin Nhà tuyển dụng*</span>
                </div>
                <div className="form-item">
                    <input type="text" name="name"
                        className="form-control" placeholder="Họ và Tên"
                        value={name} onChange={this.handleInputChange} required />
                </div>

                <label>
                    Giới tính:&nbsp;&nbsp;&nbsp;&nbsp;
                </label>

                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="recruiter_info.gender" value="0" checked={gender === "0"} onChange={this.handleInputChange} />
                    <label class="form-check-label" for="flexRadioDefault1"> Nam </label>
                </div>

                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="recruiter_info.gender" value="1" checked={gender === "1"} onChange={this.handleInputChange} />
                    <label class="form-check-label" for="flexRadioDefault2"> Nữ </label>
                </div>

                <div className="form-item">
                    <input type="text" name="recruiter_info.phone"
                        className="form-control" placeholder="Số Điện Thoại"
                        value={phone} onChange={this.handleInputChange} required />
                </div>
                <div className="form-item">
                    <input type="text" name="recruiter_info.companyName"
                        className="form-control" placeholder="Tên Công Ty"
                        value={companyName} onChange={this.handleInputChange} required />
                </div>
                <div className="form-item">
                    <input type="text" name="recruiter_info.workplace"
                        className="form-control" placeholder="Vị trí"
                        value={workplace} onChange={this.handleInputChange} required />
                </div>
                <div className="form-item">
                    <input type="text" name="recruiter_info.address"
                        className="form-control" placeholder="Địa Chỉ"
                        value={address} onChange={this.handleInputChange} required />
                </div>
                <div className="form-item">
                    <input type="text" name="recruiter_info.skypeAccount"
                        className="form-control" placeholder="Tài khoản Skype"
                        value={skypeAccount} onChange={this.handleInputChange} required />
                </div>

                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary" >Đăng kí</button>
                </div>
            </form>

        );
    }
}

export default SignupRecruiter;