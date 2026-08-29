package stu.recruitmentweb.jobportal.domain.models;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "tbl_recruiter")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Recruiter{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@Column(nullable = false)
	private String workplace;

	@Column(nullable = false)
	private Boolean gender;

	private String address;

	@Column(name = "skype_account",nullable = false)
	private String skypeAccount;

	@Column(nullable = false)
	private String phone;
	
	@OneToOne
	@JoinColumn(name = "user_id")
	private User user;

	@OneToOne
	@JoinColumn(name = "company_id")
	private Company company;

	@OneToMany(mappedBy = "recruiter")
	private List<Job> jobs;

	public Recruiter(String workplace, Boolean gender, String skypeAccount, String phone, User user, Company company) {
		this.workplace = workplace;
		this.gender = gender;
		this.skypeAccount = skypeAccount;
		this.phone = phone;
		this.user = user;
		this.company = company;
	}
}
