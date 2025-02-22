import { createEvents } from './db/createEvents'
import { PrismaClient } from '@prisma/client'
import { createParticipants } from './db/createParticipants'

const prisma = new PrismaClient()
createParticipants().catch((e) => {
  console.error(e)
  process.exit(1)
})
