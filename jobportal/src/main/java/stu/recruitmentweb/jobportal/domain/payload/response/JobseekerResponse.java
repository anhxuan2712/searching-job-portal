package stu.recruitmentweb.jobportal.domain.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobseekerResponse {

    private Long id;
    private String phone;
    private UserResponse user;
}
