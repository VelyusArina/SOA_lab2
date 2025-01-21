package main.DTO;

import lombok.*;
import main.model.Coordinates;
import main.model.Difficulty;
import main.model.Discipline;



@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LabworkDTO {
    private String name;
    private Coordinates coordinates;
    private double minimalPoint;
    private String description;
    private Long tunedInWorks;
    private Difficulty difficulty;
    private Discipline discipline;
}
