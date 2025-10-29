# Ticket Booking API Documentation

## Introduction

This API provides a simple and efficient way to manage events and book tickets. You can create, retrieve, update, and delete events, as well as book tickets for those events. The API is built with Spring Boot and uses a SQLite database.

## Base URL

All API endpoints are relative to the following base URL:

`http://localhost:8080`

## Authentication

The API does not require authentication.

---

## Events API

The Events API allows you to manage the events available for booking.

### 1. Get All Events

*   **Endpoint:** `GET /api/events`
*   **Description:** Retrieves a list of all available events.
*   **Successful Response (200 OK):**

```json
[
    {
        "id": 1,
        "name": "Live Concert",
        "location": "Central Park",
        "numberOfAvailableTickets": 99
    },
    {
        "id": 2,
        "name": "Tech Conference",
        "location": "Convention Center",
        "numberOfAvailableTickets": 250
    }
]
```

### 2. Get a Single Event by ID

*   **Endpoint:** `GET /api/events/{id}`
*   **Description:** Retrieves a single event by its unique ID.
*   **Successful Response (200 OK):**

```json
{
    "id": 1,
    "name": "Live Concert",
    "location": "Central Park",
    "numberOfAvailableTickets": 99
}
```

### 3. Create a New Event

*   **Endpoint:** `POST /api/events`
*   **Description:** Creates a new event.
*   **Request Body:**

```json
{
    "name": "Art Exhibition",
    "location": "City Art Gallery",
    "numberOfAvailableTickets": 50
}
```

*   **Successful Response (200 OK):**

```json
{
    "id": 3,
    "name": "Art Exhibition",
    "location": "City Art Gallery",
    "numberOfAvailableTickets": 50
}
```

### 4. Update an Event

*   **Endpoint:** `PUT /api/events/{id}`
*   **Description:** Updates the details of an existing event.
*   **Request Body:**

```json
{
    "name": "Updated Art Exhibition",
    "location": "Downtown Art Gallery",
    "numberOfAvailableTickets": 45
}
```

*   **Successful Response (200 OK):**

```json
{
    "id": 3,
    "name": "Updated Art Exhibition",
    "location": "Downtown Art Gallery",
    "numberOfAvailableTickets": 45
}
```

### 5. Delete an Event

*   **Endpoint:** `DELETE /api/events/{id}`
*   **Description:** Deletes an event by its unique ID.
*   **Successful Response:** `200 OK` with an empty body.

---

## Bookings API

The Bookings API allows you to book tickets for events and manage your bookings.

### 1. Get All Bookings

*   **Endpoint:** `GET /api/bookings`
*   **Description:** Retrieves a list of all bookings. The response for each booking includes the full details of the associated event.
*   **Successful Response (200 OK):**

```json
[
    {
        "id": 1,
        "name": "John Doe",
        "event": {
            "id": 1,
            "name": "Live Concert",
            "location": "Central Park",
            "numberOfAvailableTickets": 99
        }
    }
]
```

### 2. Get a Single Booking by ID

*   **Endpoint:** `GET /api/bookings/{id}`
*   **Description:** Retrieves a single booking by its unique ID, including the full details of the associated event.
*   **Successful Response (200 OK):**

```json
{
    "id": 1,
    "name": "John Doe",
    "event": {
        "id": 1,
        "name": "Live Concert",
        "location": "Central Park",
        "numberOfAvailableTickets": 99
    }
}
```

### 3. Create a New Booking

*   **Endpoint:** `POST /api/bookings`
*   **Description:** Creates a new booking for a specific event. If successful, the number of available tickets for the event is automatically decremented.
*   **Request Body:**

```json
{
    "name": "Jane Smith",
    "eventId": 1
}
```

*   **Successful Response (200 OK):**

```json
{
    "id": 2,
    "name": "Jane Smith",
    "event": {
        "id": 1,
        "name": "Live Concert",
        "location": "Central Park",
        "numberOfAvailableTickets": 98
    }
}
```

*   **Error Response (400 Bad Request):** If no tickets are available for the event.

```
"Tickets are sold out"
```

### 4. Update a Booking

*   **Endpoint:** `PUT /api/bookings/{id}`
*   **Description:** Updates the details of an existing booking.
*   **Request Body:**

```json
{
    "name": "Jane S. Updated",
    "eventId": 1
}
```

*   **Successful Response (200 OK):**

```json
{
    "id": 2,
    "name": "Jane S. Updated",
    "event": {
        "id": 1,
        "name": "Live Concert",
        "location": "Central Park",
        "numberOfAvailableTickets": 98
    }
}
```

### 5. Delete a Booking

*   **Endpoint:** `DELETE /api/bookings/{id}`
*   **Description:** Deletes a booking by its unique ID. Note: This does not automatically increment the number of available tickets for the event.
*   **Successful Response:** `200 OK` with an empty body.

---

## Error Handling

The API returns standard HTTP error codes to indicate the status of a request. In case of an error, the response body may contain a message with more details.

*   `400 Bad Request`: The request was malformed (e.g., invalid JSON, missing required fields).
*   `404 Not Found`: The requested resource (e.g., an event or booking with a specific ID) could not be found.
*   `500 Internal Server Error`: An unexpected error occurred on the server.
