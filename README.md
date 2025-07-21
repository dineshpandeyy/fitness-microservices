# Fitness App Microservices Project

## Overview

This project is a microservices-based fitness application. It consists of several Spring Boot backend services, a React frontend, and uses Eureka for service discovery. The backend services communicate via REST and are designed for scalability and maintainability.

## Services

### 1. Eureka Service Discovery (`eureka`)
- **Purpose:** Service registry for all microservices.
- **Tech:** Spring Boot, Spring Cloud Netflix Eureka
- **Port:** 8761

### 2. User Service (`userservice`)
- **Purpose:** Manages user registration, authentication, and user data.
- **Tech:** Spring Boot, Spring Data JPA, PostgreSQL, Eureka Client
- **Port:** 8080

### 3. Activity Service (`activityservice`)
- **Purpose:** Handles user activities (logging, retrieving, and tracking).
- **Tech:** Spring Boot, Spring Data MongoDB, Eureka Client, WebFlux
- **Port:** 8082

### 4. AI Service (`aiservice`)
- **Purpose:** Provides AI-driven recommendations based on user activities.
- **Tech:** Spring Boot, Spring Data MongoDB, Eureka Client
- **Port:** 8083 (default, check your configuration)

### 5. Frontend (`fitness-app-frontend`)
- **Purpose:** User interface for interacting with the backend services.
- **Tech:** React, Vite, Material UI, Redux Toolkit, React Router

## Prerequisites

- Java 17 or higher (Java 24 is set in the project, but Java 17+ is recommended for Spring Boot 3.x)
- Node.js (for the frontend)
- Maven
- PostgreSQL (for userservice)
- MongoDB (for activityservice and aiservice)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/dineshpandeyy/fitness-microservices.git
cd fitness
```

### 2. Start Eureka Service

```bash
cd eureka
./mvnw spring-boot:run
```
Visit [http://localhost:8761](http://localhost:8761) to see the Eureka dashboard.

### 3. Start User Service

- Ensure PostgreSQL is running and the database is created as per `userservice/src/main/resources/application.yml`.
- Update credentials if needed.

```bash
cd ../userservice
./mvnw spring-boot:run
```

### 4. Start Activity Service

- Ensure MongoDB is running and accessible as per `activityservice/src/main/resources/application.yml`.

```bash
cd ../activityservice
./mvnw spring-boot:run
```

### 5. Start AI Service

- Ensure MongoDB is running and accessible as per `aiservice/src/main/resources/application.yml`.

```bash
cd ../aiservice
./mvnw spring-boot:run
```

### 6. Start the Frontend

```bash
cd ../fitness-app-frontend
npm install
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## API Endpoints

Each service exposes its own REST API. See the controller classes in each service for details.

- **User Service:** `/api/users`
- **Activity Service:** `/api/activities`
- **AI Service:** `/api/recommendations`


## Development

- Backend: Java, Spring Boot, Maven
- Frontend: React, Vite, Material UI, Redux Toolkit
