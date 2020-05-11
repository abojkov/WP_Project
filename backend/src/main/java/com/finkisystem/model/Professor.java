package com.finkisystem.model;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

public class Professor {
    private int id;

    @NotBlank(message = "Празно или неправилно потполнето")
    private String name;

    @NotBlank(message = "Празно или неправилно потполнето")
    private String surname;

    public Professor(){}

    public Professor(int id, String name, String surname) {
        this.id = id;
        this.name = name;
        this.surname = surname;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
}
