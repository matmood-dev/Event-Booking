package com.example.ticketbooking.controller;

import com.example.ticketbooking.model.Booking;
import com.example.ticketbooking.model.Event;
import com.example.ticketbooking.repository.BookingRepository;
import com.example.ticketbooking.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private EventRepository eventRepository;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        Event event = eventRepository.findById(booking.getEvent().getId()).orElse(null);
        if (event == null) {
            return ResponseEntity.badRequest().body("Event not found");
        }
        if (event.getNumberOfAvailableTickets() >= 1) {
            event.setNumberOfAvailableTickets(event.getNumberOfAvailableTickets() - 1);
            eventRepository.save(event);
            booking.setEvent(event);
            return ResponseEntity.ok(bookingRepository.save(booking));
        } else {
            return ResponseEntity.badRequest().body("Tickets are sold out");
        }
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAllWithEvent();
    }

    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) {
        return bookingRepository.findByIdWithEvent(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Booking updateBooking(@PathVariable Long id, @RequestBody Booking bookingDetails) {
        Booking booking = bookingRepository.findById(id).orElse(null);
        if (booking != null) {
            booking.setName(bookingDetails.getName());
            booking.setEvent(bookingDetails.getEvent());
            return bookingRepository.save(booking);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingRepository.deleteById(id);
    }
}
