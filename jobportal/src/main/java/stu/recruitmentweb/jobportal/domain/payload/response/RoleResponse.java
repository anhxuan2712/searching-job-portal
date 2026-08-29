package stu.recruitmentweb.jobportal.domain.payload.response;

import lombok.Getter;
import lombok.Setter;
import stu.recruitmentweb.jobportal.domain.enums.RoleName;

@Getter
@Setter
public class RoleResponse {

    private Long id;

    private RoleName name;
}
