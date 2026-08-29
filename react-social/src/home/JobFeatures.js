import React from "react";
import { Link, NavLink } from 'react-router-dom';

import { getAllJobs } from '../util/APIUtils';

class JobFeatures extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listJob: [],
        }

        this.loadJob = this.loadJob.bind(this);
    }

    loadJob() {
        getAllJobs(1, 5, '', '', '', '','','')
            .then(response => {
                console.log("Response:", response)
                this.setState({
                    listJob: response.content,
                });
            }).catch(error => {
                this.setState({
                    loading: false
                });
            });
    }


    componentDidMount() {
        this.loadJob();

    }
    render() {
        let list = this.state.listJob;
        list.map(job => console.log(job))
        return (
            <div class="row justify-content-center">
                <div class="col-xl-10">
                    {list.map(job => {
                        if(job.status === "ENABLE") {
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
                                <span>{"Hạn: " + new Date(job.deadline).getDate() + " - " + (new Date(job.deadline).getMonth() + 1) + " - " + new Date(job.deadline).getFullYear()}</span>
                            </div>
                        </div>
                        )
                    }})}
                </div>

            </div>
        )
    }
}

export default JobFeatures;