package com.finkisystem.repository.Impl;

import com.finkisystem.functions.Conn;
import com.finkisystem.model.Session;
import com.finkisystem.repository.SessionRepository;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Repository
public class SessionRepositoryImpl implements SessionRepository {
    @Override
    public Session getSession(int id) {
        Session session = null;

        String query = "SELECT * FROM Session WHERE id=" + id;

        try{
            ResultSet result = new Conn().getResultFromQuery(query);

            while (result.next()) {
                Integer sesID = Integer.parseInt(result.getString(1));
                String month = result.getString(2);
                Integer year = Integer.parseInt(result.getString(3));
                Boolean active = Integer.parseInt(result.getString(4)) == 1 ? true : false;

                session = new Session(sesID, month, year, active);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return session;
    }

    @Override
    public List<Session> getAllSessions() {
        List<Session> sessions = new ArrayList<>();

        String query = "SELECT * FROM Session ORDER BY id DESC";

        try{
            ResultSet result = new Conn().getResultFromQuery(query);

            while (result.next()) {
                Integer sesID = Integer.parseInt(result.getString(1));
                String month = result.getString(2);
                Integer year = Integer.parseInt(result.getString(3));
                Boolean active = Integer.parseInt(result.getString(4)) == 1 ? true : false;

                sessions.add(new Session(sesID, month, year, active));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return sessions;
    }

    @Override
    public Session changeSessionInfo(Session session) {
        List<Session> sessions = getAllSessions();
        Session ses = null;

        for(Session item : sessions){
            if(item.getId() == session.getId())
            {
                ses = session;
                break;
            }
        }

        if(ses != null){
            Conn connection = new Conn();

            String query = "UPDATE Session SET month=?, year=?, active=? WHERE id=?";

            List<String> values= new ArrayList<>();
            values.add("string"); values.add(ses.getMonth());
            values.add("int"); values.add(String.valueOf(ses.getYear()));
            values.add("int");

            if(ses.getActive()==true)
                values.add(String.valueOf(1));
            else
                values.add(String.valueOf(0));

            values.add("int"); values.add(String.valueOf(ses.getId()));

            if(connection.postQuery(query, values))
                return ses;
        }

        return null;
    }

    @Override
    public Session createSession(Session session) {
        session.setId(generateID(session.getMonth(), session.getYear()));
        Conn connection = new Conn();

        String query = "INSERT INTO Session VALUES (?, ?, ?, ?)";

        List<String> values = Arrays.asList(
                "int",  String.valueOf(session.getId()),
                "string", session.getMonth(),
                "int",  String.valueOf(session.getYear()),
                "int", String.valueOf(0)
        );


        if(connection.postQuery(query, values))
            return session;

        return null;
    }

    @Override
    public Session deleteSession(Integer id) {
        List<Session> sessions = getAllSessions();
        Boolean exists = false;

        for(Session item : sessions)
        {
            if(item.getId() == id)
            {
                exists = true;
            }
        }

        if(exists)
        {
            String query = "DELETE FROM Session WHERE id=?";

            List<String> values = Arrays.asList("int", String.valueOf(id));

            Conn conn = new Conn();

            Session itemToBeDeleted = getSession(id);

            if(conn.postQuery(query, values))
                return itemToBeDeleted;
        }

        return null;
    }

    public Integer generateID(String month, Integer year){
        StringBuilder ID = new StringBuilder();

        ID.append(String.valueOf(year));

        if(month.equals("Јануари"))
            ID.append(String.valueOf(1));
        else if(month.equals("Јуни"))
            ID.append(String.valueOf(2));
        else
            ID.append(String.valueOf(3));

        return Integer.parseInt(ID.toString());
    }
}
