package com.finkisystem.web.rest_controller;

import com.finkisystem.model.Professor;
import com.finkisystem.model.Subject;
import com.finkisystem.service.ProfessorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/professors")
public class ProfessorRest {
    private final ProfessorService professorService;

    public ProfessorRest(ProfessorService professorService) {
        this.professorService = professorService;
    }

    @GetMapping
    public List<Professor> getAllProfessors(){
        return this.professorService.getAllProfessors();
    }

    @GetMapping("/{id}")
    public Professor getProfessor(@PathVariable Integer id){
        return this.professorService.getProfessor(id);
    }

    @PostMapping("/update")
    public ResponseEntity updateProfessor(@Valid @RequestBody Professor prof, BindingResult result){
        if(result.hasErrors())
            return new ResponseEntity(result.getAllErrors(), HttpStatus.BAD_REQUEST); //400 - Validation error

        Professor returnedProfessor = this.professorService.changeProfessorInfo(prof);

        if(returnedProfessor!=null)
            return new ResponseEntity(returnedProfessor, HttpStatus.OK); //200 - OK, Updated
        else
            return new ResponseEntity(null, HttpStatus.CONFLICT); //409 - Duplicate record
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteProfessor(@PathVariable Integer id){
        Professor returnedProfessor = this.professorService.deleteProfessor(id);

        if(returnedProfessor!=null)
            return new ResponseEntity(returnedProfessor, HttpStatus.OK); //200 - OK, Updated
        else
            return new ResponseEntity(null, HttpStatus.NOT_MODIFIED); //304 - Cannot be deleted due to relationships
    }

    @PostMapping("/new")
    public ResponseEntity newProfessor(@Valid @RequestBody Professor prof, BindingResult result){
        if(result.hasErrors()) {
            return new ResponseEntity(result.getAllErrors(), HttpStatus.BAD_REQUEST); //400 - Validation error
        }

        Professor returnedProfessor = this.professorService.createProfessor(prof);

        if(returnedProfessor!=null)
            return new ResponseEntity(returnedProfessor, HttpStatus.OK); //200 - OK, Added
        else
            return new ResponseEntity(null, HttpStatus.CONFLICT); //409 - Duplicate record
    }
}









