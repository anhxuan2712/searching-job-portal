import axios from "axios"
import { ACCESS_TOKEN } from "../../constants";

const BASE_URL = "http://localhost:8080/"

class FileService {

  uploadImage(fileFormData) {
    return axios.post(BASE_URL + 'jobseeker/add-cv', fileFormData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
      }
    );

  }

  editJobseekerInfo(fileFormData) {
    return axios.put(BASE_URL + 'jobseeker/update', fileFormData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
      }
    );

  }
  editInfoRecruiter(fileFormData) {
    return axios.put(BASE_URL + 'recruiter/profile', fileFormData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
      }
    );

  }

  uploadImageOfAdvertisement(fileFormData) {
    return axios.post(BASE_URL + 'admin/advertisement', fileFormData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
      }
    );

  }

  updateImageOfAdvertisement(id,fileFormData) {
    return axios.put(BASE_URL + 'admin/advertisement/'+id, fileFormData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
      }
    );
  }
}
export default new FileService();