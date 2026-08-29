package stu.recruitmentweb.jobportal.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import stu.recruitmentweb.jobportal.domain.models.Advertisement;

public interface AdvertisementRepositoryCustom {
    Page<Advertisement> searchingForAdvertisement(String name,Pageable pageable);
}
