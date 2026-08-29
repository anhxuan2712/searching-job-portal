package stu.recruitmentweb.jobportal.domain.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CurriculumVitaeResponse {

    private Long id;
    private String name;
    private String fileCV;
    private Boolean status;
}
