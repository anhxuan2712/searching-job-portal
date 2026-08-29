package stu.recruitmentweb.jobportal.domain.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "tbl_jobseeker")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Jobseeker implements Serializable{

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String phone;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "jobseeker")
    private List<Recruitment> recruitments;

    @OneToMany(mappedBy = "jobseeker")
    private List<CurriculumVitae> curriculumVitaeList;

    public Jobseeker(User user) {
        this.user = user;
    }
}
