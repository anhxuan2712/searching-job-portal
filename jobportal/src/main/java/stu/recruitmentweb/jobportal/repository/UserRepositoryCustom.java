package stu.recruitmentweb.jobportal.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import stu.recruitmentweb.jobportal.domain.models.User;

public interface UserRepositoryCustom {
    Page<User> getAllAccount(Pageable pageable);
}
