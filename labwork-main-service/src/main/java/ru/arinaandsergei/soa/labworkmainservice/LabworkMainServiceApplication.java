package ru.arinaandsergei.soa.labworkmainservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "ru.arinaandsergei.soa.labworkmainservice.repository")
public class LabworkMainServiceApplication {

    public static void main(String[] args) {
        System.setProperty("javax.net.ssl.trustStore", "./first.truststore");
        System.setProperty("javax.net.ssl.trustStorePassword", "secret");
        System.setProperty("jsse.enableSNIExtension", "false");
        SpringApplication.run(LabworkMainServiceApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*");
            }
        };
    }
}

