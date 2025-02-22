import { PrismaClient } from '@prisma/client'
import type { Event } from '../models/event'

const prisma = new PrismaClient()

export function getEventByCategory(category: string): Promise<Event[]> {
  return prisma.event.findMany({
    where: { category },
  })
}

export function getAllEvents(): Promise<Event[]> {
  return prisma.event.findMany()
}

export function getEventById(id: number): Promise<Event | null> {
  return prisma.event.findUnique({
    where: { id },
    select: {
      title: true,
      time: true,
      organizerId: true,
    },
  })
}

export function addEvent(newEvent: Event): Promise<Event> {
  return prisma.event.create({
    data: {
      category: newEvent.category || '',
      title: newEvent.title || '',
      description: newEvent.description || '',
      location: newEvent.location || '',
      date: newEvent.date || '',
      time: newEvent.time || '',
      petsAllowed: newEvent.petsAllowed || false,
    },
  })
}

export function getAllEventsWithOrganizer(): Promise<Event[]> {
  return prisma.event.findMany({
    select: {
      id: true,
      category: true,
      organizer: {
        select: {
          name: true,
        },
      },
      participants: {
        select: {
          id: true,
          name: true,
          email: true,
          events: true,
        },
      },
    },
  });
}
