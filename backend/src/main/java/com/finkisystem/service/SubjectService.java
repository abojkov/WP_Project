package com.finkisystem.service;

import com.finkisystem.model.Student;
import com.finkisystem.model.Subject;

import java.util.List;

public interface SubjectService {
    Subject getSubject(String id);
    List<Subject> getAllSubjects(Integer std);
    List<Subject> getAllSubjects();
    Subject changeSubjectInfo(Subject s);
    Subject createSubject(Subject s);
    Subject deleteSubject(String id);
}
