import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import EventList from './pages/EventList'
import EventDetail from './pages/EventDetail'
import AddEvent from './pages/AddEvent'
import './App.css'
import { FaCalendarAlt, FaPlus } from 'react-icons/fa'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-6 py-8">
          <header className="mb-8">
            <nav className="flex items-center justify-between bg-white shadow-lg rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <FaCalendarAlt className="text-indigo-600 text-2xl" />
                <h1 className="text-3xl font-bold text-gray-800">Event Booking</h1>
              </div>
              <div>
                              <div className="flex space-x-4">
                <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                  Events
                </Link>
                <Link to="/add-event" className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                  <FaPlus className="mr-1" />
                  Add Event
                </Link>
              </div>
              </div>
            </nav>
          </header>

          <main className="bg-white shadow-lg rounded-lg p-6">
            <Routes>
              <Route path="/" element={<EventList />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/add-event" element={<AddEvent />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}
