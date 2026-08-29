package stu.recruitmentweb.jobportal.domain.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "tbl_curriculum_vitae")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CurriculumVitae {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @Column(name = "file_cv")
    private String fileCV;
    private Boolean status;

    @ManyToOne
    @JoinColumn(name = "jobseeker_id")
    private Jobseeker jobseeker;

    public CurriculumVitae(String name, String fileCV, Boolean status, Jobseeker jobseeker) {
        this.name = name;
        this.fileCV = fileCV;
        this.status = status;
        this.jobseeker = jobseeker;
    }
}
