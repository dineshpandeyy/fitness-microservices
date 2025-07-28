package com.fitness.gateway.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

@Service
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    
    @Autowired
    public WebClient userServiceWebClient;

    public boolean validateUserName(String userId) {
        try {
            return Boolean.TRUE.equals(userServiceWebClient.get()
                    .uri("api/users/{userId}/validate", userId)
                    .retrieve()
                    .bodyToMono(Boolean.class)
                    .block());

        } catch (WebClientResponseException e) {
            if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                throw new RuntimeException("User not found");
            }
        }
        return false;
    }

    public Mono<Boolean> validateUser(String userId) {
        return userServiceWebClient.get()
                .uri("api/users/{userId}/validate", userId)
                .retrieve()
                .bodyToMono(Boolean.class)
                .onErrorReturn(false);
    }

    public Mono<Void> registerUser(RegisterRequest registerRequest) {
        return userServiceWebClient.post()
                .uri("api/users/register")
                .bodyValue(registerRequest)
                .retrieve()
                .bodyToMono(Void.class);
    }
}
