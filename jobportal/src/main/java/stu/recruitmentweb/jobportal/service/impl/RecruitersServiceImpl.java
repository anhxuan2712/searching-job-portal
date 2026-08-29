package stu.recruitmentweb.jobportal.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;
import stu.recruitmentweb.jobportal.domain.enums.JobStatus;
import stu.recruitmentweb.jobportal.domain.models.*;
import stu.recruitmentweb.jobportal.domain.payload.request.JobRequest;
import stu.recruitmentweb.jobportal.domain.payload.request.RecruiterUpdateRequest;
import stu.recruitmentweb.jobportal.domain.payload.request.SendEmailRequest;
import stu.recruitmentweb.jobportal.domain.payload.response.JobResponse;
import stu.recruitmentweb.jobportal.domain.payload.response.MessageResponse;
import stu.recruitmentweb.jobportal.domain.payload.response.RecruiterResponse;
import stu.recruitmentweb.jobportal.domain.payload.response.RecruitmentResponse;
import stu.recruitmentweb.jobportal.exception.BadRequestException;
import stu.recruitmentweb.jobportal.repository.*;
import stu.recruitmentweb.jobportal.repository.RecruitmentRepository;
import stu.recruitmentweb.jobportal.service.BaseService;
import stu.recruitmentweb.jobportal.service.RecruitersService;
import stu.recruitmentweb.jobportal.utils.MapperUtils;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class RecruitersServiceImpl extends BaseService implements RecruitersService {
    private final UserRepository userRepository;
    private final MapperUtils mapper;
    private final RecruiterRepository recruiterRepository;
    private final CompanyRepository companyRepository;
    private final JobRepository jobRepository;
    private final JavaMailSender mailSender;
    private final RecruitmentRepository recruitmentRepository;
    private final RecruitmentRepositoryCustom recruitmentRepositoryCustom;
    private final FileStorageServiceImpl fileStorageService;
    private final CategoryRepository categoryRepository;

    //RECRUITER

    @Override
    public RecruiterResponse getRecruiterInfo() {
        return mapper.convertToResponse(recruiterRepository.findByUser(getUser())
                .orElseThrow(() -> new IllegalArgumentException("Nhà tuyển dụng không tồn tại!!")), RecruiterResponse.class);
    }

    @Override
    public String editProfileOfRecruiter(RecruiterUpdateRequest recruiterUpdateRequest) {
        Recruiter recruiter = recruiterRepository.findByUser(getUser()).orElseThrow(() ->
                new IllegalArgumentException("Nhà tuyển dụng không tồn tại!!"));
        if (Objects.nonNull(recruiterUpdateRequest.getRecruiterAddress())) {
            recruiter.setAddress(recruiterUpdateRequest.getRecruiterAddress());
        }
        if (Objects.nonNull(recruiterUpdateRequest.getRecruiterPhone())) {
            recruiter.setPhone(recruiterUpdateRequest.getRecruiterPhone());
        }
        if (Objects.nonNull(recruiterUpdateRequest.getSkypeAccount())) {
            recruiter.setSkypeAccount(recruiterUpdateRequest.getSkypeAccount());
        }
        if (Objects.nonNull(recruiterUpdateRequest.getWorkplace())) {
            recruiter.setWorkplace(recruiterUpdateRequest.getWorkplace());
        }

        recruiterRepository.save(recruiter);

        Company company = companyRepository.findById(recruiter.getCompany().getId())
                .orElseThrow(() -> new IllegalArgumentException("Công ty không tồn tại!!!"));
        if (Objects.nonNull(recruiterUpdateRequest.getCompanyAddress())) {
            company.setAddress(recruiterUpdateRequest.getCompanyAddress());
        }
        company.setDescription(recruiterUpdateRequest.getDescription());
        company.setImage(recruiterUpdateRequest.getImage());
        if (Objects.nonNull(recruiterUpdateRequest.getCompanyName())) {
            company.setName(recruiterUpdateRequest.getCompanyName());
        }
        company.setPersonalSize(recruiterUpdateRequest.getPersonalSize());
        company.setWebsite(recruiterUpdateRequest.getWebsite());

        companyRepository.save(company);

        return "Cập nhật thành công";
    }
    @Override
    public MessageResponse editProfileOfRecruiter(String recruiterAddress, String recruiterPhone, String skypeAccount, String workplace, String companyAddress, String companyName, String description, MultipartFile image, Integer personalSize, String website) {
        Recruiter recruiter = recruiterRepository.findByUser(getUser()).orElseThrow(() ->
                new IllegalArgumentException("Nhà tuyển dụng không tồn tại!!"));
        if (Objects.nonNull(recruiterAddress)) {
            recruiter.setAddress(recruiterAddress);
        }
        if (Objects.nonNull(recruiterPhone)) {
            recruiter.setPhone(recruiterPhone);
        }
        if (Objects.nonNull(skypeAccount)) {
            recruiter.setSkypeAccount(skypeAccount);
        }
        if (Objects.nonNull(workplace)) {
            recruiter.setWorkplace(workplace);
        }

        recruiterRepository.save(recruiter);

        Company company = companyRepository.findById(recruiter.getCompany().getId())
                .orElseThrow(() -> new IllegalArgumentException("Công ty không tồn tại!!!"));
        if (Objects.nonNull(companyAddress)) {
            company.setAddress(companyAddress);
        }
        company.setDescription(description);
        String file = fileStorageService.storeFile(image);
        company.setImage(file);
        if (Objects.nonNull(companyName)) {
            company.setName(companyName);
        }
        company.setPersonalSize(personalSize);
        company.setWebsite(website);

        companyRepository.save(company);

        return MessageResponse.builder().message("Cập nhật thông tin thành công").build();
    }

    //JOB
    @Override
    public String recruiterAddJob(JobRequest jobRequest) {
        Job job = new Job(jobRequest,categoryRepository.findById(jobRequest.getCategory()).get(), recruiterRepository.findByUser(getUser()).orElseThrow(() ->
                new IllegalArgumentException("Nhà tuyển dụng không tồn tại!!")));
        jobRepository.save(job);
        return "Đăng tin tuyển dụng thành công!!!";
    }

    @Override
    public Page<JobResponse> getAllJobOfRecruiter(Integer pageNo, Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        Recruiter recruiter = recruiterRepository.findByUser(getUser()).orElseThrow(() ->
                new IllegalArgumentException("Nhà tuyển dụng không tồn tại!!"));
        List<JobResponse> result = mapper.convertToResponseList(jobRepository.findAllByRecruiter(recruiter), JobResponse.class);
        return new PageImpl<>(result, pageable, result.size() );
    }

    @Override
    public JobResponse getJobOfRecruiterById(Long id) {
        return mapper.convertToResponse(jobRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("Công việc không tồn tại")), JobResponse.class);
    }

    @Override
    public String editJobInfo(Long id, JobRequest jobRequest) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Công việc không tồn tại!!!"));
        job.setAddress(jobRequest.getAddress());
        job.setJobTitle(jobRequest.getJobTitle());
        job.setDescription(jobRequest.getDescription());
        job.setDeadline(LocalDateTime.parse(jobRequest.getDeadline()));
        job.setRequireJob(jobRequest.getRequireJob());
        job.setLevel(jobRequest.getLevel());
        job.setMinSalary(jobRequest.getMinSalary());
        job.setMaxSalary(jobRequest.getMaxSalary());
        job.setTypesOfCV(jobRequest.getTypesOfCV());
        job.setLanguage(jobRequest.getLanguage());
        job.setWelfare(jobRequest.getWelfare());

        jobRepository.save(job);
        return "Cập nhật thông tin đăng tuyển thành công";
    }

    @Override
    public void deleteJob(Long id) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Công việc không tồn tại!!!"));
        job.setStatus(JobStatus.DISABLE);
        jobRepository.save(job);
    }

    @Override
    public String contactWithJobseeker(Long id, SendEmailRequest sendEmailRequest) throws MessagingException, IOException {
        Recruitment recruitment = recruitmentRepository.findById(id).orElseThrow(() -> new BadRequestException("Không tồn tại đơn ứng tuyển!!!"));
        recruitment.setIsAnswer(true);
        sendEmailFromTemplate(sendEmailRequest,recruitment.getJobseeker().getUser().getName());
        recruitmentRepository.save(recruitment);
        return "Thư đã gửi thành công!!!";
    }

    @Override
    public Page<RecruitmentResponse> getRecruitmentOfRecruiter(String createAt,
                                                               Boolean isAnswer,
                                                               String jobName,
                                                               Integer pageNo,
                                                               Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        return mapper.convertToResponsePage(
                recruitmentRepositoryCustom.getRecruitmentOfRecruiter(pageable,createAt,null, getUser().getRecruiter().getId(), isAnswer, jobName),
                RecruitmentResponse.class,
                pageable);
    }



    private User getUser(){
        return userRepository.findById(getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Tài khoản không tồn tại!!!"));
    }


    public void sendEmailFromTemplate(SendEmailRequest sendEmailRequest, String jobseekerName) throws MessagingException, IOException {
        MimeMessage message = mailSender.createMimeMessage();

        message.setFrom(new InternetAddress("trungdang82678@gmail.com"));
        message.setRecipients(MimeMessage.RecipientType.TO, sendEmailRequest.getToEmail());
        message.setSubject(sendEmailRequest.getTitle());

        // Read the HTML template into a String variable
        String htmlTemplate = readFile("send-email.html");

        // Replace placeholders in the HTML template with dynamic values
        htmlTemplate = htmlTemplate.replace("NAM NGHIEM", jobseekerName);
        htmlTemplate = htmlTemplate.replace("DESCRIPTION", sendEmailRequest.getDescription());

        // Set the email's content to be the HTML template
        message.setContent(htmlTemplate, "text/html; charset=utf-8");

        mailSender.send(message);
    }

    public static String readFile(String filename) throws IOException {
        File file = ResourceUtils.getFile("classpath:send-email.html");
        byte[] encoded = Files.readAllBytes(file.toPath());
        return new String(encoded, StandardCharsets.UTF_8);
    }
}
