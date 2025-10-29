import type { Event as EventType, Booking } from '../types'

const BASE = 'http://localhost:8080/api'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  return (await res.json()) as T
}

export function getEvents(): Promise<EventType[]> {
  return request<EventType[]>('/events')
}

export function getEvent(id: number): Promise<EventType> {
  return request<EventType>(`/events/${id}`)
}

export function createBooking(payload: Booking): Promise<Booking> {
  return request<Booking>('/bookings', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function createEvent(payload: Omit<EventType, 'id'>): Promise<EventType> {
  return request<EventType>('/events', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function getBookings(): Promise<Booking[]> {
  return request<Booking[]>('/bookings')
}

export function getBookingsByEvent(eventId: number): Promise<Booking[]> {
  return request<Booking[]>(`/bookings/event/${eventId}`)
}
