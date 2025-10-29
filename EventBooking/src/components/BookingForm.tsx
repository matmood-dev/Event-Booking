import { useState } from 'react'
import { createBooking } from '../api/client'

export default function BookingForm({ eventId, onSuccess }: { eventId: number; onSuccess?: () => void }) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const payload = { name, event: { id: eventId } }
      await createBooking(payload)
      setName('')
      onSuccess?.()
    } catch (err: unknown) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors" 
          placeholder="Enter your full name"
        />
      </div>
      {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
      <div>
        <button 
          type="submit" 
          disabled={loading} 
          className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? 'Booking…' : 'Book Ticket'}
        </button>
      </div>
    </form>
  )
}
