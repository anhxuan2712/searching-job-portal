package stu.recruitmentweb.jobportal.service;


import stu.recruitmentweb.jobportal.domain.payload.request.LoginRequest;
import stu.recruitmentweb.jobportal.domain.payload.request.SignUpRequest;

import java.net.URI;

public interface AuthService {
    URI registerAccount(SignUpRequest signUpRequest);

    String login(LoginRequest loginRequest);
}
