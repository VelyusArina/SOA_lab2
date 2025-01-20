package ru.arinaandsergei.soa.labworkmainservice.model;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;

@Embeddable
public class Coordinates {
    private double x;

    @NotNull(message = "Y cannot be null")
    private Long y; // Поле не может быть null

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public Long getY() {
        return y;
    }

    public void setY(Long y) {
        this.y = y;
    }
}
