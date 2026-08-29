package stu.recruitmentweb.jobportal.domain.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobseekerDetail {
    private Long id;
    private String phone;
    private CurriculumVitaeResponse curriculumVitae;
}
