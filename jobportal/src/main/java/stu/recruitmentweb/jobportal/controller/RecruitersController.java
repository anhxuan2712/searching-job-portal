package stu.recruitmentweb.jobportal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import stu.recruitmentweb.jobportal.domain.payload.request.JobRequest;
import stu.recruitmentweb.jobportal.domain.payload.request.RecruiterUpdateRequest;
import stu.recruitmentweb.jobportal.domain.payload.request.SendEmailRequest;
import stu.recruitmentweb.jobportal.domain.payload.response.JobResponse;
import stu.recruitmentweb.jobportal.domain.payload.response.RecruiterResponse;
import stu.recruitmentweb.jobportal.service.RecruitersService;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/recruiter")
@RequiredArgsConstructor
public class RecruitersController {
    private final RecruitersService recruitersService;

    @GetMapping
    private ResponseEntity<RecruiterResponse> getRecruiterInfo(){
        return ResponseEntity.ok(recruitersService.getRecruiterInfo());
    }

    @PutMapping
    private ResponseEntity<String> editRecruiterInfo(@Valid @RequestBody RecruiterUpdateRequest recruiterUpdateRequest){
        return ResponseEntity.ok(recruitersService.editProfileOfRecruiter(recruiterUpdateRequest));
    }

    // Update
    @PutMapping("/profile")
    private ResponseEntity<?> editRecruiterInfo(@RequestParam  String recruiterAddress,
                                                @RequestParam String recruiterPhone,
                                                @RequestParam String skypeAccount,
                                                @RequestParam String workplace,
                                                @RequestParam String companyAddress,
                                                @RequestParam String companyName,
                                                @RequestParam String description,
                                                @RequestParam(value = "image", required = false) MultipartFile image,
                                                @RequestParam Integer personalSize,
                                                @RequestParam String website){
        return ResponseEntity.ok(recruitersService.editProfileOfRecruiter(recruiterAddress,recruiterPhone,skypeAccount,workplace,
                companyAddress,companyName,description,image,personalSize,website));
    }

    @PostMapping("/add-job")
    private ResponseEntity<String> recruiterAddNewJob(@Valid @RequestBody JobRequest jobRequest){
        return new ResponseEntity<>(recruitersService.recruiterAddJob(jobRequest), HttpStatus.CREATED);
    }

    @GetMapping("/job")
    private ResponseEntity<Page<JobResponse>> getPageJobOfRecruiter(@RequestParam Integer pageNo,
                                                                   @RequestParam Integer pageSize){
        return ResponseEntity.ok(recruitersService.getAllJobOfRecruiter(pageNo, pageSize));
    }

    @GetMapping("/job/{id}")
    private ResponseEntity<JobResponse> getJobOfRecruiter(@PathVariable Long id){
        return ResponseEntity.ok(recruitersService.getJobOfRecruiterById(id));
    }

    @PutMapping("/job/{id}")
    private ResponseEntity<String> editJobInfo(@PathVariable Long id, @RequestBody JobRequest jobRequest){
        return ResponseEntity.ok(recruitersService.editJobInfo(id, jobRequest));
    }

    @DeleteMapping("/job/{id}")
    private ResponseEntity<String> deleteJobById(@PathVariable Long id){
        recruitersService.deleteJob(id);
        return ResponseEntity.ok("Xóa bài đăng tuyển thành công!!!");
    }

    @PostMapping("/send-email/{id}")
    private ResponseEntity<String> sendEmail(@PathVariable Long id, @RequestBody SendEmailRequest sendEmailRequest) throws MessagingException, IOException {
        return ResponseEntity.ok(recruitersService.contactWithJobseeker(id, sendEmailRequest));
    }
}
