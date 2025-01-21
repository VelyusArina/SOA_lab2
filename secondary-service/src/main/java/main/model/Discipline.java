package main.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
public class Discipline {

    @Id
    private Integer id;

    private String name; // Строка не может быть пустой

    @NotNull(message = "LabsCount cannot be null")
    private Integer labsCount; // Поле не может быть null

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

    public Integer getLabsCount() {
        return labsCount;
    }

    public void setLabsCount(Integer labsCount) {
        this.labsCount = labsCount;
    }
}
