package com.finkisystem.model;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

public class Subject {

    @NotBlank(message = "Празно или неправилно потполнето")
    private String code;

    @NotBlank(message = "Празно или неправилно потполнето")
    private String name;

    @Min(value=1, message="Неправилна вредност")
    @Max(value=8, message="Неправилна вредност")
    private int credits;

    public Subject(){}

    public Subject(String code, String name, int credits) {
        this.code = code;
        this.name = name;
        this.credits = credits;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }
}
