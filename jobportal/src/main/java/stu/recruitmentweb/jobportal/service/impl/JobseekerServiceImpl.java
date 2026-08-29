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
import stu.recruitmentweb.jobportal.domain.models.*;
import stu.recruitmentweb.jobportal.domain.payload.request.ContactRequest;
import stu.recruitmentweb.jobportal.domain.payload.request.PhoneRequest;
import stu.recruitmentweb.jobportal.domain.payload.response.*;
import stu.recruitmentweb.jobportal.exception.BadRequestException;
import stu.recruitmentweb.jobportal.repository.*;
import stu.recruitmentweb.jobportal.repository.RecruitmentRepository;
import stu.recruitmentweb.jobportal.service.BaseService;
import stu.recruitmentweb.jobportal.service.FileStorageService;
import stu.recruitmentweb.jobportal.service.JobseekerService;
import stu.recruitmentweb.jobportal.utils.MapperUtils;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobseekerServiceImpl extends BaseService implements JobseekerService {
    private final JobseekerRepository jobseekerRepository;
    private final UserRepository userRepository;
    private final MapperUtils mapper;
    private final JobRepositoryCustom jobRepositoryCustom;
    private final FileStorageService fileStorageService;
    private final CurriculumVitaeRepository curriculumVitaeRepository;
    private final JobRepository jobRepository;
    private final RecruitmentRepository recruitmentRepository;
    private final RecruitmentRepositoryCustom recruitmentRepositoryCustom;
    private final JavaMailSender mailSender;

    @Override
    public String editJobseekerInformation(PhoneRequest phoneRequest) {
        Jobseeker jobseeker = jobseekerRepository.findByUser(getUser())
                .orElseThrow(() -> new IllegalArgumentException("Ứng viên không tồn tại!!!"));
        jobseeker.setPhone(phoneRequest.getPhone());
        jobseekerRepository.save(jobseeker);
        return "Cập nhật thành công";
    }

    @Override
    public MessageResponse editJobseekerInformation(String phone, MultipartFile file) {
        Jobseeker jobseeker = jobseekerRepository.findByUser(getUser())
                .orElseThrow(() -> new IllegalArgumentException("Ứng viên không tồn tại!!!"));
        jobseeker.setPhone(phone);

        User user = getUser();
        String image = fileStorageService.storeFile(file);
        user.setImageUrl(image);

        userRepository.save(user);
        return MessageResponse.builder().message("Cập nhập thành công.").build();
    }

    @Override
    public JobseekerResponse getJobseekerByToken() {
        return mapper.convertToResponse(jobseekerRepository.findByUser(getUser())
                .orElseThrow(() -> new IllegalArgumentException("Ứng viên không tồn tại!!!")), JobseekerResponse.class);
    }

    @Override
    public Page<JobDetailResponse> getPageForJobseeker(Integer pageNo, Integer pageSize, BigDecimal minSalary, BigDecimal maxSalary, String companyName, String jobName, String level,Long categoryId) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        return mapper.convertToResponsePage(jobRepositoryCustom.searchJob(pageNo, pageSize, minSalary, maxSalary, companyName, jobName, level, categoryId),JobDetailResponse.class, pageable);
    }

    @Override
    public String addCV(String name, MultipartFile fileCv) {
        String file = fileStorageService.storeFile(fileCv);
        CurriculumVitae curriculumVitae = new CurriculumVitae(name,file, false, getUser().getJobseeker());
        curriculumVitaeRepository.save(curriculumVitae);
        return "Thêm mới CV thành công!!";
    }

    @Override
    public void changeStatusCV(Long id) {
        List<CurriculumVitae> list = curriculumVitaeRepository.findAllByJobseeker(getUser().getJobseeker());
        for (CurriculumVitae cv:list
             ) {
            cv.setStatus(false);
            curriculumVitaeRepository.save(cv);
        }

        CurriculumVitae curriculumVitae = curriculumVitaeRepository.findById(id).orElseThrow(() -> new BadRequestException("CV không tồn tại!!"));
        curriculumVitae.setStatus(true);
        curriculumVitaeRepository.save(curriculumVitae);
    }

    @Override
    public Page<CurriculumVitaeResponse> getAllCvOfJobseeker() {
        Pageable pageable = PageRequest.of(1, 10);
        List<CurriculumVitaeResponse> list = mapper.convertToResponseList(curriculumVitaeRepository.findAllByJobseeker(getUser().getJobseeker()),CurriculumVitaeResponse.class);
        return new PageImpl<>(list,pageable,list.size());
    }

    @Override
    public void deleteCvById(Long id) {
        curriculumVitaeRepository.deleteById(id);
    }

    @Override
    public void submitRecruitment(Long jobId) {
        if(getUser().getJobseeker().getCurriculumVitaeList().size() == 0) {

            throw new BadRequestException("Bạn cần upload CV trước khi ứng tuyển!!");
        }
        Boolean isFlag = false;
        for (CurriculumVitae cv : getUser().getJobseeker().getCurriculumVitaeList()){
            if (Boolean.FALSE.equals(cv.getStatus()) ){
                isFlag = false;
            } else {
                isFlag = true;
                break;
            }
        }
        if (isFlag.equals(false)) {
            throw new BadRequestException("Bạn chưa chọn cv nào làm cv chính");
        }
        for (Recruitment r : recruitmentRepository.findByJobseeker(getUser().getJobseeker())) {
            if (jobId.equals(r.getJob().getId())) {
                throw new BadRequestException("Công việc này bạn đã ứng tuyển!!");
            }
        }
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new BadRequestException("Công việc đã bị khóa!!"));

        Recruitment recruitment = new Recruitment(job, getUser());
        recruitment.setIsAnswer(false);
        for (int i = 0; getUser().getJobseeker().getCurriculumVitaeList().size() > i ; i++) {
            if (getUser().getJobseeker().getCurriculumVitaeList().get(i).getStatus()) {
                recruitment.setCv(getUser().getJobseeker().getCurriculumVitaeList().get(i).getFileCV());
            }
        }

        recruitmentRepository.save(recruitment);
    }

    @Override
    public MessageResponse sendEmailOfContact(ContactRequest contactRequest) throws MessagingException, IOException {
        sendEmailFromTemplate(contactRequest);
        return MessageResponse.builder().message("Gửi yêu cầu liên hệ thành công").build();
    }

    @Override
    public Page<RecruitmentResponse> getRecruitmentOfSeeker(String createAt, Boolean isAnswer, String jobName, Integer pageNo, Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        return mapper.convertToResponsePage(
                recruitmentRepositoryCustom.getRecruitmentOfRecruiter(pageable,createAt, getUser().getJobseeker().getId(), null, isAnswer, jobName),
                RecruitmentResponse.class,
                pageable);
    }

    @Override
    public void deleteRecruitmentById(Long id) {
        recruitmentRepository.deleteById(id);
    }

    @Override
    public JobDetailResponse getJobById(Long id) {
        return mapper.convertToResponse(
                jobRepository.findById(id).orElseThrow(()-> new BadRequestException("Job error")), JobDetailResponse.class);
    }




    private User getUser(){
        return userRepository.findById(getUserId()).orElseThrow(() -> new IllegalArgumentException("Tài khoản không tồn tại!!!"));
    }

    public void sendEmailFromTemplate(ContactRequest contactRequest) throws MessagingException, IOException {
        MimeMessage message = mailSender.createMimeMessage();

        message.setFrom(new InternetAddress("trungdang82678@gmail.com"));

        message.setRecipients(MimeMessage.RecipientType.TO, contactRequest.getToEmail());
        message.setSubject(contactRequest.getSubject());

        // Read the HTML template into a String variable
        String htmlTemplate = readFile("send-email.html");

        // Replace placeholders in the HTML template with dynamic values
        htmlTemplate = htmlTemplate.replace("NAM NGHIEM", contactRequest.getName());
        // htmlTemplate = htmlTemplate.replace(target:"VI TRI", contactRequest.getSubject());
        htmlTemplate = htmlTemplate.replace("DESCRIPTION", contactRequest.getDescription());

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
