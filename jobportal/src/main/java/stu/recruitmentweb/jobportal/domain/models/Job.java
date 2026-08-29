package stu.recruitmentweb.jobportal.domain.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import stu.recruitmentweb.jobportal.domain.enums.JobStatus;
import stu.recruitmentweb.jobportal.domain.models.audit.DateAudit;
import stu.recruitmentweb.jobportal.domain.payload.request.JobRequest;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tbl_job")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Job extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "job_title")
    private String jobTitle;
    private String level;

    @Column(name = "types_of_cv")
    private String typesOfCV;
    private String address;
    @Column(name = "min_salary")
    private BigDecimal minSalary;
    @Column(name = "max_salary")
    private BigDecimal maxSalary;
    @Lob
    private String description;

    @Column(name = "require_job")
    @Lob
    private String requireJob;
    @Lob
    private String welfare;
    private String language;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private JobStatus status;

    private LocalDateTime deadline;

    @ManyToOne
    @JoinColumn(name = "recruiter_id")
    private Recruiter recruiter;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "job")
    private List<Recruitment> recruitments;

    public Job(JobRequest jobRequest,Category category, Recruiter recruiter) {
        this.jobTitle = jobRequest.getJobTitle();
        this.level = jobRequest.getLevel();
        this.typesOfCV = jobRequest.getTypesOfCV();
        this.address = jobRequest.getAddress();
        this.minSalary = jobRequest.getMinSalary();
        this.maxSalary = jobRequest.getMaxSalary();
        this.description = jobRequest.getDescription();
        this.requireJob = jobRequest.getRequireJob();
        this.welfare = jobRequest.getWelfare();
        this.language = jobRequest.getLanguage();
        this.status = JobStatus.ENABLE;
        this.deadline = LocalDateTime.parse(jobRequest.getDeadline());
        this.category = category;
        this.recruiter = recruiter;
    }
}
