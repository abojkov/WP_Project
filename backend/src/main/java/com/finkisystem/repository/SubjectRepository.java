package com.finkisystem.repository;

import com.finkisystem.model.Student;
import com.finkisystem.model.Subject;

import java.util.List;

public interface SubjectRepository {
    Subject getSubject(String id);
    List<Subject> getAllSubjects(Integer id);
    List<Subject> getAllSubjects();
    Subject changeSubjectInfo(Subject s);
    Subject createSubject(Subject s);
    Subject deleteSubject(String id);
}
