package com.finkisystem.service;

import com.finkisystem.model.Exam;

import java.util.List;

public interface ExamService {
    List<Exam> getAllExamsForStudent(Integer index);
    Exam getExamForStudent(Integer index, String subjectCode);
    Exam addNewExam(Exam exam);
    Exam changeExamInfo(Exam exam);
    Exam deleteExam(Integer student, String subject);
}
