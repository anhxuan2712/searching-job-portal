import React from "react";
import Nav from './Nav';
import { Redirect } from 'react-router-dom'
import SidebarNav from './SidebarNav';
import { deleteByID, getAllRecruitmentOfRecruiter } from "../util/APIUtils";
import Alert from "react-s-alert";

class Recruitment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listRecruitment: [],
			clicked: false,
		}

		this.loadAdvertisement = this.loadAdvertisement.bind(this);
	}

	loadAdvertisement() {
		getAllRecruitmentOfRecruiter()
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

	handleDelete = (id) => {
		deleteByID(id);
		Alert.success("Xóa thành công!!!!")
		this.setState({ clicked: true });
	}

	handleSendEmail = (id) => {
		this.props.history.push("/recruitment/send-email/"+id);
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
		if (!this.props.authenticated || this.props.roleName !== "ROLE_RECRUITER") {
			return <Redirect
				to={{
					pathname: "/login-recruiter",
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
							<span className="align-middle">Nhà Tuyển Dụng</span>
						</a>
						<SidebarNav />
					</div>
				</nav>

				<div className="main">
					<Nav onLogout={this.props.onLogout} username={this.props.username}/>

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
										<th style={{ width: "30%" }}>Tên Công Việc</th>
										<th style={{ width: "15%" }}>Level</th>
										<th style={{ width: "15%" }}>Email</th>
										<th style={{ width: "15%" }}>Tên Ứng Viên</th>
										<th style={{ width: "15%" }}>Xem CV</th>
										<th style={{ width: "15%" }}>Trạng Thái</th>
										<th style={{ width: "15%" }}>Actions</th>
									</tr>
								</thead>
								<tbody>
									{list.map(adv => {
										return (
											<tr>
												<td>{adv.job.jobTitle}</td>
												<td>{adv.job.level}</td>
												<td>{adv.jobseeker.user.email}</td>
												<td>{adv.jobseeker.user.name}</td>
												<td><button type="button" class="btn btn-success">
                                                <a  href={adv.cv === null ? "" : `http://localhost:8080/document/`+adv.cv.replace('photographer/files/','')} target="_blank">Xem</a>    
                                                </button></td>
												<td style={{ color : "green" }}>{adv.isAnswer === true ? "Đã Liên Hệ" : "Chưa Liên Hệ"}</td>
												<td class="table-action">
													&nbsp;<a href="#" onClick={() => this.handleSendEmail(adv.id)}><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" /></svg></a>
													&nbsp;<a href="#" onClick={() => this.handleDelete(adv.id)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>
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

export default Recruitment;