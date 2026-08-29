package stu.recruitmentweb.jobportal.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import stu.recruitmentweb.jobportal.domain.models.Recruitment;

public interface RecruitmentRepositoryCustom {
    Page<Recruitment> getRecruitmentOfRecruiter(Pageable pageable, String createAt,Long jobseekerId, Long recruiterId,Boolean isAnswer, String jobName);
}
