import type { Event } from './event'
export type organizer = {
  id: number
  name: string
  events?: Event[] | null;
}