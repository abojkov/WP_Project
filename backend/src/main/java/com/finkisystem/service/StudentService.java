package com.finkisystem.service;

import com.finkisystem.model.Student;

import java.util.List;

public interface StudentService {
    List<Student> getAllStudents();
    Student getStudent(int id);
    Student changeStudentInfo(Student student);
    Student createStudent(Student s);
    Student deleteStudent(Integer id);
}
