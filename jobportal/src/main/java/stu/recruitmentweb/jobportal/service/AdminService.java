package stu.recruitmentweb.jobportal.service;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;
import stu.recruitmentweb.jobportal.domain.models.Category;
import stu.recruitmentweb.jobportal.domain.payload.request.CategoryRequest;
import stu.recruitmentweb.jobportal.domain.payload.response.AdvertisementResponse;
import stu.recruitmentweb.jobportal.domain.payload.response.JobDetailResponse;
import stu.recruitmentweb.jobportal.domain.payload.response.MessageResponse;
import stu.recruitmentweb.jobportal.domain.payload.response.UserDetailResponse;

public interface AdminService {
    Page<JobDetailResponse> getPageJobOfRecruiters(Integer pageNo, Integer pageSize);

    Page<UserDetailResponse> getPageAccountManager(Integer pageNo, Integer pageSize);

    void lockAccountOfRecruiterAndJobseeker(Long id);

    //ADVERTISEMENT
    String addAdvertisement(String title,
                            MultipartFile image,
                            String description);

    Page<AdvertisementResponse> getPageAdvertisement(String title, Integer pageNo, Integer pageSize);

    void deleteAdvertisement(Long id);

    AdvertisementResponse getAdvertisementById(Long id);

    void updateAdvertisement(Long id,String title, MultipartFile image, String description);

    Page<Category> getPageCategory(Integer pageNo, Integer pageSize);

    MessageResponse addCategory(CategoryRequest categoryRequest);

    Category getCategory(Long id);

    MessageResponse updateCategory(Long id, CategoryRequest categoryRequest);
}