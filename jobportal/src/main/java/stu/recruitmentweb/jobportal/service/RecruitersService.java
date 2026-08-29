package stu.recruitmentweb.jobportal.service;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;
import stu.recruitmentweb.jobportal.domain.payload.request.JobRequest;
import stu.recruitmentweb.jobportal.domain.payload.request.RecruiterUpdateRequest;
import stu.recruitmentweb.jobportal.domain.payload.request.SendEmailRequest;
import stu.recruitmentweb.jobportal.domain.payload.response.JobResponse;
import stu.recruitmentweb.jobportal.domain.payload.response.MessageResponse;
import stu.recruitmentweb.jobportal.domain.payload.response.RecruiterResponse;
import stu.recruitmentweb.jobportal.domain.payload.response.RecruitmentResponse;

import javax.mail.MessagingException;
import java.io.IOException;

public interface RecruitersService {
    RecruiterResponse getRecruiterInfo();

    String editProfileOfRecruiter(RecruiterUpdateRequest recruiterUpdateRequest);

    String recruiterAddJob(JobRequest jobRequest);

    Page<JobResponse> getAllJobOfRecruiter(Integer pageNo, Integer pageSize);

    JobResponse getJobOfRecruiterById(Long id);

    String editJobInfo(Long id, JobRequest jobRequest);

    void deleteJob(Long id);

    String contactWithJobseeker(Long id, SendEmailRequest sendEmailRequest) throws MessagingException, IOException;

    Page<RecruitmentResponse> getRecruitmentOfRecruiter(String createAt,Boolean isAnswer, String jobName, Integer pageNo, Integer pageSize);

    MessageResponse editProfileOfRecruiter(String recruiterAddress, String recruiterPhone, String skypeAccount, String workplace, String companyAddress, String companyName, String description, MultipartFile image, Integer personalSize, String website);
}
