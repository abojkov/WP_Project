package com.finkisystem.repository.Impl;

import com.finkisystem.functions.Conn;
import com.finkisystem.model.*;
import com.finkisystem.repository.*;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Repository
public class ExamRepositoryImpl implements ExamRepository {
    private final ProfessorRepository professorRepository;
    private final SessionRepository sessionRepository;
    private final StudentRepository studentRepository;
    private final SubjectRepository subjectRepository;

    public ExamRepositoryImpl(ProfessorRepository professorRepository, SessionRepository sessionRepository, StudentRepository studentRepository, SubjectRepository subjectRepository) {
        this.professorRepository = professorRepository;
        this.sessionRepository = sessionRepository;
        this.studentRepository = studentRepository;
        this.subjectRepository = subjectRepository;
    }

    @Override
    public List<Exam> getAllExamsForStudent(Integer index) {
        List<Exam> exams = new ArrayList<>();

        String query = "SELECT * FROM Exam WHERE Student=" + index + " ORDER BY Subject";

        try {
            ResultSet result = new Conn().getResultFromQuery(query);

            Student thisS = this.studentRepository.getStudent(index);

            while (result.next()) {
                String subject = result.getString(2);
                Integer professor = Integer.parseInt(result.getString(3));
                Integer session = Integer.parseInt(result.getString(4));
                Integer grade = Integer.parseInt(result.getString(5));
                String type = result.getString(6);
                String yearOfAttendance = result.getString(7);
                Integer semester = Integer.parseInt(result.getString(8));
                String dateOfExam = convertDateFromDatase(result.getString(9));

                exams.add(new Exam(index, this.subjectRepository.getSubject(subject), this.professorRepository.getProfessor(professor), this.sessionRepository.getSession(session), grade, type, yearOfAttendance, semester, dateOfExam));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return exams;
    }

    @Override
    public Exam getExamForStudent(Integer index, String subjectCode){
        Exam exam = null;

        String query = "SELECT * FROM Exam WHERE Student=" + index + " AND Subject='" + subjectCode + "'";

        try{
            ResultSet result = new Conn().getResultFromQuery(query);

            while (result.next()) {
                Subject subject = this.subjectRepository.getSubject(result.getString(2));
                Professor professor = this.professorRepository.getProfessor(Integer.parseInt(result.getString(3)));
                Session session = this.sessionRepository.getSession(Integer.parseInt(result.getString(4)));
                Integer grade = Integer.parseInt(result.getString(5));
                String type = result.getString(6);
                String yearOfAttendance = result.getString(7);
                Integer semester = Integer.parseInt(result.getString(8));
                String dateOfExam = convertDateFromDatase(result.getString(9));

                exam = new Exam(index, subject, professor, session, grade, type, yearOfAttendance, semester, dateOfExam);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return exam;
    }

    @Override
    public Exam addNewExam(Exam exam) {
        Conn connection = new Conn();

        String query = "INSERT INTO Exam VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        List<String> values = new ArrayList<>();

        values.add("int"); values.add(String.valueOf(exam.getStudent()));
        values.add("string"); values.add(exam.getSubject().getCode());
        values.add("int"); values.add(String.valueOf(exam.getProfessor().getId()));
        values.add("int"); values.add(String.valueOf(exam.getSession().getId()));
        values.add("int"); values.add(String.valueOf(exam.getGrade()));
        values.add("string"); values.add(exam.getType());
        values.add("string"); values.add(exam.getYearOfAttendance());
        values.add("int"); values.add(String.valueOf(exam.getSemester()));
        values.add("date"); values.add(convertDateForDatabase(exam.getDateOfExam()));

        if(connection.postQuery(query, values))
        {
            Student thisStudent = this.studentRepository.getStudent(exam.getStudent());
            thisStudent.setTotalExams(thisStudent.getTotalExams()+1);

            this.studentRepository.changeStudentInfo(thisStudent);

            return exam;
        }


        return null;
    }

    @Override
    public Exam changeExamInfo(Exam exam) {
        List<Exam> exams = getAllExamsForStudent(exam.getStudent());
        Exam exm = null;

        for(Exam item : exams){
            if(item.getStudent().equals(exam.getStudent()) && item.getSubject().getCode().equals(exam.getSubject().getCode()))
            {
                exm = exam;
                break;
            }
        }

        if(exm != null){
            Conn connection = new Conn();

            String query = "UPDATE Exam SET professor=?, session=?, grade=?, type=?, yearOfAttendance=?, semester=?, dateOfExam=? WHERE student=? AND subject=?";

            List<String> values= new ArrayList<>();
            values.add("int"); values.add(String.valueOf(exam.getProfessor().getId()));
            values.add("int"); values.add(String.valueOf(exam.getSession().getId()));
            values.add("int"); values.add(String.valueOf(exam.getGrade()));
            values.add("string"); values.add(exam.getType());
            values.add("string"); values.add(exam.getYearOfAttendance());
            values.add("int"); values.add(String.valueOf(exam.getSemester()));
            values.add("date"); values.add(convertDateForDatabase(exam.getDateOfExam()));
            values.add("int"); values.add(String.valueOf(exam.getStudent()));
            values.add("string"); values.add(String.valueOf(exam.getSubject().getCode()));

            if(connection.postQuery(query, values))
                return exm;
        }

        return null;
    }

    @Override
    public Exam deleteExam(Integer student, String subject) {
        String query = "DELETE FROM Exam WHERE Student=? AND Subject=?";

        List<String> values = Arrays.asList(
                "int", String.valueOf(student),
                "string", subject
        );

        Conn conn = new Conn();

        Exam itemToBeDeleted = getExamForStudent(student, subject);

        if(conn.postQuery(query, values))
        {
            Student thisStudent = this.studentRepository.getStudent(student);
            thisStudent.setTotalExams(thisStudent.getTotalExams()-1);

            this.studentRepository.changeStudentInfo(thisStudent);

            return itemToBeDeleted;
        }


        return null;
    }


    public String convertDateForDatabase(String s)
    {
        // Форматот за запишување на датум во SQL е 'yyyy-mm-dd'
        String[] sNew = s.split("[.]");
        String tmp = String.format("%s-%s-%s", sNew[2], sNew[1], sNew[0]);

        return tmp;
    }
    public String convertDateFromDatase(String s)
    {
        // Форматот за читање на датум од SQL е 'mm/dd/yyyy HH:MI'
        String[] newDateModified = s.split(" ")[0].split("-");
        String showDateOfBirth = String.format("%02d.%02d.%s", Integer.parseInt(newDateModified[2]), Integer.parseInt(newDateModified[1]), newDateModified[0]);

        return showDateOfBirth;
    }
}
