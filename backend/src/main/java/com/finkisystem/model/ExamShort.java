package com.finkisystem.model;

import com.finkisystem.service.ExamService;

import javax.validation.constraints.NotNull;

public class ExamShort {
    @NotNull
    private String studentIndex;
    @NotNull
    private String subject;
    @NotNull
    private Integer professor;
    @NotNull
    private Integer session;
    @NotNull
    private Integer grade;
    @NotNull
    private String type;
    @NotNull
    private String yearOfAttendance;
    @NotNull
    private Integer semester;
    @NotNull
    private String dateOfExam;

    public ExamShort(){}

    public ExamShort(String studentIndex, String subject, Integer professor, Integer session, Integer grade, String type, String yearOfAttendance, Integer semester, String dateOfExam) {
        this.studentIndex = studentIndex;
        this.subject = subject;
        this.professor = professor;
        this.session = session;
        this.grade = grade;
        this.type = type;
        this.yearOfAttendance = yearOfAttendance;
        this.semester = semester;
        this.dateOfExam = dateOfExam;
    }

    public String getStudent() {
        return studentIndex;
    }

    public void setStudent(String studentIndex) {
        this.studentIndex = studentIndex;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Integer getProfessor() {
        return professor;
    }

    public void setProfessor(Integer professor) {
        this.professor = professor;
    }

    public Integer getSession() {
        return session;
    }

    public void setSession(Integer session) {
        this.session = session;
    }

    public Integer getGrade() {
        return grade;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getYearOfAttendance() {
        return yearOfAttendance;
    }

    public void setYearOfAttendance(String yearOfAttendance) {
        this.yearOfAttendance = yearOfAttendance;
    }

    public Integer getSemester() {
        return semester;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public String getDateOfExam() {
        return dateOfExam;
    }

    public void setDateOfExam(String dateOfExam) {
        this.dateOfExam = dateOfExam;
    }

    public String getStudentIndex() {
        return studentIndex;
    }

    public void setStudentIndex(String studentIndex) {
        this.studentIndex = studentIndex;
    }
}
