import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function sendMailOfContact(emailRequest) {
    return request({
        url: API_BASE_URL + "/jobseeker/contact",
        method: 'POST',
        body: JSON.stringify(emailRequest)
    })
}

export function getCurrentRecruiter() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/recruiter/me",
        method: 'GET'
    });
}

export function getCurrentAdmin() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/admin/me",
        method: 'GET'
    });
}

export function addAdvertisement(fromData) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/admin/advertisement",
        method: 'POST',
        body: fromData,
    });
}

export function addCV(fromData) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/jobseeker/add-cv",
        method: 'POST',
        body: fromData,
    });
}

export function getAllCV() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/jobseeker/cv",
        method: 'GET'
    })
}

export function getAllRecruitment() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/recruitment/jobseeker?pageNo=1&pageSize=10",
        method: 'GET'
    })
}

export function getAllRecruitmentOfRecruiter() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/recruitment?pageNo=1&pageSize=10",
        method: 'GET'
    })
}

export function sendMailForJobseeker(id,emailRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/recruiter/send-email/"+id,
        method: 'POST',
        body: JSON.stringify(emailRequest)
    })
}

export function deleteByID(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/jobseeker/delete-recruitment/"+id,
        method: 'DELETE'
    })
}

export function changeStatusById(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/jobseeker/cv/"+id,
        method: 'POST'
    })
}


export function deleteCVByID(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/jobseeker/cv/"+id,
        method: 'DELETE'
    })
}


export function getAllJobs(pageNo, pageSize, level, min, max, jobName, companyName, categoryId) {
    return request({
        url: API_BASE_URL + "/jobseeker/job-search?pageNo="+ pageNo +"&pageSize="+pageSize+"&level="+level+"&minSalary="+min+"&jobName="+jobName+"&maxSalary="+max+"&companyName="+companyName+"&categoryId="+categoryId,
        method: 'GET'
    })
}

export function getJobById(id){
    return request({
        url: API_BASE_URL + "/jobseeker/job-detail/"+id,
        method: 'GET'
    })
}
export function getJobOfRecruiterById(id) {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/recruiter/job/"+id,
        method: 'GET'
    });
}


export function editJobInfo(id, jobRequest) {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/recruiter/job/"+id,
        method: 'PUT',
        body: JSON.stringify(jobRequest)
    });
}


export function submitRecruiment(id) {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/jobseeker/submit-recruitment/"+id,
        method: 'POST'
    });
}


export function addNewJob(jobRequest) {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/recruiter/add-job",
        method: 'POST',
        body: JSON.stringify(jobRequest)
    });
}

export function getJobseeker() {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/jobseeker",
        method: 'GET'
    });
}

export function getRecruiter() {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/recruiter",
        method: 'GET'
    });
}

export function getAdvertisement(pageNo, pageSize, title) {

    return request({
        url: API_BASE_URL + "/admin/advertisement?pageNo="+pageNo+"&pageSize="+pageSize+"&title="+title,
        method: 'GET'
    });
}

export function getCategory(pageNo, pageSize) {

    return request({
        url: API_BASE_URL + "/admin/category?pageNo="+pageNo+"&pageSize="+pageSize,
        method: 'GET'
    });
}

export function getAdvertisementById(id) {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/admin/advertisement/"+id,
        method: 'GET'
    });
}

export function getCategoryById(id) {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/admin/category/"+id,
        method: 'GET'
    });
}

export function editCategoryById(id, categoryRequest) {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/admin/category/"+id,
        method: 'PUT',
        body: JSON.stringify(categoryRequest)
    });
}

export function deleteAdvertisement(id) {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/admin/advertisement/"+id,
        method: 'DELETE'
    });
}

export function getAllJobOfRecruiter(pageNo, pageSize) {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/admin/job?pageNo="+pageNo+"&pageSize="+pageSize,
        method: 'GET'
    });
}

export function deleteJobById(id) {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/recruiter/job/"+id,
        method: 'DELETE'
    });
}


export function getAllJobOfRecruiterById() {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/recruiter/job?pageNo=1&pageSize=100",
        method: 'GET'
    });
}


export function getAllAccount(pageNo, pageSize) {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/admin/account-register?pageNo="+pageNo+"&pageSize="+pageSize,
        method: 'GET'
    });
}



export function editInfo(phoneRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    
    return request({
        url: API_BASE_URL + "/jobseeker",
        method: 'PUT',
        body: JSON.stringify(phoneRequest)
    });
}

export function addCategory(categoryRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    
    return request({
        url: API_BASE_URL + "/admin/category",
        method: 'POST',
        body: JSON.stringify(categoryRequest)
    });
}

export function getAllCategory() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    
    return request({
        url: API_BASE_URL + "/admin/category",
        method: 'GET'
    });
}

export function editInfoRecruiter(profileRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    
    return request({
        url: API_BASE_URL + "/recruiter",
        method: 'PUT',
        body: JSON.stringify(profileRequest)
    });
}

export function lockedAccount(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    
    return request({
        url: API_BASE_URL + "/admin/locked-account/"+id,
        method: 'POST'
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function signUpRecruiter(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}