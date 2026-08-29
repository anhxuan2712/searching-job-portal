package stu.recruitmentweb.jobportal.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import stu.recruitmentweb.jobportal.domain.models.User;


import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> , UserRepositoryCustom{

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

}
