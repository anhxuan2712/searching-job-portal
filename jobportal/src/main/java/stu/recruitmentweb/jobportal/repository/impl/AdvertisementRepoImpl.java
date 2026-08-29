package stu.recruitmentweb.jobportal.repository.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import stu.recruitmentweb.jobportal.domain.models.Advertisement;
import stu.recruitmentweb.jobportal.repository.AdvertisementRepositoryCustom;
import stu.recruitmentweb.jobportal.repository.BaseRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Repository
public class AdvertisementRepoImpl implements AdvertisementRepositoryCustom {

    @PersistenceContext
    private EntityManager em;
    private static final String FROM_TABLE = " from tbl_advertisement ta ";


    @Override
    public Page<Advertisement> searchingForAdvertisement(String name, Pageable pageable) {
        StringBuilder strQuery = new StringBuilder();
        strQuery.append(FROM_TABLE);
        strQuery.append("WHERE 1=1");

        Map<String, Object> params = new HashMap<>();
        if (Objects.nonNull(name)) {
            strQuery.append(" AND ta.title LIKE :title");
            params.put("title", "%" +name+"%");
        }

        String strSelectQuery = "SELECT * " + strQuery;

        String strCountQuery = "SELECT COUNT(DISTINCT ta.id)" + strQuery;

        return BaseRepository.getPagedNativeQuery(em,strSelectQuery, strCountQuery, params, pageable, Advertisement.class);

    }
}
