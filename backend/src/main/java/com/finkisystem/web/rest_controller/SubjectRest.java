package com.finkisystem.web.rest_controller;

import com.finkisystem.model.Subject;
import com.finkisystem.service.SubjectService;
import jdk.nashorn.internal.objects.NativeJSON;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.print.attribute.standard.Media;
import javax.validation.Valid;
import java.util.List;

import static org.postgresql.core.Oid.JSON;

@RestController
@RequestMapping("/api/subjects")
public class SubjectRest {
    private final SubjectService subjectService;

    public SubjectRest(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @GetMapping
    public List<Subject> getAllSubjects(){
        return subjectService.getAllSubjects();
    }

    @GetMapping("/{id}")
    public Subject getSubject(@PathVariable String id){
        return this.subjectService.getSubject(id);
    }

    @PostMapping("/update")
    public ResponseEntity updateSubject(@Valid @RequestBody Subject sbj, BindingResult result){
        if(result.hasErrors())
            return new ResponseEntity(result.getAllErrors(), HttpStatus.BAD_REQUEST); //400 - Validation error

        return new ResponseEntity(this.subjectService.changeSubjectInfo(sbj), HttpStatus.OK); //200 - OK, Updated
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteSubject(@PathVariable String id){
        Subject returnedSubject = this.subjectService.deleteSubject(id);

        if(returnedSubject!=null)
            return new ResponseEntity(returnedSubject, HttpStatus.OK); //200 - OK, Updated
        else
            return new ResponseEntity(null, HttpStatus.NOT_MODIFIED); //304 - Cannot be deleted due to relationships
    }

    @PostMapping("/new")
    @ResponseBody
    public ResponseEntity newSubject(@Valid @RequestBody Subject sbj, BindingResult result){
        if(result.hasErrors()) {
            return new ResponseEntity(result.getAllErrors(), HttpStatus.BAD_REQUEST); //400 - Validation error
        }

        Subject returnedSubject = this.subjectService.createSubject(sbj);

        if(returnedSubject!=null)
            return new ResponseEntity(returnedSubject, HttpStatus.OK); //200 - OK, Added
        else
            return new ResponseEntity(null, HttpStatus.CONFLICT); //409 - Duplicate record
    }

    @GetMapping("/for/{id}")
    public List<Subject> getAllSubjects(@PathVariable Integer id){
        return subjectService.getAllSubjects(id);
    }
}
