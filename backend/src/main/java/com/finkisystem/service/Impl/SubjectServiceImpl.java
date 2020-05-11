package com.finkisystem.service.Impl;

import com.finkisystem.model.Student;
import com.finkisystem.model.Subject;
import com.finkisystem.repository.SubjectRepository;
import com.finkisystem.service.SubjectService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectServiceImpl implements SubjectService {
    private final SubjectRepository subjectRepository;

    public SubjectServiceImpl(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    @Override
    public Subject getSubject(String id) {
        return this.subjectRepository.getSubject(id);
    }

    @Override
    public List<Subject> getAllSubjects(Integer std) {
        return this.subjectRepository.getAllSubjects(std);
    }

    @Override
    public List<Subject> getAllSubjects() {
        return this.subjectRepository.getAllSubjects();
    }

    @Override
    public Subject changeSubjectInfo(Subject s) {
        return this.subjectRepository.changeSubjectInfo(s);
    }

    @Override
    public Subject createSubject(Subject s) {
        return this.subjectRepository.createSubject(s);
    }

    @Override
    public Subject deleteSubject(String id) {
        return this.subjectRepository.deleteSubject(id);
    }


}
