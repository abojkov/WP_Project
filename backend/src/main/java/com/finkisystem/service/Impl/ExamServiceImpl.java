package com.finkisystem.service.Impl;

import com.finkisystem.model.Exam;
import com.finkisystem.repository.ExamRepository;
import com.finkisystem.service.ExamService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamServiceImpl implements ExamService {
    private final ExamRepository examRepository;

    public ExamServiceImpl(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

    @Override
    public List<Exam> getAllExamsForStudent(Integer index) {
        return this.examRepository.getAllExamsForStudent(index);
    }

    @Override
    public Exam getExamForStudent(Integer index, String subjectCode) {
        return this.examRepository.getExamForStudent(index, subjectCode);
    }

    @Override
    public Exam addNewExam(Exam exam) {
        return this.examRepository.addNewExam(exam);
    }

    @Override
    public Exam changeExamInfo(Exam exam) {
        return this.examRepository.changeExamInfo(exam);
    }

    @Override
    public Exam deleteExam(Integer student, String subject) {
        return this.examRepository.deleteExam(student, subject);
    }
}
