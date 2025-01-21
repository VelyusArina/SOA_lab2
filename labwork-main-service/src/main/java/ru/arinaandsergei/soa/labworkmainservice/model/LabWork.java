package ru.arinaandsergei.soa.labworkmainservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;

import java.time.ZonedDateTime;

@Getter
@Entity
@Table(name = "labwork")
public class LabWork {

    // Getters and Setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be empty")
    private String name;

    @NotNull(message = "Coordinates cannot be null")
    @Embedded
    private Coordinates coordinates;

    @NotNull(message = "Creation date cannot be null")
    private ZonedDateTime creationDate;

    @Positive(message = "Minimal point must be greater than 0")
    private double minimalPoint;

    @Size(max = 8818, message = "Description cannot be longer than 8818 characters")
    private String description;

    private Long tunedInWorks;

    @NotNull(message = "Difficulty cannot be null")
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @NotNull(message = "Discipline cannot be null")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "discipline_id")
    private Discipline discipline;

    public LabWork() {
        this.creationDate = ZonedDateTime.now();
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCoordinates(Coordinates coordinates) {
        this.coordinates = coordinates;
    }

    public void setCreationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public void setMinimalPoint(double minimalPoint) {
        this.minimalPoint = minimalPoint;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTunedInWorks(Long tunedInWorks) {
        this.tunedInWorks = tunedInWorks;
    }

    public void setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
    }

    public void setDiscipline(Discipline discipline) {
        this.discipline = discipline;
    }
}
