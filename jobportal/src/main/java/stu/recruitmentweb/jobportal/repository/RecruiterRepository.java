package stu.recruitmentweb.jobportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import stu.recruitmentweb.jobportal.domain.models.Recruiter;
import stu.recruitmentweb.jobportal.domain.models.User;

import java.util.Optional;

@Repository
public interface RecruiterRepository extends JpaRepository<Recruiter, Long> {

    Optional<Recruiter> findByUser(User user);
}
