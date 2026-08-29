package stu.recruitmentweb.jobportal.domain.enums;

public enum RoleName {
    ROLE_JOBSEEKER("ROLE_JOBSEEKER"),
    ROLE_ADMIN("ROLE_ADMIN"),
    ROLE_RECRUITER("ROLE_RECRUITER");


    private String value;

    RoleName(String value){
        this.value = value;
    }

    public String getValue(){
        return this.value;
    }
}
