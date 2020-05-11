package com.finkisystem.model;

import javax.validation.constraints.NotBlank;

public class Program {
    private int id;

    @NotBlank(message = "Празно или неправилно потполнето")
    private String name;

    public Program(){}

    public Program(int id, String name) {
        this.id = id;
        this.name = name;
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
}
