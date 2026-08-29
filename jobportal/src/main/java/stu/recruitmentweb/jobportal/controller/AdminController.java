package stu.recruitmentweb.jobportal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import stu.recruitmentweb.jobportal.domain.payload.request.CategoryRequest;
import stu.recruitmentweb.jobportal.domain.payload.response.AdvertisementResponse;
import stu.recruitmentweb.jobportal.domain.payload.response.JobDetailResponse;
import stu.recruitmentweb.jobportal.domain.payload.response.UserDetailResponse;
import stu.recruitmentweb.jobportal.service.AdminService;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    

    @GetMapping("/job")
    private ResponseEntity<Page<JobDetailResponse>> getAllJob(@RequestParam Integer pageNo,
                                                              @RequestParam Integer pageSize) {
        return ResponseEntity.ok(adminService.getPageJobOfRecruiters(pageNo, pageSize));
    }

    @GetMapping("/category")
    private ResponseEntity<?> getAllCategory(@RequestParam Integer pageNo,
                                             @RequestParam Integer pageSize) {
        return ResponseEntity.ok(adminService.getPageCategory(pageNo, pageSize));
    }

    @GetMapping("/category/{id}")
    private ResponseEntity<?> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getCategory(id));
    }

    @PutMapping("/category/{id}")
    private ResponseEntity<?> updateCategoryById(@PathVariable Long id, @RequestBody CategoryRequest categoryRequest) {
        return ResponseEntity.ok(adminService.updateCategory(id, categoryRequest));
    }

    @PostMapping("/category")
    private ResponseEntity<?> addCategory(@RequestBody CategoryRequest categoryRequest) {
        return ResponseEntity.ok(adminService.addCategory(categoryRequest));
    }

    @GetMapping("/account-register")
    private ResponseEntity<Page<UserDetailResponse>> getPageResponseEntity(@RequestParam Integer pageNo,
                                                                           @RequestParam Integer pageSize) {
        return ResponseEntity.ok(adminService.getPageAccountManager(pageNo, pageSize));
    }

    @PostMapping("/locked-account/{id}")
    private ResponseEntity<String> lockedAccount(@PathVariable Long id) {
        adminService.lockAccountOfRecruiterAndJobseeker(id);
        return ResponseEntity.ok("Khóa tài khoản thành công!!!");
    }

    @PostMapping("/advertisement")
    private ResponseEntity<String> add(@RequestParam String title,
                                       @RequestParam("image") MultipartFile image,
                                       @RequestParam String description) {
        return new ResponseEntity<>(adminService.addAdvertisement(title,image, description), HttpStatus.CREATED);
    }

    @PutMapping("/advertisement/{id}")
    private ResponseEntity<String> update(@RequestParam String title,
                                       @RequestParam("image") MultipartFile image,
                                       @RequestParam String description, @PathVariable Long id) {
        adminService.updateAdvertisement(id,title,image, description);
        return  ResponseEntity.ok("Cập nhật thành công!!!");
    }

    @GetMapping("/advertisement")
    private ResponseEntity<Page<AdvertisementResponse>> getPageAdvertisement(@RequestParam(required = false) String title,
                                                                             @RequestParam Integer pageNo,
                                                                             @RequestParam Integer pageSize) {
        return ResponseEntity.ok(adminService.getPageAdvertisement(title, pageNo, pageSize));
    }

    @DeleteMapping("/advertisement/{id}")
    private ResponseEntity<String> deleteAdvertisement(@PathVariable Long id){
        adminService.deleteAdvertisement(id);
        return ResponseEntity.ok("Xoá quảng cáo thành công");
    }

    @GetMapping("/advertisement/{id}")
    private ResponseEntity<AdvertisementResponse> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getAdvertisementById(id));
    }
}
