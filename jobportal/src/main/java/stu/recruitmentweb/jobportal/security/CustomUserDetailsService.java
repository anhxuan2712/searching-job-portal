package stu.recruitmentweb.jobportal.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import stu.recruitmentweb.jobportal.domain.models.User;
import stu.recruitmentweb.jobportal.exception.BadRequestException;
import stu.recruitmentweb.jobportal.exception.ResourceNotFoundException;
import stu.recruitmentweb.jobportal.repository.UserRepository;

import javax.transaction.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with email : " + email)
                );
        if (Boolean.TRUE.equals(user.getIsLocked()))
        {
            throw new BadRequestException("Tài khoản của bạn đã bị khóa. Lý do chi tiết sẽ có trong email của bạn.");
        }

        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", id)
        );

        return UserPrincipal.create(user);
    }
}