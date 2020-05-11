package com.finkisystem.service;

import com.finkisystem.model.Professor;

import java.util.List;

public interface ProfessorService {
    Professor getProfessor(int id);
    List<Professor> getAllProfessors();
    Professor changeProfessorInfo(Professor p);
    Professor createProfessor(Professor p);
    Professor deleteProfessor(Integer id);
}
