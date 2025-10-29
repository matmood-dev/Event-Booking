export interface Event {
  id: number;
  name: string;
  location?: string;
  numberOfAvailableTickets: number;
}

export interface Booking {
  id?: number;
  name: string;
  event?: Event | { id: number };
}
