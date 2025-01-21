package ru.arinaandsergei.soa.labworkmainservice.DTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GroupCountDTO {
    private String value;
    private Long count;
}
