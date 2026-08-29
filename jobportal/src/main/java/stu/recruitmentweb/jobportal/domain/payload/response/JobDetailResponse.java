package stu.recruitmentweb.jobportal.domain.payload.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class JobDetailResponse {
    private Long id;
    private String jobTitle;
    private String level;
    private String typesOfCV;
    private String address;
    private BigDecimal minSalary;
    private BigDecimal maxSalary;
    private String description;
    private String requireJob;
    private String welfare;
    private String language;
    private String status;
    private LocalDateTime deadline;
    private RecruiterResponse recruiter;
}
