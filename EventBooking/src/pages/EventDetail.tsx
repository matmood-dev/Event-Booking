import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getEvent, getBookingsByEvent } from '../api/client'
import BookingForm from '../components/BookingForm'
import type { Event as EventType, Booking } from '../types'
import { FaMapMarkerAlt, FaTicketAlt, FaCheckCircle, FaUser } from 'react-icons/fa'

export default function EventDetail() {
  const { id } = useParams()
  const [event, setEvent] = useState<EventType | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    Promise.all([
      getEvent(Number(id)),
      getBookingsByEvent(Number(id))
    ])
      .then(([eventData, bookingsData]) => {
        setEvent(eventData)
        setBookings(bookingsData)
      })
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="text-center py-8">Loading…</div>
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>
  if (!event) return <div className="text-center py-8">Event not found</div>

  function onBooked() {
    setMessage('Booking successful — thank you!')
    // refresh event and bookings to update available tickets and show new booking
    if (id) {
      Promise.all([
        getEvent(Number(id)),
        getBookingsByEvent(Number(id))
      ])
        .then(([eventData, bookingsData]) => {
          setEvent(eventData)
          setBookings(bookingsData)
        })
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-64 rounded-t-lg flex items-center justify-center">
        <FaTicketAlt className="text-white text-6xl" />
      </div>
      <div className="bg-white p-8 rounded-b-lg shadow-lg">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">{event.name}</h2>
        <div className="flex items-center text-gray-600 mb-6">
          <FaMapMarkerAlt className="mr-2" />
          <span className="text-lg">{event.location}</span>
        </div>
        <div className="flex items-center mb-6">
          <FaTicketAlt className="mr-2 text-indigo-600" />
          <span className="text-lg font-medium">Available tickets: {event.numberOfAvailableTickets}</span>
        </div>
        {message && (
          <div className="flex items-center p-4 mb-6 bg-green-100 text-green-800 rounded-lg">
            <FaCheckCircle className="mr-2" />
            {message}
          </div>
        )}
        {event.numberOfAvailableTickets > 0 ? (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Book Your Ticket</h3>
            <BookingForm eventId={event.id} onSuccess={onBooked} />
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-red-600 text-xl font-semibold">Sold Out</div>
            <p className="text-gray-500 mt-2">This event is fully booked. Check back later for more events!</p>
          </div>
        )}

        {bookings.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Current Bookings ({bookings.length})</h3>
            <div className="space-y-3">
              {bookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <FaUser className="text-indigo-600 mr-3" />
                    <span className="font-medium text-gray-800">{booking.name}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Booking #{booking.id}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
