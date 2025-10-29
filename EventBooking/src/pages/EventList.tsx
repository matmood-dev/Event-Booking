import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getEvents } from '../api/client'
import type { Event as EventType } from '../types'
import { FaMapMarkerAlt, FaTicketAlt, FaEye, FaPlus } from 'react-icons/fa'

export default function EventList() {
  const [events, setEvents] = useState<EventType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getEvents()
      .then((data) => setEvents(data))
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center py-8">Loading events…</div>
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Upcoming Events</h2>
        <Link to="/add-event" className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <FaPlus className="mr-2" />
          Add Event
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev) => (
          <div key={ev.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-32 flex items-center justify-center">
              <FaTicketAlt className="text-white text-4xl" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{ev.name}</h3>
              <div className="flex items-center text-gray-600 mb-3">
                <FaMapMarkerAlt className="mr-2" />
                <span>{ev.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <FaTicketAlt className="inline mr-1" />
                  Available: {ev.numberOfAvailableTickets}
                </div>
                <Link to={`/events/${ev.id}`} className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  <FaEye className="mr-2" />
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
