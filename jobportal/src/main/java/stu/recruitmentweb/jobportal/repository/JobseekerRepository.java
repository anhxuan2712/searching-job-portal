package stu.recruitmentweb.jobportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import stu.recruitmentweb.jobportal.domain.models.Jobseeker;
import stu.recruitmentweb.jobportal.domain.models.User;


import java.util.Optional;

@Repository
public interface JobseekerRepository extends JpaRepository<Jobseeker, Long> {
    Optional<Jobseeker> findByUser(User user);
}
