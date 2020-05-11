package com.finkisystem.repository.Impl;

import com.finkisystem.functions.Conn;
import com.finkisystem.model.Professor;
import com.finkisystem.model.Program;
import com.finkisystem.repository.ProgramRepository;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class ProgramRepositoryImpl implements ProgramRepository {

    @Override
    public Program getProgram(int id) {
        Program program = null;

        String query = "SELECT * FROM Program WHERE id=" + id;

        try{
            ResultSet result = new Conn().getResultFromQuery(query);

            while (result.next()) {
                Integer progID = Integer.parseInt(result.getString(1));
                String name = result.getString(2);

                program = new Program(progID, name);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return program;
    }

    @Override
    public List<Program> getAllProgorams() {
        List<Program> programs = new ArrayList<>();

        String query = "SELECT * FROM Program ORDER BY name";

        try{
            ResultSet result = new Conn().getResultFromQuery(query);

            while (result.next()) {
                Integer programID = Integer.parseInt(result.getString(1));
                String name = result.getString(2);

                programs.add(new Program(programID, name));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return programs;
    }

    @Override
    public Program changeProgramInfo(Program p) {
        List<Program> profs = getAllProgorams();
        Program prog = null;

        for(Program item : profs){
            if(item.getId() == p.getId())
            {
                prog = p;
                break;
            }
        }

        if(prog != null){
            Conn connection = new Conn();

            String query = "UPDATE Program SET name=? WHERE id=?";

            List<String> values= new ArrayList<>();
            values.add("string"); values.add(prog.getName());
            values.add("int"); values.add(String.valueOf(prog.getId()));

            if(connection.postQuery(query, values))
                return prog;
        }

        return null;
    }

    @Override
    public Program createProgram(Program p) {
        p.setId(generateID());
        Conn connection = new Conn();

        String query = "INSERT INTO Program VALUES (?, ?)";

        List<String> values = Arrays.asList(
                "int",  String.valueOf(p.getId()),
                "string", p.getName()
        );

        if(connection.postQuery(query, values))
            return p;

        return null;
    }

    @Override
    public Program deletePRogram(Integer id) {
        List<Program> progs = getAllProgorams();
        Boolean exists = false;

        for(Program item : progs)
        {
            if(item.getId() == id)
            {
                exists = true;
            }
        }

        if(exists)
        {
            String query = "DELETE FROM Program WHERE id=?";

            List<String> values = Arrays.asList("int", String.valueOf(id));

            Conn conn = new Conn();

            Program itemToBeDeleted = getProgram(id);

            if(conn.postQuery(query, values))
                return itemToBeDeleted;
        }

        return null;
    }

    public Integer generateID(){
        List<Integer> allProgIDs = getAllProgorams().stream().map(Program::getId).collect(Collectors.toList());
        Collections.sort(allProgIDs);

        try {
            return allProgIDs.get(allProgIDs.size() - 1) + 1;
        } catch (Exception e){
            return 1;
        }
    }
}