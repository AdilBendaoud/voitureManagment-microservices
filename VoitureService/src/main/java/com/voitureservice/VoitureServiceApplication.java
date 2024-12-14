	package com.voitureservice;

	import com.voitureservice.clients.ClientService;
	import com.voitureservice.entities.Client;
	import com.voitureservice.entities.Voiture;
	import com.voitureservice.repositories.VoitureRepository;
	import org.springframework.boot.CommandLineRunner;
	import org.springframework.boot.SpringApplication;
	import org.springframework.boot.autoconfigure.SpringBootApplication;
	import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
	import org.springframework.cloud.openfeign.EnableFeignClients;
	import org.springframework.context.annotation.Bean;

	@SpringBootApplication
	@EnableDiscoveryClient
	@EnableFeignClients
	public class VoitureServiceApplication {
		public static void main(String[] args) {
			SpringApplication.run(VoitureServiceApplication.class, args);
		}

		@Bean
		CommandLineRunner initDatabase(VoitureRepository voitureRepository, ClientService clientService) {
			return args -> {
				Client client1 = clientService.findClientById(1L);
				Client client2 = clientService.findClientById(2L);
				voitureRepository.save(new Voiture(null, "Toyota", "Corolla", "SDKLJ28", client1.getId(), client1));
				voitureRepository.save(new Voiture(null, "Renault", "Clio", "KLDJSFO0932", client1.getId(), client1));
				voitureRepository.save(new Voiture(null, "Auto", "Moto", "LKJDS908", client2.getId(), client2));
			};
		}

	}
