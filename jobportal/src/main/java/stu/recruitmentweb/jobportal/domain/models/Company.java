package stu.recruitmentweb.jobportal.domain.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "tbl_company")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String address;

    private String description;
    private String image;
    private String website;
    @Column(name = "personal_size")
    private Integer personalSize;

    @OneToOne(mappedBy = "company")
    private Recruiter recruiters;

    public Company(String name, String address) {
        this.name = name;
        this.address = address;
    }
}
