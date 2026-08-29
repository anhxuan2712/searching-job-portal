package stu.recruitmentweb.jobportal.repository.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import stu.recruitmentweb.jobportal.domain.models.Recruitment;
import stu.recruitmentweb.jobportal.repository.BaseRepository;
import stu.recruitmentweb.jobportal.repository.RecruitmentRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Repository
public class RecruitmentRepositoryCustomImpl implements RecruitmentRepositoryCustom {
    @PersistenceContext
    private EntityManager em;

    private final static String FROM_TABLE = "from tbl_recruitment tr ";
    private final static String JOIN_JOBSEEKER = "inner join tbl_jobseeker tj on tr.jobseeker_id = tj.id ";
    private final static String JOIN_JOB = "inner join tbl_job tj2 on tr.job_id = tj2.id ";


    @Override
    public Page<Recruitment> getRecruitmentOfRecruiter(Pageable pageable, String createAt,Long jobseekerId, Long recruiterId,Boolean isAnswer, String jobName) {
        StringBuilder strQuery = new StringBuilder();
        strQuery.append(FROM_TABLE);
        strQuery.append(JOIN_JOBSEEKER);
        strQuery.append(JOIN_JOB);
        strQuery.append("WHERE 1=1");

        Map<String, Object> params = new HashMap<>();
        if (Objects.nonNull(jobseekerId)) {
            strQuery.append(" AND tr.jobseeker_id = :jobseekerId");
            params.put("jobseekerId", jobseekerId);
        }
        if (Objects.nonNull(recruiterId)) {
            strQuery.append(" AND tj2.recruiter_id = :recruiterId");
            params.put("recruiterId", recruiterId);
        }

        if (Objects.nonNull(createAt)) {
            strQuery.append(" AND day(tr.created_at) = day(:createAt)");
            params.put("createAt", createAt);
        }

        if (Objects.nonNull(jobName) && jobName.isEmpty()) {
            strQuery.append(" AND tj2.job_title = :jobName");
            params.put("jobName", jobName);
        }

        if(Objects.nonNull(isAnswer)) {
            strQuery.append(" AND tr.is_answer = :isAnswer");
            params.put("isAnswer", 1);
        } else {
            strQuery.append(" AND tr.is_answer = :isAnswer");
            params.put("isAnswer", 0);
        }

        String strSelectQuery = "SELECT * " + strQuery;

        String strCountQuery = "SELECT COUNT(DISTINCT tr.id)" + strQuery;

        return BaseRepository.getPagedNativeQuery(em,strSelectQuery, strCountQuery, params, pageable, Recruitment.class);
    }
}
