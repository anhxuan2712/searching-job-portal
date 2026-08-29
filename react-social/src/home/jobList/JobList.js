import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import { getAllJobs, getCategory } from '../../util/APIUtils';
import Pagination from '../Pagination';

function JobList() {
    const [listJob, setListJob] = useState([]);
    const [jobName, setJobName] = useState('');
    const [level, setLevel] = useState('');
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [numberOfElements, setNumberOfElements] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [listAdvertisment, setListAdvertisment] = useState([]);

    useEffect(() => {
        getCategory(1, 1000)
            .then((response) => {
                console.log('Response:', response);
                setListAdvertisment(response.content);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])
    
    useEffect(() => {
        loadJob();
    }, [currentPage, level, minSalary, maxSalary, jobName, companyName, categoryId]);



    const handleInputChange = (event) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        switch (inputName) {
            case 'jobName':
                setJobName(inputValue);
                break;
            case 'level':
                setLevel(inputValue);
                break;
            case 'minSalary':
                setMinSalary(inputValue);
                break;
            case 'maxSalary':
                setMaxSalary(inputValue);
                break;
            case 'categoryId':
                setCategoryId(inputValue);
                break;
            case 'companyName':
                setCompanyName(inputValue);
                break;
            default:
                break;
        }
    };

    const loadJob = () => {
        getAllJobs(
            currentPage,
            itemsPerPage,
            level,
            minSalary,
            maxSalary,
            jobName,
            companyName,
            categoryId
        )
            .then((response) => {
                console.log('Response:', response);
                setListJob(response.content);
                setNumberOfElements(response.totalElements);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };



    return (
        <main>
            <div class="slider-area ">
                <div
                    class="single-slider section-overly slider-height2 d-flex align-items-center"
                    data-background="assets/img/hero/about.jpg"
                >
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="hero-cap text-center">
                                    <h2>Nhận công việc của bạn ❤</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="job-listing-area pt-120 pb-120">
                <div class="container">
                    {/* Filter */}
                    <div class="row">
                        <div class="col-xl-3 col-lg-3 col-md-4">
                            <div class="row">
                                <div class="col-12">
                                    <div class="small-section-tittle2 mb-45">
                                        <div class="ion"></div>
                                        <h4>Lọc công việc</h4>
                                    </div>
                                </div>
                            </div>

                            <div class="job-category-listing mb-50">
                                <div class="single-listing">
                                    <div class="small-section-tittle2">
                                        <h4>Tên công việc</h4>
                                    </div>
                                    <div class="select-job-items2">
                                        <input
                                            type="text"
                                            class="js-input-from"
                                            name="jobName"
                                            value={jobName}
                                            onChange={handleInputChange}
                                            readonly
                                        />
                                    </div>
                                </div>
                                <br></br>
                                <br></br>
                                <div class="single-listing">
                                    <div class="small-section-tittle2">
                                        <h4>Danh Mục</h4>
                                    </div>
                                    <div class="select-job-items2">
                                        <select
                                            className="form-select"
                                            id="inputCity"
                                            name="categoryId"
                                            value={categoryId}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">-- Chọn danh mục --</option>
                                            {/* Map over the category data and render options */}
                                            {listAdvertisment.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <br></br>
                                <br></br>
                                <div class="single-listing">
                                    <div class="small-section-tittle2">
                                        <h4>Level</h4>
                                    </div>
                                    <div class="select-job-items2">
                                        <input type="text" class="js-input-from" name='level' value={level} onChange={handleInputChange} readonly />
                                    </div>
                                </div>
                                <br></br>
                                <br></br>
                                <div class="single-listing">
                                    <div class="small-section-tittle2">
                                        <h4>Lương nhỏ nhất</h4>
                                    </div>
                                    <div class="select-job-items2">
                                        <input type="text" class="js-input-from" name='minSalary' value={minSalary} onChange={handleInputChange} readonly />
                                    </div>
                                </div>
                                <br></br>
                                <br></br>
                                <div class="single-listing">
                                    <div class="small-section-tittle2">
                                        <h4>Lương cao nhất</h4>
                                    </div>
                                    <div class="select-job-items2">
                                        <input type="text" class="js-input-from" name='maxSalary' value={maxSalary} onChange={handleInputChange} readonly />
                                    </div>
                                </div>
                                <br></br>
                                <br></br>
                                <div class="single-listing">
                                    <div class="small-section-tittle2">
                                        <h4>Tên Công Ty</h4>
                                    </div>
                                    <div class="select-job-items2">
                                        <input type="text" class="js-input-from" name='companyName' value={companyName} onChange={handleInputChange} readonly />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="col-xl-9 col-lg-9 col-md-8">

                            <section class="featured-job-area">
                                <div class="container">

                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="count-job mb-35">
                                                <span>{numberOfElements} công việc</span>
                                            </div>
                                        </div>
                                    </div>
                                    {listJob.map(job => {
                                        if (job.status === "ENABLE") {
                                            return (
                                                <div class="single-job-items mb-30">

                                                    <div class="job-items">
                                                        <div class="company-img">
                                                            {/* <Link to="/job-detail"><img src="assets/img/icon/job-list1.png" alt="" /></Link> */}
                                                        </div>
                                                        <div class="job-tittle job-tittle2">

                                                            <Link to={`/job-detail/${job.id}`}><h4>{job.jobTitle}</h4></Link>

                                                            <ul>
                                                                <li>{job.recruiter.company.name}</li>
                                                                <li><i class="fas fa-map-marker-alt"></i>{job.address}</li>
                                                                <li>{job.minSalary}$ - {job.maxSalary}$</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="items-link items-link2 f-right">
                                                        <Link to={`/job-detail/${job.id}`}>{job.level}</Link>
                                                        <span>{"Hạn: " + new Date(job.deadline).getDay() + " - " + new Date(job.deadline).getMonth() + " - " + new Date(job.deadline).getFullYear()}</span>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            </section>

                        </div>
                    </div>
                </div>
            </div>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={numberOfElements}
                currentPage={currentPage}
                paginate={paginate}
            />
            <Footer />
        </main>
    )
}

export default JobList;