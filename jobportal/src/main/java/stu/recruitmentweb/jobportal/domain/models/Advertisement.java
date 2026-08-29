package stu.recruitmentweb.jobportal.domain.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "tbl_advertisement")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Advertisement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "title", length = 254)
    private String title;
    @Column(columnDefinition = "longtext")
    private String image;
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Advertisement(String  title, String image, String description, User user) {
        this.title = title;
        this.image = image;
        this.description = description;
        this.user = user;
    }
}
