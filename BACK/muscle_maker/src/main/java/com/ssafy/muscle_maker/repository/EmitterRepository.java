package com.ssafy.muscle_maker.repository;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class EmitterRepository {
    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    public SseEmitter save(String emitterId, SseEmitter sseEmitter) {
        emitters.put(emitterId, sseEmitter);
        return sseEmitter;
    }

    public SseEmitter findByEmitterId(String emitterId){
        return emitters.get(emitterId);
    }

    public void deleteByEmitterId(String emitterId) {
        emitters.remove(emitterId);
    }
}
