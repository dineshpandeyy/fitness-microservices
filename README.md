# Fitness App With Microservices

## Overview

This project is a microservices-based fitness application. It consists of several Spring Boot backend services, a React frontend, and uses Eureka for service discovery. The backend services communicate via REST and are designed for scalability and maintainability.

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │   API Gateway   │    │   Eureka Server │
│   (Port: 5173)  │◄──►│   (Port: 8080)  │◄──►│   (Port: 8761)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
        ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
        │  User Service │ │Activity Service│ │   AI Service  │
        │  (Port: 8081) │ │ (Port: 8082)  │ │ (Port: 8083)  │
        └───────────────┘ └───────────────┘ └───────────────┘
                │               │               │
        ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
        │  PostgreSQL   │ │   MongoDB     │ │   MongoDB     │
        └───────────────┘ └───────────────┘ └───────────────┘
```

## Development

### Backend Development
- **Language:** Java 17+
- **Framework:** Spring Boot 3.x
- **Build Tool:** Maven
- **Service Discovery:** Eureka
- **Configuration:** Spring Cloud Config
- **Message Queue:** RabbitMQ
- **Databases:** PostgreSQL, MongoDB

### Frontend Development
- **Framework:** React 18
- **Build Tool:** Vite
- **UI Library:** Material UI
- **State Management:** Redux Toolkit
- **Routing:** React Router
- **Authentication:** OAuth2 PKCE

### Key Features
- **Microservices Architecture** - Scalable and maintainable
- **API Gateway** - Centralized routing and authentication
- **OAuth2 Authentication** - Secure user authentication
- **Message Queuing** - Asynchronous communication between services
- **Modern UI** - React with Material UI components
- **Database Integration** - PostgreSQL and MongoDB
- **AI Integration** - Machine learning recommendations

## Services

### 1. Eureka Service Discovery (`eureka`)
- **Purpose:** Service registry for all microservices
- **Tech:** Spring Boot, Spring Cloud Netflix Eureka
- **Port:** 8761
- **URL:** http://localhost:8761

### 2. API Gateway (`gateway`)
- **Purpose:** Centralized routing and authentication for all microservices
- **Tech:** Spring Cloud Gateway, OAuth2 Resource Server, Eureka Client
- **Port:** 8080
- **Features:** JWT token validation, user synchronization, load balancing

### 3. User Service (`userservice`)
- **Purpose:** Manages user registration, authentication, and user data
- **Tech:** Spring Boot, Spring Data JPA, PostgreSQL, Eureka Client
- **Port:** 8081
- **Database:** PostgreSQL
- **Endpoints:** `/api/users`

### 4. Activity Service (`activityservice`)
- **Purpose:** Handles user activities (logging, retrieving, and tracking)
- **Tech:** Spring Boot, Spring Data MongoDB, Eureka Client, WebFlux
- **Port:** 8082
- **Database:** MongoDB
- **Endpoints:** `/api/activities`

### 5. AI Service (`aiservice`)
- **Purpose:** Provides AI-driven recommendations based on user activities
- **Tech:** Spring Boot, Spring Data MongoDB, Eureka Client, RabbitMQ
- **Port:** 8083
- **Database:** MongoDB
- **Message Queue:** RabbitMQ
- **Endpoints:** `/api/recommendations`

### 6. Config Server (`configserver`)
- **Purpose:** Centralized configuration management for all microservices
- **Tech:** Spring Cloud Config Server
- **Port:** 8888

### 7. Frontend (`fitness-app-frontend`)
- **Purpose:** User interface for interacting with the backend services
- **Tech:** React, Vite, Material UI, Redux Toolkit, React Router
- **Port:** 5173
- **Features:** OAuth2 authentication, activity tracking, modern UI

## Prerequisites

- **Java:** 17 or higher (Java 24 is set in the project, but Java 17+ is recommended for Spring Boot 3.x)
- **Node.js:** Latest LTS version (for the frontend)
- **Maven:** 3.6+ (for backend services)
- **PostgreSQL:** 12+ (for userservice)
- **MongoDB:** 4.4+ (for activityservice and aiservice)
- **RabbitMQ:** 3.8+ (for message queuing)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/dineshpandeyy/fitness-microservices.git
cd fitness
```

### 2. Start Config Server

```bash
cd configserver
./mvnw spring-boot:run
```

### 3. Start Eureka Service

```bash
cd ../eureka
./mvnw spring-boot:run
```
Visit [http://localhost:8761](http://localhost:8761) to see the Eureka dashboard.

### 4. Start User Service

- Ensure PostgreSQL is running and the database is created as per `userservice/src/main/resources/application.yml`
- Update credentials if needed

```bash
cd ../userservice
./mvnw spring-boot:run
```

### 5. Start Activity Service

- Ensure MongoDB is running and accessible as per `activityservice/src/main/resources/application.yml`

```bash
cd ../activityservice
./mvnw spring-boot:run
```

### 6. Start AI Service

- Ensure MongoDB is running and accessible as per `aiservice/src/main/resources/application.yml`
- Ensure RabbitMQ is running for message queuing

```bash
cd ../aiservice
./mvnw spring-boot:run
```

### 7. Start API Gateway

```bash
cd ../gateway
./mvnw spring-boot:run
```

### 8. Start the Frontend

```bash
cd ../fitness-app-frontend
npm install
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## API Endpoints

### User Service (`http://localhost:8081`)
- `GET /api/users/{userId}` - Get user profile
- `POST /api/users/register` - Register new user
- `GET /api/users/{userId}/validate` - Validate user exists

### Activity Service (`http://localhost:8082`)
- `GET /api/activities` - Get all activities
- `POST /api/activities` - Create new activity
- `GET /api/activities/{id}` - Get activity by ID
- `PUT /api/activities/{id}` - Update activity
- `DELETE /api/activities/{id}` - Delete activity

### AI Service (`http://localhost:8083`)
- `GET /api/recommendations` - Get AI recommendations
- `POST /api/recommendations` - Generate recommendations

### API Gateway (`http://localhost:8080`)
- Routes all requests to appropriate services
- Handles authentication and authorization
- Provides load balancing