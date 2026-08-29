import React  from "react";
import Nav from '../Nav';
import { Link, Redirect } from 'react-router-dom'
import SidebarNav from '../SidebarNav';
import Alert from "react-s-alert";
import { editInfo, editJobInfo, getJobOfRecruiterById } from "../../util/APIUtils";


class EditJob extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          jobTitle: "",
          level: "",
          typesOfCV: "",
          address: "",
          minSalary: null,
          maxSalary: null,
          description: "",
          requireJob: "",
          welfare: "",
          language: "",
          deadline: ""
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadJobById = this.loadJobById.bind(this);
      }

      handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;
    
        this.setState({
            [inputName] : inputValue
        });        
    }
    
    loadJobById(){
            getJobOfRecruiterById(this.props.match.params.id)
            .then(response => {
                console.log("Response:", response)
                this.setState({
                    jobTitle: response.jobTitle,
                    level: response.level,
                    typesOfCV: response.typesOfCV,
                    address: response.address,
                    minSalary: response.minSalary,
                    maxSalary: response.maxSalary,
                    description: response.description,
                    requireJob: response.requireJob,
                    welfare: response.welfare,
                    language: response.language,
                    deadline: response.deadline
                });
            }).catch(error => {
                this.setState({
                    loading: false
                });
            });
    }


    handleSubmit(event) {
        event.preventDefault();
        const jobRequest = Object.assign({}, this.state);
    
        editJobInfo(this.props.match.params.id,jobRequest)
        .then(response => {
        }).catch(
            Alert.success("Cập nhật thông tin thành công!!")
        );

    }

    componentDidMount(){
      this.loadJobById()
    }
    
    render() {
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
          <Nav onLogout={this.props.onLogout} username={this.props.username}/>

          <main className="content">
            <div className="container-fluid p-0">
              <h1 className="h3 mb-3"><strong>Dashboard</strong></h1>
              <div class="card">
                <div class="card-header">
                  <h5 class="card-title">Thêm công việc</h5>
                </div>
                <div class="card-body">
                  <form onSubmit={this.handleSubmit}>
                    <div class="row">
                      <div class="mb-3 col-md-6">
                        <label class="form-label" for="inputEmail4">Tên Công Việc</label>
                        <input type="text" class="form-control" id="inputEmail4" name='jobTitle' value={this.state.jobTitle} onChange={this.handleInputChange} />
                      </div>
                      <div class="mb-3 col-md-6">
                        <label class="form-label" for="inputPassword4">Level</label>
                        <input type="text" class="form-control" id="inputPassword4" name='level' value={this.state.level} onChange={this.handleInputChange} />
                      </div>
                    </div>
                    <div class="mb-3">
                      <label class="form-label" for="inputAddress">Loại CV</label>
                      <input type="text" class="form-control" id="inputAddress" name='typesOfCV' value={this.state.typesOfCV} onChange={this.handleInputChange} />
                    </div>
                    <div class="row">
                      <div class="mb-3 col-md-6">
                        <label class="form-label" for="inputEmail4">Địa Chỉ</label>
                        <input type="text" class="form-control" id="inputEmail4" name='address' value={this.state.address} onChange={this.handleInputChange} />
                      </div>

                      <div class="mb-3 col-md-6">
                        <label class="form-label" for="inputEmail4">Ngôn ngữ</label>
                        <input type="text" class="form-control" id="inputEmail4" name='language' value={this.state.language} onChange={this.handleInputChange} />
                      </div>
                      
                      <div class="mb-3 col-md-6">
                        <label class="form-label" for="inputEmail4">Mô tả</label>
                        <input type="text" class="form-control" id="inputEmail4" name='description' value={this.state.description} onChange={this.handleInputChange} />
                      </div>
                    </div>
                    <div class="row">
                      <div class="mb-3 col-md-6">
                        <label class="form-label" for="inputEmail4">Min Lương</label>
                        <input type="text" class="form-control" id="inputEmail4" name='minSalary' value={this.state.minSalary} onChange={this.handleInputChange}/>
                      </div>
                      <div class="mb-3 col-md-6">
                        <label class="form-label" for="inputPassword4">Max Lương</label>
                        <input type="text" class="form-control" id="inputPassword4" name='maxSalary' value={this.state.maxSalary} onChange={this.handleInputChange} />
                      </div>
                    </div>
                    <div class="row">
                      <div class="mb-3 col-md-6">
                        <label class="form-label" for="inputEmail4">Yêu Cầu</label>
                        <input type="text" class="form-control" id="inputEmail4" name='requireJob' value={this.state.requireJob} onChange={this.handleInputChange}/>
                      </div>
                      <div class="mb-3 col-md-6">
                        <label class="form-label" for="inputPassword4">Phúc Lợi</label>
                        <input type="text" class="form-control" id="inputPassword4" name='welfare' value={this.state.welfare} onChange={this.handleInputChange} />
                      </div>
                      <div class="mb-3 col-md-6">
                        <label class="form-label" for="inputPassword4">Thời Hạn</label>
                        <input type="datetime-local" class="form-control" id="inputPassword4" name='deadline' value={this.state.deadline} onChange={this.handleInputChange} />
                      </div>
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

export default EditJob;