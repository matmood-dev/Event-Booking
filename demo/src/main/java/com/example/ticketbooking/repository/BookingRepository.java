package com.example.ticketbooking.repository;

import com.example.ticketbooking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query("SELECT b FROM Booking b JOIN FETCH b.event")
    List<Booking> findAllWithEvent();

    @Query("SELECT b FROM Booking b JOIN FETCH b.event WHERE b.id = :id")
    Optional<Booking> findByIdWithEvent(@Param("id") Long id);

    @Query("SELECT b FROM Booking b JOIN FETCH b.event WHERE b.event.id = :eventId")
    List<Booking> findByEventId(@Param("eventId") Long eventId);
}
