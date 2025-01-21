package ru.arinaandsergei.soa.labworkmainservice.service;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import ru.arinaandsergei.soa.labworkmainservice.DTO.GroupCountDTO;

import ru.arinaandsergei.soa.labworkmainservice.model.LabWork;
import ru.arinaandsergei.soa.labworkmainservice.repository.LabWorkRepository;



import java.util.List;


@Service
public class DopService {

    @Autowired
    private LabWorkRepository labWorkRepository;

    public LabWork maxTunedIn() {
        return labWorkRepository.findFirstByOrderByTunedInWorksAsc();
    }

    public Long getCountByMinimal(Double minimal) {
        return labWorkRepository.countByMinimalPointLessThan(minimal);
    }

    public List<GroupCountDTO> groupByDescription() {
        return labWorkRepository.countByDescriptionGroup();
    }



}
