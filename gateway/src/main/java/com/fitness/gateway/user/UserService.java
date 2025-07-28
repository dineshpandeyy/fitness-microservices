package com.fitness.gateway.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class UserService {
    public final WebClient userServiveWebClient;

    public boolean validateUserName(String userId) {
        try {
            return Boolean.TRUE.equals(userServiveWebClient.get()
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
        return userServiveWebClient.get()
                .uri("api/users/{userId}/validate", userId)
                .retrieve()
                .bodyToMono(Boolean.class)
                .onErrorReturn(false);
    }

    public Mono<Void> registerUser(RegisterRequest registerRequest) {
        return userServiveWebClient.post()
                .uri("api/users/register")
                .bodyValue(registerRequest)
                .retrieve()
                .bodyToMono(Void.class);
    }
}
