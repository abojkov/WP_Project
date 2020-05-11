package com.finkisystem.model;

public class Exam {

    private Integer student;
    private Subject subject;
    private Professor professor;
    private Session session;
    private int grade;
    private String type;
        private String yearOfAttendance;
    private int semester;
    private String dateOfExam;

    public Exam(){}

    public Exam(Integer student, Subject subject, Professor professor, Session session, int grade, String type, String yearOfAttendance, int semester, String dateOfExam) {
        this.student = student;
        this.subject = subject;
        this.professor = professor;
        this.session = session;
        this.grade = grade;
        this.type = type;
        this.yearOfAttendance = yearOfAttendance;
        this.semester = semester;
        this.dateOfExam = dateOfExam;
    }

    public Integer getStudent() {
        return student;
    }

    public void setStudent(Integer student) {
        this.student = student;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public Professor getProfessor() {
        return professor;
    }

    public void setProfessor(Professor professor) {
        this.professor = professor;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public int getGrade() {
        return grade;
    }

    public void setGrade(int grade) {
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

    public int getSemester() {
        return semester;
    }

    public void setSemester(int semester) {
        this.semester = semester;
    }

    public String getDateOfExam() {
        return dateOfExam;
    }

    public void setDateOfExam(String dateOfExam) {
        this.dateOfExam = dateOfExam;
    }
}
