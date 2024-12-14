package com.client;

import com.client.entities.Client;
import com.client.repositories.ClientRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;


@EnableDiscoveryClient
@SpringBootApplication
public class ClientApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClientApplication.class, args);
	}


	@Bean
	CommandLineRunner initialiserBaseH2(ClientRepository clientRepository) {
		return args -> {
			clientRepository.save(new Client(null, "Rabab SELIMANI", 23f));
			clientRepository.save(new Client(null, "Amal RAMI", 22f));
			clientRepository.save(new Client(null, "Samir SAFTI", 22f));
		};
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}


}
