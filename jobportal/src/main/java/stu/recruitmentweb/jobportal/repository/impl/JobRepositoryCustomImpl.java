package stu.recruitmentweb.jobportal.repository.impl;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import stu.recruitmentweb.jobportal.domain.models.Job;
import stu.recruitmentweb.jobportal.repository.BaseRepository;
import stu.recruitmentweb.jobportal.repository.JobRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Repository
public class JobRepositoryCustomImpl implements JobRepositoryCustom {
    @PersistenceContext
    private EntityManager em;

    private static final Integer MAX_VALUE = 2147483647;
    private static final String FROM_TABLE = "from tbl_job tj ";
    private static final String JOIN_RECRUITER = "inner join tbl_recruiter tr ON tj.recruiter_id = tr.id ";
    private static final String JOIN_COMPANY = "inner join tbl_company tc on tr.company_id = tc.id ";


    @Override
    public Page<Job> searchJob(Integer pageNo,
                               Integer pageSize,
                               BigDecimal minSalary,
                               BigDecimal maxSalary,
                               String companyName,
                               String jobName,
                               String level,
                               Long categoryId) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);


        StringBuilder strQuery = new StringBuilder();
        strQuery.append(FROM_TABLE);
        strQuery.append(JOIN_RECRUITER);
        strQuery.append(JOIN_COMPANY);
        strQuery.append("WHERE 1=1");

        Map<String, Object> params = new HashMap<>();
        if (Objects.nonNull(minSalary) && Objects.nonNull(maxSalary)) {
            strQuery.append(" AND (( min_salary between :minSalary and :maxSalary ) OR ( max_salary between :minSalary and :maxSalary ))");
            strQuery.append(" ");
            params.put("minSalary", minSalary);
            params.put("maxSalary", maxSalary);
        } else if (Objects.nonNull(maxSalary)) {
            strQuery.append(" AND (( min_salary between 0 and :maxSalary ) OR ( max_salary between 0 and :maxSalary ))");
            strQuery.append(" ");
            params.put("maxSalary", maxSalary);
        } else if (Objects.nonNull(minSalary)) {
            strQuery.append(" AND (( min_salary between :minSalary and :maxSalary ) OR ( max_salary between :minSalary and :maxSalary ))");
            params.put("minSalary", minSalary);
            params.put("maxSalary", MAX_VALUE);
        }

        if (Objects.nonNull(companyName) && !companyName.isEmpty()) {
            strQuery.append(" AND tc.name LIKE :companyName");
            params.put("companyName", "%" + companyName + "%");
        }

        if (Objects.nonNull(jobName) && !jobName.isEmpty()) {
            strQuery.append(" AND tj.job_title LIKE :jobName");
            params.put("jobName", "%" + jobName + "%");
        }

        if (Objects.nonNull(level) && !level.isEmpty()) {
            strQuery.append(" AND tj.level LIKE :level");
            params.put("level", "%" + level + "%");
        }

        if (Objects.nonNull(categoryId)) {
            strQuery.append(" AND tj.category_id = :id");
            params.put("id", categoryId);
        }

        String strSelectQuery = "SELECT * " + strQuery;

        String strCountQuery = "SELECT COUNT(DISTINCT tj.id)" + strQuery;

        return BaseRepository.getPagedNativeQuery(em, strSelectQuery, strCountQuery, params, pageable, Job.class);
    }

    @Override
    public Page<Job> getAllJob(Pageable pageable) {
        Map<String, Object> params = new HashMap<>();
        String strSelectQuery = "SELECT * " + FROM_TABLE;

        String strCountQuery = "SELECT COUNT(DISTINCT tj.id)" + FROM_TABLE;
        return BaseRepository.getPagedNativeQuery(em, strSelectQuery, strCountQuery, params, pageable, Job.class);
    }
}
