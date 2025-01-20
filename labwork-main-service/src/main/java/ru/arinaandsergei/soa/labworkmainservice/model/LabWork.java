package ru.arinaandsergei.soa.labworkmainservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "labwork")
public class LabWork {

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

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Coordinates getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(Coordinates coordinates) {
        this.coordinates = coordinates;
    }

    public ZonedDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public double getMinimalPoint() {
        return minimalPoint;
    }

    public void setMinimalPoint(double minimalPoint) {
        this.minimalPoint = minimalPoint;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getTunedInWorks() {
        return tunedInWorks;
    }

    public void setTunedInWorks(Long tunedInWorks) {
        this.tunedInWorks = tunedInWorks;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
    }

    public Discipline getDiscipline() {
        return discipline;
    }

    public void setDiscipline(Discipline discipline) {
        this.discipline = discipline;
    }
}
