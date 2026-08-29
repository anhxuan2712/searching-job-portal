package stu.recruitmentweb.jobportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import stu.recruitmentweb.jobportal.domain.models.Jobseeker;
import stu.recruitmentweb.jobportal.domain.models.Recruitment;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecruitmentRepository extends JpaRepository<Recruitment, Long> {
    List<Recruitment> findByJobseeker(Jobseeker jobseeker);
}
