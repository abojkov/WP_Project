package com.finkisystem.service.Impl;

import com.finkisystem.model.Professor;
import com.finkisystem.repository.ProfessorRepository;
import com.finkisystem.service.ProfessorService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfessorServiceImpl implements ProfessorService {
    private final ProfessorRepository professorRepository;

    public ProfessorServiceImpl(ProfessorRepository professorRepository) {
        this.professorRepository = professorRepository;
    }

    @Override
    public Professor getProfessor(int id) {
        return this.professorRepository.getProfessor(id);
    }

    @Override
    public List<Professor> getAllProfessors() {
        return this.professorRepository.getAllProfessors();
    }

    @Override
    public Professor changeProfessorInfo(Professor p) {
        List<Professor> profs = this.professorRepository.getAllProfessors();
        for(Professor item : profs){
            if(item.getName().equals(p.getName()) && item.getSurname().equals(p.getSurname()))
            {
                //DUPLIKAT
                return null;
            }
        }

        return this.professorRepository.changeProfessorInfo(p);
    }

    @Override
    public Professor createProfessor(Professor p) {
        List<Professor> profs = this.professorRepository.getAllProfessors();
        for(Professor item : profs){
            if(item.getName().equals(p.getName()) && item.getSurname().equals(p.getSurname()))
            {
                //DUPLIKAT
                return null;
            }
        }

        return this.professorRepository.createProfessor(p);
    }

    @Override
    public Professor deleteProfessor(Integer id) {
        return this.professorRepository.deleteProfessor(id);
    }
}
