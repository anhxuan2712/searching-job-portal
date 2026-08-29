package stu.recruitmentweb.jobportal.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import stu.recruitmentweb.jobportal.domain.models.Job;


import java.math.BigDecimal;

public interface JobRepositoryCustom {
    Page<Job> searchJob(Integer pageNo,
                        Integer pageSize,
                        BigDecimal minSalary,
                        BigDecimal maxSalary,
                        String companyName,
                        String jobName,
                        String level,
                        Long categoryId);

    Page<Job> getAllJob(Pageable pageable);
}
