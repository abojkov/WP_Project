package com.finkisystem.service.Impl;

import com.finkisystem.model.Session;
import com.finkisystem.repository.SessionRepository;
import com.finkisystem.service.SessionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionServiceImpl implements SessionService {
    private final SessionRepository sessionRepository;

    public SessionServiceImpl(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    @Override
    public Session getSession(int id) {
        return this.sessionRepository.getSession(id);
    }

    @Override
    public List<Session> getAllSessions() {
        return this.sessionRepository.getAllSessions();
    }

    @Override
    public Session changeSessionInfo(Session session) {
        return this.sessionRepository.changeSessionInfo(session);
    }

    @Override
    public Session createSession(Session session) {
        return this.sessionRepository.createSession(session);
    }

    @Override
    public Session deleteSession(Integer id) {
        return this.sessionRepository.deleteSession(id);
    }
}
