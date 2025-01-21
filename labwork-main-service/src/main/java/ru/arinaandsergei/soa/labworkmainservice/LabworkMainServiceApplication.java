package ru.arinaandsergei.soa.labworkmainservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "ru.arinaandsergei.soa.labworkmainservice.repository")
public class LabworkMainServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(LabworkMainServiceApplication.class, args);
    }
}

