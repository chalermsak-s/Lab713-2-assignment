import { PrismaClient } from '@prisma/client';
import type { Event } from '../models/event';

const prisma = new PrismaClient();

export function getEventByCategory(category: string): Promise<Event[]> {
  return prisma.event.findMany({
    where: { category },
  });
}

export function getAllEvents(): Promise<Event[]> {
  return prisma.event.findMany();
}

export function getEventById(id: number): Promise<Event | null> {
  return prisma.event.findUnique({
    where: { id },
  });
}

export function addEvent(newEvent: Event): Promise<Event> {
  return prisma.event.create({
    data: {
      category: newEvent.category,
      title: newEvent.title,
      description: newEvent.description,
      location: newEvent.location,
      date: newEvent.date,
      time: newEvent.time,
      petsAllowed: newEvent.petsAllowed,
      organizer: {
        connect: newEvent.organizer ? { id: newEvent.organizer.id } : undefined,
      },
    },
  });
}

export function getAllEventsWithOrganizer(): Promise<Event[]> {
  return prisma.event.findMany({
    include: { organizer: true },
  });
}
