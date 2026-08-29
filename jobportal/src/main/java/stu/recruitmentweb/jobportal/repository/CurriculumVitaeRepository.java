package stu.recruitmentweb.jobportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import stu.recruitmentweb.jobportal.domain.models.CurriculumVitae;
import stu.recruitmentweb.jobportal.domain.models.Jobseeker;

import java.util.List;

@Repository
public interface CurriculumVitaeRepository extends JpaRepository<CurriculumVitae , Long> {
    List<CurriculumVitae> findAllByJobseeker(Jobseeker jobseeker);
}
