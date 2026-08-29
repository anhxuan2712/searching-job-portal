package stu.recruitmentweb.jobportal.domain.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecruiterResponse {
    private Long id;

    private String workplace;

    private Boolean gender;

    private String address;

    private String skypeAccount;

    private String phone;

    private UserResponse user;

    private CompanyResponse company;

}
