package com.finkisystem.service.Impl;

import com.finkisystem.model.Program;
import com.finkisystem.repository.ProgramRepository;
import com.finkisystem.service.ProgramService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgramServiceImpl implements ProgramService {
    private final ProgramRepository programRepository;

    public ProgramServiceImpl(ProgramRepository programRepository) {
        this.programRepository = programRepository;
    }

    @Override
    public Program getProgram(int id) {
        return this.programRepository.getProgram(id);
    }

    @Override
    public List<Program> getAllProgorams() {
        return this.programRepository.getAllProgorams();
    }

    @Override
    public Program changeProgramInfo(Program p) {
        List<Program> profs = this.programRepository.getAllProgorams();
        for(Program item : profs){
            if(item.getName().equals(p.getName()))
            {
                //DUPLIKAT
                return null;
            }
        }

        return this.programRepository.changeProgramInfo(p);
    }

    @Override
    public Program createProgram(Program p) {
        List<Program> profs = this.programRepository.getAllProgorams();
        for(Program item : profs){
            if(item.getName().equals(p.getName()))
            {
                //DUPLIKAT
                return null;
            }
        }

        return this.programRepository.createProgram(p);
    }

    @Override
    public Program deletePRogram(Integer id) {
        return this.programRepository.deletePRogram(id);
    }
}
