package com.finkisystem.service;

import com.finkisystem.model.Program;

import java.util.List;

public interface ProgramService {
    Program getProgram(int id);
    List<Program> getAllProgorams();
    Program changeProgramInfo(Program p);
    Program createProgram(Program p);
    Program deletePRogram(Integer id);
}
