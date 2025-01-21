package ru.arinaandsergei.soa.labworkmainservice.DTO;

import lombok.*;
import ru.arinaandsergei.soa.labworkmainservice.model.Coordinates;
import ru.arinaandsergei.soa.labworkmainservice.model.Difficulty;
import ru.arinaandsergei.soa.labworkmainservice.model.Discipline;



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
