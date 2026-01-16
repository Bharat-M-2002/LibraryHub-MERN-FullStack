package com.library.backend.config;

import jakarta.annotation.PostConstruct;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class ProfileDebugger {

    private final Environment environment;

    public ProfileDebugger(Environment environment) {
        this.environment = environment;
    }

    @PostConstruct
    public void printProfiles() {
        System.out.println("Active Spring Profiles:");
        for (String profile : environment.getActiveProfiles()) {
            System.out.println(" - " + profile);
        }
    }
}
