package com.finkisystem.model;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

public class Student {

    @Min(value = 1, message = "Полето е задолжително")
    private int index;

    @NotBlank(message = "Полето е задолжително")
    private String name;
    @NotBlank(message = "Полето е задолжително")
    private String surname;
    @NotBlank(message = "Полето е задолжително")
    private String address;
    @NotBlank(message = "Полето е задолжително")
    private String embg;

    private String mobileNumber;

    @NotBlank(message = "Полето е задолжително")
    private String mail;
    @NotBlank(message = "Полето е задолжително")
    private String program;

    @NotNull(message = "Полето е задолжително")
    private Character sex;
    @NotBlank(message = "Полето е задолжително")
    private String dateOfBirth;

    @Min(value = 2011, message = "Полето е задолжително")
    private int yearOfStartStudies;

    @NotBlank(message = "Полето е задолжително")
    private String type;
    @NotBlank(message = "Полето е задолжително")
    private String status;

    private int totalExams;

    public Student(){}

    public Student(int index, String name, String surname, String address, String embg, String mobileNumber, String mail, String program, char sex, String dateOfBirth, int yearOfStartStudies, String type, String status, Integer totalExams) {
        this.index = index;
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.embg = embg;
        this.mobileNumber = mobileNumber;
        this.mail = mail;
        this.program = program;
        this.sex = sex;
        this.dateOfBirth = dateOfBirth;
        this.yearOfStartStudies = yearOfStartStudies;
        this.type = type;
        this.status = status;
        this.totalExams = totalExams;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmbg() {
        return embg;
    }

    public void setEmbg(String embg) {
        this.embg = embg;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getProgram() {
        return program;
    }

    public void setProgram(String program) {
        this.program = program;
    }

    public char getSex() {
        return sex;
    }

    public void setSex(char sex) {
        this.sex = sex;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public int getYearOfStartStudies() {
        return yearOfStartStudies;
    }

    public void setYearOfStartStudies(int yearOfStartStudies) {
        this.yearOfStartStudies = yearOfStartStudies;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getTotalExams() {
        return totalExams;
    }

    public void setTotalExams(int totalExams) {
        this.totalExams = totalExams;
    }
}
