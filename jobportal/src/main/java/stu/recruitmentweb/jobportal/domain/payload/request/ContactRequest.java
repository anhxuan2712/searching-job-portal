package stu.recruitmentweb.jobportal.domain.payload.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;

@Getter
@Setter
public class ContactRequest {
    @Email
    private String toEmail;
    private String subject;
    private String name;
    private String description;
}