package com.finkisystem.web.rest_controller;

import com.finkisystem.model.Professor;
import com.finkisystem.model.Program;
import com.finkisystem.service.ProgramService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/programs")
public class ProgramRest {
    private final ProgramService programService;

    public ProgramRest(ProgramService programService) {
        this.programService = programService;
    }

    @GetMapping
    public List<Program> getAllPrograms(){
        return this.programService.getAllProgorams();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteProgram(@PathVariable Integer id){
        Program returnedProgram = this.programService.deletePRogram(id);

        if(returnedProgram!=null)
            return new ResponseEntity(returnedProgram, HttpStatus.OK); //200 - OK, Updated
        else
            return new ResponseEntity(null, HttpStatus.NOT_MODIFIED); //304 - Cannot be deleted due to relationships
    }

    @PostMapping("/new")
    public ResponseEntity newProgram(@Valid @RequestBody Program prog, BindingResult result){
        if(result.hasErrors()) {
            return new ResponseEntity(result.getAllErrors(), HttpStatus.BAD_REQUEST); //400 - Validation error
        }

        Program returnedProgram = this.programService.createProgram(prog);

        if(returnedProgram!=null)
            return new ResponseEntity(returnedProgram, HttpStatus.OK); //200 - OK, Added
        else
            return new ResponseEntity(null, HttpStatus.CONFLICT); //409 - Duplicate record
    }

    @GetMapping("/{id}")
    public Program getProgram(@PathVariable Integer id){
        return this.programService.getProgram(id);
    }

    @PostMapping("/update")
    public ResponseEntity updateProgram(@Valid @RequestBody Program prog, BindingResult result){
        if(result.hasErrors())
            return new ResponseEntity(result.getAllErrors(), HttpStatus.BAD_REQUEST); //400 - Validation error

        Program returnedProgram = this.programService.changeProgramInfo(prog);

        if(returnedProgram!=null)
            return new ResponseEntity(returnedProgram, HttpStatus.OK); //200 - OK, Updated
        else
            return new ResponseEntity(null, HttpStatus.CONFLICT); //409 - Duplicate record
    }

}
