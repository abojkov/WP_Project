package com.finkisystem.repository;

import com.finkisystem.model.Student;

import java.util.List;

public interface StudentRepository {
    List<Student> getAllStudents();
    Student getStudent(int id);
    Student changeStudentInfo(Student student);
    Student createStudent(Student s);
    Student deleteStudent(Integer id);
}
