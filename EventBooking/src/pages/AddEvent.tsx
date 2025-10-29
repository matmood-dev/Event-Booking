import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddEventForm from '../components/AddEventForm'
import type { Event as EventType } from '../types'
import { FaPlus, FaCheckCircle } from 'react-icons/fa'

export default function AddEvent() {
  const navigate = useNavigate()
  const [message, setMessage] = useState<string | null>(null)

  function onEventCreated(event: EventType) {
    setMessage(`Event "${event.name}" created successfully!`)
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-green-500 to-teal-600 h-64 rounded-t-lg flex items-center justify-center">
        <FaPlus className="text-white text-6xl" />
      </div>
      <div className="bg-white p-8 rounded-b-lg shadow-lg">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Add New Event</h2>
        {message && (
          <div className="flex items-center p-4 mb-6 bg-green-100 text-green-800 rounded-lg">
            <FaCheckCircle className="mr-2" />
            {message}
          </div>
        )}
        <div className="bg-gray-50 p-6 rounded-lg">
          <AddEventForm onSuccess={onEventCreated} />
        </div>
      </div>
    </div>
  )
}