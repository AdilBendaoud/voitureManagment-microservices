package com.voitureservice.services;

import com.voitureservice.clients.ClientService;
import com.voitureservice.entities.Voiture;
import com.voitureservice.repositories.VoitureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoitureService {

    @Autowired
    private VoitureRepository voitureRepository;

    @Autowired
    private ClientService clientService;

    // Save a voiture
    public Voiture saveVoiture(Voiture voiture) {
        return voitureRepository.save(voiture);
    }

    // Find all voitures
    public List<Voiture> findAllVoitures() {
        List<Voiture> voitures = voitureRepository.findAll();
        for (Voiture voiture : voitures) {
            voiture.setClient(clientService.findClientById(voiture.getIdClient()));
        }
        return voitures;
    }
    // Find a voiture by ID
    public Voiture findVoitureById(Long id) {
        return voitureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voiture introuvable"));
    }

    // Find voitures by client ID
    public List<Voiture> findVoituresByClientId(Long clientId) {
        return voitureRepository.findByIdClient(clientId);
    }
    public void deleteVoiture(Long id) {
        Voiture voiture = voitureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voiture introuvable"));
        voitureRepository.delete(voiture);
    }

}
