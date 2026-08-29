package stu.recruitmentweb.jobportal.domain.enums;

public enum JobStatus {
    ENABLE("ENABLE"),
    DISABLE("DISABLE");

    private String value;

    JobStatus(String value){
        this.value = value;
    }

    public String getValue(){
        return this.value;
    }
}
