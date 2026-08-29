package stu.recruitmentweb.jobportal.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import stu.recruitmentweb.jobportal.domain.models.Advertisement;
import stu.recruitmentweb.jobportal.domain.models.Category;
import stu.recruitmentweb.jobportal.domain.models.User;
import stu.recruitmentweb.jobportal.domain.payload.request.CategoryRequest;
import stu.recruitmentweb.jobportal.domain.payload.response.AdvertisementResponse;
import stu.recruitmentweb.jobportal.domain.payload.response.JobDetailResponse;
import stu.recruitmentweb.jobportal.domain.payload.response.MessageResponse;
import stu.recruitmentweb.jobportal.domain.payload.response.UserDetailResponse;
import stu.recruitmentweb.jobportal.exception.BadRequestException;
import stu.recruitmentweb.jobportal.repository.*;
import stu.recruitmentweb.jobportal.service.AdminService;
import stu.recruitmentweb.jobportal.service.BaseService;
import stu.recruitmentweb.jobportal.service.FileStorageService;
import stu.recruitmentweb.jobportal.utils.MapperUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl extends BaseService implements AdminService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final MapperUtils mapper;
    private final AdvertisementRepository advertisementRepository;
    private final FileStorageService fileStorageService;
    private final AdvertisementRepositoryCustom advertisementRepositoryCustom;
    private final CategoryRepository categoryRepository;
    private final JobRepositoryCustom jobRepositoryCustom;
    
    

    @Override
    public Page<JobDetailResponse> getPageJobOfRecruiters(Integer pageNo, Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);

        return mapper.convertToResponsePage(jobRepositoryCustom.getAllJob(pageable), JobDetailResponse.class, pageable);
    }

    @Override
    public Page<UserDetailResponse> getPageAccountManager(Integer pageNo, Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);

        return mapper.convertToResponsePage(userRepository.getAllAccount(pageable), UserDetailResponse.class, pageable);
    }

    @Override
    public void lockAccountOfRecruiterAndJobseeker(Long id) {
        User user = userRepository.findById(id).orElseThrow();
        if (user.getIsLocked().equals(true)) {
            user.setIsLocked(false);
        } else {
            user.setIsLocked(true);
        }

        userRepository.save(user);
    }

    @Override
    public String addAdvertisement(String title,
                                   MultipartFile image,
                                   String description) {
        String imageFile = fileStorageService.storeFile(image);
        Advertisement advertisement = new Advertisement(title, imageFile ,description, getUser());
        advertisementRepository.save(advertisement);
        return "Thêm quảng cáo thành công";
    }

    @Override
    public Page<AdvertisementResponse> getPageAdvertisement(String title, Integer pageNo, Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);

        return mapper.convertToResponsePage(
                advertisementRepositoryCustom.searchingForAdvertisement(title,pageable),
                AdvertisementResponse.class, pageable
        );
    }

    @Override
    public void deleteAdvertisement(Long id) {
        advertisementRepository.deleteById(id);
    }

    @Override
    public AdvertisementResponse getAdvertisementById(Long id) {
        return mapper.convertToResponse(advertisementRepository.findById(id).orElseThrow(),AdvertisementResponse.class);
    }

    @Override
    public void updateAdvertisement(Long id , String title, MultipartFile image, String description) {
        String imageFile = fileStorageService.storeFile(image);

        Advertisement advertisement = advertisementRepository.findById(id).orElseThrow();
        advertisement.setDescription(description);
        advertisement.setImage(imageFile);
        advertisement.setTitle(title);

        advertisementRepository.save(advertisement);
    }

    @Override
    public Page<Category> getPageCategory(Integer pageNo, Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        List<Category> categories = categoryRepository.findAll();
        return new PageImpl<>(categories, pageable, categories.size());
    }

    @Override
    public MessageResponse addCategory(CategoryRequest categoryRequest) {
        Category category = new Category();
        category.setName(categoryRequest.getName());
        categoryRepository.save(category);
        return MessageResponse.builder().message("Thêm danh mục thành công").build();
    }

    @Override
    public Category getCategory(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new BadRequestException("Danh mục không tồn tại"));
    }

    @Override
    public MessageResponse updateCategory(Long id, CategoryRequest categoryRequest) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new BadRequestException("Danh mục không tồn tại"));
        category.setName(categoryRequest.getName());
        categoryRepository.save(category);
        return MessageResponse.builder().message("Cập nhật thành công").build();
    }

    private User getUser(){
        return userRepository.findById(getUserId()).orElseThrow(() -> new IllegalArgumentException("Tài khoản không tồn tại!!!!"));
    }
}
