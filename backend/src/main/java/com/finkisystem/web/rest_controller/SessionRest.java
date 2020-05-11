package com.finkisystem.web.rest_controller;

import com.finkisystem.model.Session;
import com.finkisystem.service.SessionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/sessions")
public class SessionRest {
    private final SessionService sessionService;

    public SessionRest(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @GetMapping
    public List<Session> getAllSessions(){
        return this.sessionService.getAllSessions();
    }

    @GetMapping("/{id}")
    public Session getSession(@PathVariable Integer id){
        return this.sessionService.getSession(id);
    }

    @PostMapping("/update")
    public ResponseEntity updateSession(@Valid @RequestBody Session session, BindingResult result){
        if(result.hasErrors())
            return new ResponseEntity(result.getAllErrors(), HttpStatus.BAD_REQUEST); //400 - Validation error

        Session returnedSession = this.sessionService.changeSessionInfo(session);

        if(returnedSession!=null)
            return new ResponseEntity(returnedSession, HttpStatus.OK); //200 - OK, Updated
        else
            return new ResponseEntity(null, HttpStatus.CONFLICT); //409 - Duplicate record
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteSession(@PathVariable Integer id){
        Session returnedSession = this.sessionService.deleteSession(id);

        if(returnedSession!=null)
            return new ResponseEntity(returnedSession, HttpStatus.OK); //200 - OK, Updated
        else
            return new ResponseEntity(null, HttpStatus.NOT_MODIFIED); //304 - Cannot be deleted due to relationships
    }

    @PostMapping("/new")
    public ResponseEntity newSession(@Valid @RequestBody Session session, BindingResult result){
        if(result.hasErrors()) {
            return new ResponseEntity(result.getAllErrors(), HttpStatus.BAD_REQUEST); //400 - Validation error
        }

        Session returnedSession = this.sessionService.createSession(session);

        if(returnedSession!=null)
            return new ResponseEntity(returnedSession, HttpStatus.OK); //200 - OK, Added
        else
            return new ResponseEntity(null, HttpStatus.CONFLICT); //409 - Duplicate record
    }
}
