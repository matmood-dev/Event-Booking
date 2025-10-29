import { useState } from 'react'
import { createEvent } from '../api/client'
import type { Event as EventType } from '../types'

export default function AddEventForm({ onSuccess }: { onSuccess?: (event: EventType) => void }) {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [numberOfAvailableTickets, setNumberOfAvailableTickets] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const payload = {
        name,
        location,
        numberOfAvailableTickets: parseInt(numberOfAvailableTickets, 10),
      }
      const saved = await createEvent(payload)
      setName('')
      setLocation('')
      setNumberOfAvailableTickets('')
      onSuccess?.(saved)
    } catch (err: unknown) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
          placeholder="Enter event name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
          placeholder="Enter event location"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Available Tickets</label>
        <input
          type="number"
          value={numberOfAvailableTickets}
          onChange={(e) => setNumberOfAvailableTickets(e.target.value)}
          required
          min="1"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
          placeholder="Enter number of tickets"
        />
      </div>
      {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? 'Creating Event…' : 'Create Event'}
        </button>
      </div>
    </form>
  )
}