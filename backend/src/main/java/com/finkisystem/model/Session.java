package com.finkisystem.model;

import javax.validation.constraints.*;

public class Session {
    private int id;

    @NotBlank(message = "Празно или неправилно потполнето")
    private String month;

    @Min(value=1980, message = "Празно поле")
    private Integer year;

    @NotNull
    private Boolean active;

    public Session(){}

    public Session(int id, String month, int year, Boolean active) {
        this.id = id;
        this.month = month;
        this.year = year;
        this.active = active;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}
