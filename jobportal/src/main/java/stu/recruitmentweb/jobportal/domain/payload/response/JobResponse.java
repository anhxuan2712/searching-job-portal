package stu.recruitmentweb.jobportal.domain.payload.response;

import lombok.Getter;
import lombok.Setter;
import stu.recruitmentweb.jobportal.domain.models.Category;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class JobResponse {
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
    private Category category;

}
