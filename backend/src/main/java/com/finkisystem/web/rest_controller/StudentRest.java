package com.finkisystem.web.rest_controller;

import com.finkisystem.model.Session;
import com.finkisystem.model.Student;
import com.finkisystem.service.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentRest {
    private final StudentService studentService;

    public StudentRest(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getAllStudents(){
        return this.studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Student getStudent(@PathVariable Integer id){
        return this.studentService.getStudent(id);
    }

    @PostMapping("/update")
    public ResponseEntity updateStudent(@Valid @RequestBody Student student, BindingResult result){
        if(result.hasErrors())
            return new ResponseEntity(result.getAllErrors(), HttpStatus.BAD_REQUEST); //400 - Validation error

        Student returnedStudent = this.studentService.changeStudentInfo(student);

        return new ResponseEntity(returnedStudent, HttpStatus.OK); //200 - OK, Updated
    }

    @PostMapping("/new")
    @ResponseBody
    public ResponseEntity newStudent(@Valid @RequestBody Student stud, BindingResult result){
        if(result.hasErrors()) {
            return new ResponseEntity(result.getAllErrors(), HttpStatus.BAD_REQUEST); //400 - Validation error
        }

        Student returnedStudent = this.studentService.createStudent(stud);

        if(returnedStudent!=null)
            return new ResponseEntity(returnedStudent, HttpStatus.OK); //200 - OK, Added
        else
            return new ResponseEntity(null, HttpStatus.CONFLICT); //409 - Duplicate record
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteStudent(@PathVariable Integer id){
        Student returnedStudent = this.studentService.deleteStudent(id);

        if(returnedStudent!=null)
            return new ResponseEntity(returnedStudent, HttpStatus.OK); //200 - OK, Updated
        else
            return new ResponseEntity(null, HttpStatus.NOT_MODIFIED); //304 - Cannot be deleted due to relationships
    }
}
