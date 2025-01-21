package main.DTO;

import lombok.*;
import main.model.Coordinates;
import main.model.Difficulty;
import main.model.Discipline;



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
