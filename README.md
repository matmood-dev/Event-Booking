# 🎫 Event Booking System

A modern, full-stack web application for managing event bookings with a beautiful React frontend and robust Spring Boot backend.

![Event Booking App](https://img.shields.io/badge/React-19.1.1-blue) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.7.5-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.3-blue)

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [API Documentation](#api-documentation)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🎪 Event Management
- **Create Events**: Add new events with name, location, and ticket capacity
- **View Events**: Browse all available events in a modern card-based layout
- **Event Details**: Detailed view of each event with booking information

### 🎫 Booking System
- **Book Tickets**: Secure ticket booking with real-time availability updates
- **Booking History**: View all bookings for each event
- **Automatic Updates**: Ticket counts update immediately after bookings

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Beautiful Interface**: Modern design with gradients, shadows, and smooth animations
- **Intuitive Navigation**: Easy-to-use interface with clear call-to-actions
- **Real-time Feedback**: Instant success/error messages for all actions

### 🔧 Technical Features
- **RESTful API**: Well-structured REST endpoints
- **CORS Support**: Cross-origin resource sharing enabled
- **Type Safety**: Full TypeScript support on frontend
- **Database Persistence**: SQLite database with JPA/Hibernate
- **Error Handling**: Comprehensive error handling and validation

## 🛠 Technology Stack

### Frontend
- **React 19.1.1** - Modern React with hooks and concurrent features
- **TypeScript 5.9.3** - Type-safe JavaScript
- **Vite 7.1.7** - Fast build tool and dev server
- **Tailwind CSS 3.4.3** - Utility-first CSS framework
- **React Router 6.14.1** - Client-side routing
- **React Icons 5.5.0** - Beautiful icon library
- **ESLint** - Code linting and formatting

### Backend
- **Spring Boot 2.7.5** - Production-ready Spring framework
- **Spring Web** - REST API development
- **Spring Data JPA** - Database access layer
- **Hibernate** - ORM framework
- **SQLite 3.39.3.0** - Lightweight database
- **Maven** - Dependency management and build tool

### Development Tools
- **Java 17** - Runtime environment
- **Node.js** - JavaScript runtime
- **Git** - Version control

## 🏗 Architecture

```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐
│   React App     │◄──────────────► │  Spring Boot    │
│   (Port 5173)   │                 │   (Port 8080)   │
│                 │                 │                 │
│ • EventList     │                 │ • EventController│
│ • EventDetail   │                 │ • BookingController│
│ • AddEvent      │                 │ • CORS Config    │
│ • BookingForm   │                 │                 │
└─────────────────┘                 └─────────────────┘
         │                                   │
         └───────────────────────────────────┼─────────────────┐
                                             │                 │
                                   ┌─────────▼─────────┐       │
                                   │   SQLite Database │◄──────┘
                                   │                   │
                                   │ • events         │
                                   │ • bookings       │
                                   └─────────────────┘
```

### Component Structure
```
src/
├── components/
│   ├── AddEventForm.tsx     # Event creation form
│   └── BookingForm.tsx      # Ticket booking form
├── pages/
│   ├── EventList.tsx        # Events overview page
│   ├── EventDetail.tsx      # Individual event page
│   └── AddEvent.tsx         # Add new event page
├── api/
│   └── client.ts            # API client functions
├── types.ts                 # TypeScript type definitions
└── App.tsx                  # Main application component
```

## 📚 API Documentation

### Events Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/events` | Get all events |
| `GET` | `/api/events/{id}` | Get event by ID |
| `POST` | `/api/events` | Create new event |
| `PUT` | `/api/events/{id}` | Update event |
| `DELETE` | `/api/events/{id}` | Delete event |

### Bookings Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/bookings` | Get all bookings |
| `GET` | `/api/bookings/{id}` | Get booking by ID |
| `GET` | `/api/bookings/event/{eventId}` | Get bookings for specific event |
| `POST` | `/api/bookings` | Create new booking |
| `PUT` | `/api/bookings/{id}` | Update booking |
| `DELETE` | `/api/bookings/{id}` | Delete booking |

### Request/Response Examples

#### Create Event
```bash
POST /api/events
Content-Type: application/json

{
  "name": "Rock Concert",
  "location": "Madison Square Garden",
  "numberOfAvailableTickets": 1000
}
```

#### Create Booking
```bash
POST /api/bookings
Content-Type: application/json

{
  "name": "John Doe",
  "event": { "id": 1 }
}
```

## 📋 Prerequisites

- **Java 17** or higher
- **Node.js 18** or higher
- **Maven 3.6** or higher
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/matmood-dev/Event-Booking.git
cd Event-Booking
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd demo

# Install dependencies and run
./mvnw clean install
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup
```bash
# Navigate to frontend directory (in new terminal)
cd EventBooking

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

### 4. Verify Installation
- Backend: Visit `http://localhost:8080/api/events` to see events API
- Frontend: Visit `http://localhost:5173` to see the application

## 🎯 Usage

### For Event Organizers
1. **Add Events**: Click "Add Event" to create new events
2. **Manage Events**: View all events on the homepage
3. **Track Bookings**: See booking details for each event

### For Attendees
1. **Browse Events**: View available events with ticket counts
2. **Book Tickets**: Fill out the booking form with your name
3. **View Details**: See event information and current bookings

### Key Features in Action
- **Real-time Updates**: Ticket counts update immediately after bookings
- **Responsive Design**: Works on all device sizes
- **Error Handling**: Clear feedback for all actions
- **Modern UI**: Beautiful, intuitive interface

## 🗄 Database Schema

### Events Table
```sql
CREATE TABLE events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    number_of_available_tickets INTEGER NOT NULL
);
```

### Bookings Table
```sql
CREATE TABLE bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    event_id INTEGER NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(id)
);
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed
- Ensure code passes linting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing React framework
- **Spring Team** for Spring Boot
- **Tailwind CSS** for the utility-first CSS framework
- **SQLite** for the lightweight database solution

## 📞 Support

If you have any questions or need help:

- Open an issue on GitHub
- Check the documentation
- Review the code comments

---

**Happy Event Booking! 🎪🎫**