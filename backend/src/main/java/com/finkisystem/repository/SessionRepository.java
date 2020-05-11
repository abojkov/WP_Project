package com.finkisystem.repository;

import com.finkisystem.model.Session;

import java.util.List;

public interface SessionRepository {
    Session getSession(int id);
    List<Session> getAllSessions();
    Session changeSessionInfo(Session session);
    Session createSession(Session session);
    Session deleteSession(Integer id);
}
