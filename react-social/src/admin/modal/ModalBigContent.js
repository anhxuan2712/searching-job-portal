import React, { useEffect, useState } from "react";
import { getJobById } from "../../util/APIUtils";

const ModalBigContent = (props) => {
  const [jobDetail, setJobDetail] = useState('');

  useEffect(() => {
    loadJobDetails();
  }, [props.jobId]);

  const loadJobDetails = () => {
    getJobById(props.jobId)
      .then(response => {
        console.log("Response:", response)
        setJobDetail(response);
      }).catch(error => {
        // Handle error
      });
  }

  const list = jobDetail;

  return (
    <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="row justify-content-between">
            <div className="col-xl-7 col-lg-8">
              <div className="single-job-items mb-50">
                <div className="job-items">
                  <div className="company-img company-img-details">
                    <a href="#"><img src="../../../public/assets/img/icon/job-list3.png" alt="" /></a>
                  </div>
                  <div className="job-tittle">
                    <a href="#">
                      <h4>{list.jobTitle}</h4>
                    </a>
                    <ul>
                      <li><i className="fas fa-map-marker-alt"></i>{list.address}</li>
                      <li>{list.minSalary}$ - {list.maxSalary}$</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="job-post-details">
                <div className="post-details1 mb-50">
                  <div className="small-section-tittle">
                    <h4>Mô Tả Công Việc:</h4>
                  </div>
                  <p>{list.description}</p>
                </div>
                <div className="post-details2  mb-50">
                  <div className="small-section-tittle">
                    <h4>Yêu Cầu:</h4>
                  </div>
                  <ul>
                    <li>{list.requireJob}</li>
                  </ul>
                </div>
                <div className="post-details2  mb-50">
                  <div className="small-section-tittle">
                    <h4>Phúc Lợi:</h4>
                  </div>
                  <ul>
                    <li>{list.welfare}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4">
              <div className="post-details3  mb-50">
                <div className="small-section-tittle">
                  <h4>Công việc:</h4>
                </div>
                <ul>
                  <li>Địa chỉ : <span>{list.address}</span></li>
                  <li>Level : <span>{list.level}</span></li>
                  <li>Lương :  <span>{list.maxSalary}$</span></li>
                  <li>Hạn ứng tuyển : <span>{new Date(list.deadline).getDay() + " - " + new Date(list.deadline).getMonth() + " - " + new Date(list.deadline).getFullYear()}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalBigContent;