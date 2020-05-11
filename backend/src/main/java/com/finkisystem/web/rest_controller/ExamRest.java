package com.finkisystem.web.rest_controller;

import com.finkisystem.model.Exam;
import com.finkisystem.model.ExamShort;
import com.finkisystem.service.ExamService;
import com.finkisystem.service.ProfessorService;
import com.finkisystem.service.SessionService;
import com.finkisystem.service.SubjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/exams")
public class ExamRest {
    private final ExamService examService;
    private final SubjectService subjectService;
    private final ProfessorService professorService;
    private final SessionService sessionService;

    public ExamRest(ExamService examService, SubjectService subjectService, ProfessorService professorService, SessionService sessionService) {
        this.examService = examService;
        this.subjectService = subjectService;
        this.professorService = professorService;
        this.sessionService = sessionService;
    }

    @GetMapping("/{id}")
    public List<Exam> getExamsForStudent(@PathVariable Integer id){
        return this.examService.getAllExamsForStudent(id);
    }

    @GetMapping("/{id}/{code}")
    public Exam getExamForStudent(@PathVariable Integer id, @PathVariable String code){
        return this.examService.getExamForStudent(id, code);
    }

    @PostMapping("/new")
    public ResponseEntity newExam(@Valid @RequestBody ExamShort shortExam, BindingResult result){
        if(result.hasErrors()) {
            return new ResponseEntity(result.getAllErrors(), HttpStatus.BAD_REQUEST); //400 - Validation error
        }

        Exam longExam = new Exam(Integer.parseInt(shortExam.getStudentIndex()), this.subjectService.getSubject(shortExam.getSubject()), this.professorService.getProfessor(shortExam.getProfessor()), this.sessionService.getSession(shortExam.getSession()), shortExam.getGrade(), shortExam.getType(), shortExam.getYearOfAttendance(), shortExam.getSemester(), shortExam.getDateOfExam());

        return new ResponseEntity(this.examService.addNewExam(longExam), HttpStatus.OK); //200 - OK, Added
    }

    @PostMapping("/update")
    public ResponseEntity updateStudent(@Valid @RequestBody ExamShort exam, BindingResult result){
        if(result.hasErrors())
            return new ResponseEntity(result.getAllErrors(), HttpStatus.BAD_REQUEST); //400 - Validation error

        Exam returnedExam = this.examService.changeExamInfo(new Exam(Integer.parseInt(exam.getStudentIndex()), this.subjectService.getSubject(exam.getSubject()), this.professorService.getProfessor(exam.getProfessor()), this.sessionService.getSession(exam.getSession()), exam.getGrade(), exam.getType(), exam.getYearOfAttendance(), exam.getSemester(), exam.getDateOfExam()));

        return new ResponseEntity(returnedExam, HttpStatus.OK); //200 - OK, Updated
    }

    @DeleteMapping("/delete/{id}/{subject}")
    public ResponseEntity deleteProfessor(@PathVariable Integer id, @PathVariable String subject){
        Exam returnedExam = this.examService.deleteExam(id, subject);

        if(returnedExam!=null)
            return new ResponseEntity(returnedExam, HttpStatus.OK); //200 - OK, Updated
        else
            return new ResponseEntity(null, HttpStatus.NOT_MODIFIED); //304 - Cannot be deleted due to relationships //NEMA POTREBA OD OVA
    }
}
