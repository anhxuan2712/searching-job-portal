import React, { useState, useEffect } from "react";
import Nav from './Nav';
import { Link, Redirect } from 'react-router-dom'
import SidebarNav from './SidebarNav';
import { addNewJob, getCategory } from "../util/APIUtils";
import Alert from "react-s-alert";

const AddJob = (props) => {
  const [jobTitle, setJobTitle] = useState("");
  const [level, setLevel] = useState("");
  const [typesOfCV, setTypesOfCV] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [minSalary, setMinSalary] = useState(null);
  const [maxSalary, setMaxSalary] = useState(null);
  const [description, setDescription] = useState("");
  const [requireJob, setRequireJob] = useState("");
  const [welfare, setWelfare] = useState("");
  const [language, setLanguage] = useState("");
  const [deadline, setDeadline] = useState("");
  const [listAdvertisment,setListAdvertisment] = useState([]);

  useEffect(() => {
    getCategory(1, 1000)
      .then(response => {
        console.log("Response:", response);
        // Update the state with the fetched category data
        setListAdvertisment(response.content);
      }).catch(error => {
        // Handle error
        console.log(error);
      });
  }, []);

  const handleInputChange = (event) => {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    switch (inputName) {
      case "jobTitle":
        setJobTitle(inputValue);
        break;
      case "level":
        setLevel(inputValue);
        break;
      case "typesOfCV":
        setTypesOfCV(inputValue);
        break;
      case "address":
        setAddress(inputValue);
        break;
      case "category":
        setCategory(inputValue);
        break;
      case "minSalary":
        setMinSalary(inputValue);
        break;
      case "maxSalary":
        setMaxSalary(inputValue);
        break;
      case "description":
        setDescription(inputValue);
        break;
      case "requireJob":
        setRequireJob(inputValue);
        break;
      case "welfare":
        setWelfare(inputValue);
        break;
      case "language":
        setLanguage(inputValue);
        break;
      case "deadline":
        setDeadline(inputValue);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const jobRequest = {
      jobTitle,
      level,
      typesOfCV,
      address,
      category,
      minSalary,
      maxSalary,
      description,
      requireJob,
      welfare,
      language,
      deadline
    };

    addNewJob(jobRequest)
      .then(response => {
        // Handle success
      }).catch(error => {
        Alert.success("Cập nhật thông tin thành công!!");
      });
  };

  if (!props.authenticated || props.roleName !== "ROLE_RECRUITER") {
    return <Redirect
      to={{
        pathname: "/login-recruiter",
        state: { from: props.location }
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
        <Nav onLogout={props.onLogout} username={props.username} />

        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3"><strong>Dashboard</strong></h1>
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Thêm công việc</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="inputEmail4">Tên Công Việc</label>
                      <input type="text" className="form-control" id="inputEmail4" name="jobTitle" value={jobTitle} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="inputPassword4">Level</label>
                      <input type="text" className="form-control" id="inputPassword4" name="level" value={level} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="inputAddress">Loại Hình CV</label>
                      <input type="text" className="form-control" id="inputAddress" name="typesOfCV" value={typesOfCV} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="inputAddress2">Địa Chỉ</label>
                      <input type="text" className="form-control" id="inputAddress2" name="address" value={address} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="inputCity">Danh Mục</label>
                      <select className="form-select" id="inputCity" name="category" value={category} onChange={handleInputChange}>
                        <option value="">-- Chọn danh mục --</option>
                        {/* Map over the category data and render options */}
                        {listAdvertisment.map((category) => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3 col-md-3">
                      <label className="form-label" htmlFor="inputZip">Lương Tối Thiểu</label>
                      <input type="number" className="form-control" id="inputZip" name="minSalary" value={minSalary} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3 col-md-3">
                      <label className="form-label" htmlFor="inputZip">Lương Tối Đa</label>
                      <input type="number" className="form-control" id="inputZip" name="maxSalary" value={maxSalary} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-12">
                      <label className="form-label" htmlFor="inputAddress2">Mô Tả</label>
                      <textarea className="form-control" id="inputAddress2" rows="3" name="description" value={description} onChange={handleInputChange}></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-12">
                      <label className="form-label" htmlFor="inputAddress2">Yêu Cầu Công Việc</label>
                      <textarea className="form-control" id="inputAddress2" rows="3" name="requireJob" value={requireJob} onChange={handleInputChange}></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-12">
                      <label className="form-label" htmlFor="inputAddress2">Phúc Lợi</label>
                      <textarea className="form-control" id="inputAddress2" rows="3" name="welfare" value={welfare} onChange={handleInputChange}></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="inputAddress2">Ngôn Ngữ</label>
                      <input type="text" className="form-control" id="inputAddress2" name="language" value={language} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="inputAddress2">Hạn Nộp</label>
                      <input type="datetime-local" className="form-control" id="inputAddress2" name="deadline" value={deadline} onChange={handleInputChange} />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">Thêm</button>
                  <Link to="/recruiter/manager-job" className="btn btn-secondary ms-2">Hủy</Link>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddJob;