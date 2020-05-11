package com.finkisystem.functions;

import java.sql.*;
import java.util.List;

public class Conn {
    Connection connection;

    public Conn() {
        try {
            connection = DriverManager.getConnection("jdbc:postgresql://localhost/FinkiESystem", "postgres", "Mojadb293*");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public ResultSet getResultFromQuery(String query) throws SQLException {
        PreparedStatement s =  connection.prepareStatement(query);
        ResultSet res = s.executeQuery();

        connection.close();

        return res;
    }

    public Boolean postQuery(String query, List<String> values) {
        try{
            PreparedStatement s =  connection.prepareStatement(query);

            for(int i=0, column=1; i<values.size(); i++, column++)
            {
                String shouldBeString = values.get(i);

                if(shouldBeString.equals("string"))
                    s.setString(column, values.get(++i));
                else if(shouldBeString.equals("int"))
                    s.setInt(column, Integer.parseInt(values.get(++i)));
                else if(shouldBeString.equals("char"))
                    s.setString(column, String.valueOf(values.get(++i).charAt(0)));
                else if(shouldBeString.equals("date"))
                    s.setDate(column, java.sql.Date.valueOf(values.get(++i)));
            }


            s.executeUpdate();

            return true;
        }
        catch (Exception e){
            return false;
        }
    }
}
