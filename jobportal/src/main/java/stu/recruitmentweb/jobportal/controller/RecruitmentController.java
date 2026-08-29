package stu.recruitmentweb.jobportal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import stu.recruitmentweb.jobportal.domain.payload.response.RecruitmentResponse;
import stu.recruitmentweb.jobportal.service.JobseekerService;
import stu.recruitmentweb.jobportal.service.RecruitersService;

@RestController
@RequestMapping("/recruitment")
@RequiredArgsConstructor
public class RecruitmentController {

    private final RecruitersService recruitersService;

    private final JobseekerService jobseekerService;

    @GetMapping()
    private ResponseEntity<Page<RecruitmentResponse>> getPageRecruitmentOfRecruiter(@RequestParam(required = false) String createAt,
                                                                                    @RequestParam(required = false) Boolean isAnswer,
                                                                                    @RequestParam(required = false) String jobName,
                                                                                    @RequestParam Integer pageNo,
                                                                                    @RequestParam Integer pageSize){
        return ResponseEntity.ok(recruitersService.getRecruitmentOfRecruiter(createAt, isAnswer, jobName, pageNo, pageSize));
    }

    @GetMapping("/jobseeker")
    private ResponseEntity<Page<RecruitmentResponse>> getPageRecruitmentOfJobseeker(@RequestParam(required = false) String createAt,
                                                                                    @RequestParam(required = false) Boolean isAnswer,
                                                                                    @RequestParam(required = false) String jobName,
                                                                                    @RequestParam Integer pageNo,
                                                                                    @RequestParam Integer pageSize){
        return ResponseEntity.ok(jobseekerService.getRecruitmentOfSeeker(createAt, isAnswer, jobName, pageNo, pageSize));
    }
}
