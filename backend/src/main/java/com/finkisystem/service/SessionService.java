package com.finkisystem.service;

import com.finkisystem.model.Session;

import java.util.List;

public interface SessionService {
    Session getSession(int id);
    List<Session> getAllSessions();
    Session changeSessionInfo(Session session);
    Session createSession(Session session);
    Session deleteSession(Integer id);
}
