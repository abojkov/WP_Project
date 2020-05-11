package com.finkisystem.repository.Impl;

import com.finkisystem.functions.Conn;
import com.finkisystem.model.Professor;
import com.finkisystem.model.Subject;
import com.finkisystem.repository.ProfessorRepository;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class ProfessorRepositoryImpl implements ProfessorRepository {
    @Override
    public Professor getProfessor(int id) {
        Professor professor = null;

        String query = "SELECT * FROM Professor WHERE Professor.id=" + id;

        try{
            ResultSet result = new Conn().getResultFromQuery(query);

            while (result.next()) {
                Integer profID = Integer.parseInt(result.getString(1));
                String name = result.getString(2);
                String surname = result.getString(3);

                professor = new Professor(profID, name, surname);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return professor;
    }

    @Override
    public List<Professor> getAllProfessors() {
        List<Professor> professors = new ArrayList<>();

        String query = "SELECT * FROM Professor ORDER BY name, surname";

        try{
            ResultSet result = new Conn().getResultFromQuery(query);

            while (result.next()) {
                Integer id = Integer.parseInt(result.getString(1));
                String name = result.getString(2);
                String surname = result.getString(3);

                professors.add(new Professor(id, name, surname));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return professors;
    }

    @Override
    public Professor changeProfessorInfo(Professor p) {
        List<Professor> profs = getAllProfessors();
        Professor prof = null;

        for(Professor item : profs){
            if(item.getId() == p.getId())
            {
                prof = p;
                break;
            }
        }

        if(prof != null){
            Conn connection = new Conn();

            String query = "UPDATE Professor SET name=?, surname=? WHERE id=?";

            List<String> values= new ArrayList<>();
            values.add("string"); values.add(prof.getName());
            values.add("string"); values.add(prof.getSurname());
            values.add("int"); values.add(String.valueOf(prof.getId()));

            if(connection.postQuery(query, values))
                return prof;
        }

        return null;
    }

    @Override
    public Professor createProfessor(Professor p) {
        p.setId(generateID());
        Conn connection = new Conn();

        String query = "INSERT INTO Professor VALUES (?, ?, ?)";

        List<String> values = Arrays.asList(
                "int",  String.valueOf(p.getId()),
                "string", p.getName(),
                "string", p.getSurname()
        );

        if(connection.postQuery(query, values))
            return p;

        return null;
    }

    @Override
    public Professor deleteProfessor(Integer id) {
        List<Professor> profs = getAllProfessors();
        Boolean exists = false;

        for(Professor item : profs)
        {
            if(item.getId() == id)
            {
                exists = true;
            }
        }

        if(exists)
        {
            String query = "DELETE FROM Professor WHERE id=?";

            List<String> values = Arrays.asList("int", String.valueOf(id));

            Conn conn = new Conn();

            Professor itemToBeDeleted = getProfessor(id);

            if(conn.postQuery(query, values))
                return itemToBeDeleted;
        }

        return null;
    }

    public Integer generateID(){
        List<Integer> allProfIDs = getAllProfessors().stream().map(Professor::getId).collect(Collectors.toList());
        Collections.sort(allProfIDs);

        try {
            return allProfIDs.get(allProfIDs.size() - 1) + 1;
        } catch (Exception e){
            return 1;
        }
    }
}