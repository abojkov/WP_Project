package com.finkisystem.repository;

import com.finkisystem.model.Professor;
import com.finkisystem.model.Student;
import com.finkisystem.model.Subject;

import java.util.List;

public interface ProfessorRepository {
    Professor getProfessor(int id);
    List<Professor> getAllProfessors();
    Professor changeProfessorInfo(Professor p);
    Professor createProfessor(Professor p);
    Professor deleteProfessor(Integer id);
}
