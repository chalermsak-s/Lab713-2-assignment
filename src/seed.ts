import { createEvents } from './db/createEvents'
import { PrismaClient } from '@prisma/client'
import { createParticipants } from './db/createParticipants'

const prisma = new PrismaClient()
/*  Original */
createParticipants().catch((e) => {
  console.error(e)
  process.exit(1)
})

/* New */
// async () => {
//   await createEvents()
//   await createParticipants()
// }
