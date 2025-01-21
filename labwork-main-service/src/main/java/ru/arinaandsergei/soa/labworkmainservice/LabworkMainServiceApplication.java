package ru.arinaandsergei.soa.labworkmainservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "ru.arinaandsergei.soa.labworkmainservice.repository")
public class LabworkMainServiceApplication {

    public static void main(String[] args) {
        System.setProperty("javax.net.ssl.trustStore", "./first.truststore");
        System.setProperty("javax.net.ssl.trustStorePassword", "secret");
        System.setProperty("jsse.enableSNIExtension", "false");
        SpringApplication.run(LabworkMainServiceApplication.class, args);
    }
}

