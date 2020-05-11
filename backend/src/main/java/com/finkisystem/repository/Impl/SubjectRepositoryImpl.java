package com.finkisystem.repository.Impl;

import com.finkisystem.functions.Conn;
import com.finkisystem.model.Exam;
import com.finkisystem.model.Student;
import com.finkisystem.model.Subject;
import com.finkisystem.repository.ExamRepository;
import com.finkisystem.repository.SubjectRepository;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class SubjectRepositoryImpl implements SubjectRepository {
     @Override
    public Subject getSubject(String id) {
        Subject subject = null;

        String query = "SELECT * FROM Subject WHERE Subject.Code='" + id + "'";

        try{
            ResultSet result = new Conn().getResultFromQuery(query);

            while (result.next()) {
                String code = result.getString(1);
                String name = result.getString(2);
                int credits = Integer.parseInt(result.getString(3));

                subject = new Subject(code, name, credits);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return subject;
    }

    @Override
    public List<Subject> getAllSubjects(Integer id) {
        ExamRepository exmRep = new ExamRepositoryImpl(new ProfessorRepositoryImpl(), new SessionRepositoryImpl(), new StudentRepositoryImpl(), this);

        List<String> examsForThisStudent = exmRep.getAllExamsForStudent(id).stream().map(Exam::getSubject).map(Subject::getCode).collect(Collectors.toList());
        List<Subject> allSubjects = getAllSubjects();

        List<Subject> subjectsThatThisStudentHaveNotPassed = new ArrayList<>();

        for(Subject s : allSubjects)
        {
            if(examsForThisStudent.contains(s.getCode()))
                continue;

            subjectsThatThisStudentHaveNotPassed.add(s);
        }

        return subjectsThatThisStudentHaveNotPassed;
    }

    @Override
    public List<Subject> getAllSubjects() {
        List<Subject> subjects = new ArrayList<>();

        String query = "SELECT * FROM SUBJECT ORDER BY Name";

        try{
            ResultSet result = new Conn().getResultFromQuery(query);

            while (result.next()) {
                String code = result.getString(1);
                String name = result.getString(2);
                int credits = Integer.parseInt(result.getString(3));

                subjects.add(new Subject(code, name, credits));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return subjects;
    }

    @Override
    public Subject changeSubjectInfo(Subject s) {
        List<Subject> subjects = getAllSubjects();
        Subject sbj = null;

        for(Subject item : subjects){
            if(item.getCode().equals(s.getCode()))
            {
                sbj = s;
                break;
            }
        }

        if(sbj != null){
            Conn connection = new Conn();

            String query = "UPDATE Subject SET name=?, credits=? WHERE code=?";

            List<String> values= new ArrayList<>();
            values.add("string"); values.add(s.getName());
            values.add("int"); values.add(String.valueOf(s.getCredits()));
            values.add("string"); values.add(s.getCode());

            if(connection.postQuery(query, values))
                return sbj;
        }

        return null;
    }

    @Override
    public Subject createSubject(Subject s) {
        Conn connection = new Conn();

        String query = "INSERT INTO Subject VALUES (?, ?, ?)";

        List<String> values = Arrays.asList(
                "string", s.getCode(),
                "string", s.getName(),
                "int", String.valueOf(s.getCredits())
        );

        if(connection.postQuery(query, values))
            return s;

        return null;
    }

    @Override
    public Subject deleteSubject(String id) {
        List<Subject> subjects = getAllSubjects();
        Boolean exists = false;

        for(Subject item : subjects)
        {
            if(item.getCode().equals(id))
            {
                exists = true;
            }
        }

        if(exists)
        {
            String query = "DELETE FROM Subject WHERE code=?";

            List<String> values = Arrays.asList("string", id);

            Conn conn = new Conn();

            Subject itemToBeDeleted = getSubject(id);

            if(conn.postQuery(query, values))
                return itemToBeDeleted;
        }

        return null;
    }
}
