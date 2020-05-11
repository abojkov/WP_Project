package com.finkisystem.service.Impl;

import com.finkisystem.model.Student;
import com.finkisystem.repository.StudentRepository;
import com.finkisystem.service.StudentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {
    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getAllStudents(){
        return this.studentRepository.getAllStudents();
    }

    @Override
    public Student getStudent(int id) {
        return this.studentRepository.getStudent(id);
    }

    @Override
    public Student changeStudentInfo(Student student) {
        return this.studentRepository.changeStudentInfo(student);
    }

    @Override
    public Student createStudent(Student s) {
        return this.studentRepository.createStudent(s);
    }

    @Override
    public Student deleteStudent(Integer id) {
        return this.studentRepository.deleteStudent(id);
    }
}
