package stu.recruitmentweb.jobportal.domain.payload.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class RecruiterRequest {
    @NotBlank
    private String gender;
    @Size(max = 11)
    private String phone;

    @NotBlank
    private String companyName;
    @NotBlank
    private String workplace;
    @NotBlank
    private String address;
    private String skypeAccount;

}
