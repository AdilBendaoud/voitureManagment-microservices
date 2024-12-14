package com.voitureservice.controllers;

import com.voitureservice.clients.ClientService;
import com.voitureservice.entities.Client;
import com.voitureservice.entities.Voiture;
import com.voitureservice.services.VoitureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/voitures")
public class VoitureController {

    @Autowired
    private VoitureService voitureService;

    @Autowired
    private ClientService clientService;

    @GetMapping
    public ResponseEntity<List<Voiture>> findAllVoitures() {
        try {
            List<Voiture> voitures = voitureService.findAllVoitures();
            return ResponseEntity.ok(voitures);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Voiture> findVoitureById(@PathVariable Long id) {
        try {
            Voiture voiture = voitureService.findVoitureById(id);
            voiture.setClient(clientService.findClientById(voiture.getIdClient()));
            return ResponseEntity.ok(voiture);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // New endpoint to get cars for a specific client
    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Voiture>> findVoituresByClientId(@PathVariable Long clientId) {
        try {
            List<Voiture> voitures = voitureService.findVoituresByClientId(clientId);
            for (Voiture voiture : voitures) {
                voiture.setClient(clientService.findClientById(voiture.getIdClient()));
            }
            return ResponseEntity.ok(voitures);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/{clientId}")
    public ResponseEntity<Voiture> saveVoiture(@PathVariable Long clientId, @RequestBody Voiture voiture) {
        try {
            // Vérifie si le client existe via le service Feign
            Client client = clientService.findClientById(clientId);
            if (client != null) {
                voiture.setIdClient(clientId);
                voiture.setClient(client);
                Voiture savedVoiture = voitureService.saveVoiture(voiture);
                return ResponseEntity.ok(savedVoiture);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVoiture(@PathVariable Long id) {
        try {
            voitureService.deleteVoiture(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


}
