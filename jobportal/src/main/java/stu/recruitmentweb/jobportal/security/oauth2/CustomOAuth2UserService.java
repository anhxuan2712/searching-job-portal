package stu.recruitmentweb.jobportal.security.oauth2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import stu.recruitmentweb.jobportal.domain.enums.AuthProvider;
import stu.recruitmentweb.jobportal.domain.enums.RoleName;
import stu.recruitmentweb.jobportal.domain.models.Jobseeker;
import stu.recruitmentweb.jobportal.domain.models.Role;
import stu.recruitmentweb.jobportal.domain.models.User;
import stu.recruitmentweb.jobportal.exception.BadRequestException;
import stu.recruitmentweb.jobportal.exception.OAuth2AuthenticationProcessingException;
import stu.recruitmentweb.jobportal.repository.JobseekerRepository;
import stu.recruitmentweb.jobportal.repository.RoleRepository;
import stu.recruitmentweb.jobportal.repository.UserRepository;
import stu.recruitmentweb.jobportal.security.UserPrincipal;
import stu.recruitmentweb.jobportal.security.oauth2.user.OAuth2UserInfo;
import stu.recruitmentweb.jobportal.security.oauth2.user.OAuth2UserInfoFactory;


import java.util.Collections;
import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobseekerRepository jobseekerRepository;

    @Autowired
    RoleRepository roleRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        if(StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }

        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
        User user;
        if(userOptional.isPresent()) {
            user = userOptional.get();
            if (Boolean.TRUE.equals(user.getIsLocked()))
            {
                throw new BadRequestException("Tài khoản của bạn đã bị khóa. Lý do chi tiết sẽ có trong email của bạn.");
            }
            if(!user.getProvider().equals(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
                throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
                        user.getProvider() + " account. Please use your " + user.getProvider() +
                        " account to login.");
            }
            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }

        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        User user = new User();

        user.setProvider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
        user.setProviderId(oAuth2UserInfo.getId());
        user.setName(oAuth2UserInfo.getName());
        user.setEmail(oAuth2UserInfo.getEmail());
        user.setIsLocked(Boolean.FALSE);
        user.setImageUrl(oAuth2UserInfo.getImageUrl());

        Role userRole = roleRepository.findByName(RoleName.ROLE_JOBSEEKER)
                .orElseThrow(() -> new IllegalArgumentException("User Role not set."));

        user.setRoles(Collections.singleton(userRole));
        User result = userRepository.save(user);
        jobseekerRepository.save(new Jobseeker(user));
        return result;
    }

    private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.setName(oAuth2UserInfo.getName());
        existingUser.setImageUrl(oAuth2UserInfo.getImageUrl());
        return userRepository.save(existingUser);
    }

}
