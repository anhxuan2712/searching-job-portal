package stu.recruitmentweb.jobportal.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import stu.recruitmentweb.jobportal.domain.models.Job;
import stu.recruitmentweb.jobportal.domain.models.Recruiter;

import org.springframework.data.domain.Pageable;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findAllByRecruiter(Recruiter recruiter);
    Page<Job> findAllByRecruiter(Recruiter recruiter, Pageable pageable);
}
