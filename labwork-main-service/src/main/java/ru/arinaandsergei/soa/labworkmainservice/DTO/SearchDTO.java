package ru.arinaandsergei.soa.labworkmainservice.DTO;

import lombok.*;
import ru.arinaandsergei.soa.labworkmainservice.model.Coordinates;
import ru.arinaandsergei.soa.labworkmainservice.model.Difficulty;
import ru.arinaandsergei.soa.labworkmainservice.model.Discipline;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SearchDTO {
    private String sort;
    private String filter;
    private Integer page;
    private Integer size;
}
