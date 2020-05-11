package com.finkisystem.repository.Impl;

import com.finkisystem.functions.Conn;
import com.finkisystem.model.Student;
import com.finkisystem.repository.StudentRepository;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Repository
public class StudentRepositoryImpl implements StudentRepository {

    @Override
    public List<Student> getAllStudents() {
        List<Student> students = new ArrayList<>();

        String query = "SELECT * FROM Student ORDER BY index";

        try{
            ResultSet result = new Conn().getResultFromQuery(query);

            while (result.next()) {
                Integer index = Integer.parseInt(result.getString(1));
                String name = result.getString(2);
                String surname = result.getString(3);
                Integer totalExams = Integer.parseInt(result.getString(4));
                String address = result.getString(5);
                String embg = result.getString(6);
                String number = result.getString(7);
                String mail = result.getString(8);
                String program = result.getString(9);
                Character sex = result.getString(10).charAt(0);
                String dateBirth = result.getString(11);
                Integer yearOfStartStudies = Integer.parseInt(result.getString(12));
                String type = result.getString(13);
                String status = result.getString(14);

                students.add(new Student(index, name, surname, address, embg, number, mail, program, sex, dateBirth, yearOfStartStudies, type, status, totalExams));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return students;
    }

    @Override
    public Student getStudent(int id) {
        Student student = null;

        //String query = "SELECT index, Student.Name, surname, totalExams, address, embg, mobileNumber, mail, Program.Name, sex, dateOfBirth, yearOfStartStudies, type, status FROM Student INNER JOIN Program ON Program.id = Student.program WHERE index=" + id;

        String query = "SELECT * FROM Student WHERE index=" + id;

        try{
            ResultSet result = new Conn().getResultFromQuery(query);

            while (result.next()) {
                Integer index = Integer.parseInt(result.getString(1));
                String name = result.getString(2);
                String surname = result.getString(3);
                Integer totalExams = Integer.parseInt(result.getString(4));
                String address = result.getString(5);
                String embg = result.getString(6);
                String number = result.getString(7);
                String mail = result.getString(8);
                String program = result.getString(9);
                Character sex = result.getString(10).charAt(0);
                String dateBirth = convertDateFromDatase(result.getString(11));
                Integer yearOfStartStudies = Integer.parseInt(result.getString(12));
                String type = result.getString(13);
                String status = result.getString(14);

                student = new Student(index, name, surname, address, embg, number, mail, program, sex, dateBirth, yearOfStartStudies, type, status, totalExams);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return student;
    }

    @Override
    public Student changeStudentInfo(Student student) {
        List<Student> students = getAllStudents();
        Student std = null;

        for(Student item : students){
            if(item.getIndex() == student.getIndex())
            {
                std = student;
                break;
            }
        }

        if(std != null){
            Conn connection = new Conn();

            String query = "UPDATE Student SET totalExams=?, Name=?, Surname=?, Address=?, EMBG=?, MobileNumber=?, Mail=?," +
                    "Program=?, Sex=?, DateOfBirth=?, YearOfStartStudies=?, Type=?, Status=? WHERE index=?";

            List<String> values= new ArrayList<>();
            values.add("int"); values.add(String.valueOf(std.getTotalExams()));
            values.add("string"); values.add(std.getName());
            values.add("string"); values.add(std.getSurname());
            values.add("string"); values.add(std.getAddress());
            values.add("string"); values.add(std.getEmbg());
            values.add("string"); values.add(std.getMobileNumber());
            values.add("string"); values.add(std.getMail());
            values.add("int"); values.add(std.getProgram());
            values.add("char"); values.add(String.valueOf(std.getSex()));
            values.add("date"); values.add(convertDateForDatabase(std.getDateOfBirth()));
            values.add("int"); values.add(String.valueOf(std.getYearOfStartStudies()));
            values.add("string"); values.add(std.getType());
            values.add("string"); values.add(std.getStatus());
            values.add("int"); values.add(String.valueOf(std.getIndex()));


            if(connection.postQuery(query, values))
                return std;
        }

        return null;
    }

    @Override
    public Student createStudent(Student s) {
        Conn connection = new Conn();

        String query = "INSERT INTO Student VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        List<String> values = new ArrayList<>();

        values.add("int"); values.add(String.valueOf(s.getIndex()));
        values.add("string"); values.add(s.getName());
        values.add("string"); values.add(s.getSurname());
        values.add("int"); values.add(String.valueOf(0));
        values.add("string"); values.add(s.getAddress());
        values.add("string"); values.add(s.getEmbg());
        values.add("string"); values.add(s.getMobileNumber());
        values.add("string"); values.add(s.getMail());
        values.add("int"); values.add(s.getProgram());
        values.add("char"); values.add(String.valueOf(s.getSex()));
        values.add("date"); values.add(convertDateForDatabase(s.getDateOfBirth()));
        values.add("int"); values.add(String.valueOf(s.getYearOfStartStudies()));
        values.add("string"); values.add(s.getType());
        values.add("string"); values.add(s.getStatus());


        if(connection.postQuery(query, values))
            return s;

        return null;
    }

    @Override
    public Student deleteStudent(Integer id) {
        List<Student> students = getAllStudents();
        Boolean exists = false;

        for(Student item : students)
        {
            if(item.getIndex() == id)
            {
                exists = true;
            }
        }

        if(exists)
        {
            String query = "DELETE FROM Student WHERE index=?";

            List<String> values = Arrays.asList("int", String.valueOf(id));

            Conn conn = new Conn();

            Student itemToBeDeleted = getStudent(id);

            if(conn.postQuery(query, values))
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
