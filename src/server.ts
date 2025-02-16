import express, { Request, Response } from 'express'
import { getAllEvents, getEventByCategory, getEventById, addEvent } from "./services/eventService";
import type { Event} from "./services/eventService";
import { getAllBooks, getBookByGroups, getBookById, addBook } from "./services/bookService";
import type { Book } from "./services/bookService";

const app = express()
app.use(express.json())
const port = 3000

app.get('/events', async (req: Request, res: Response) => {
  if (req.query.category) {
    const category = req.query.category as string
    const filteredEvents = getEventByCategory(category as string)
    res.json(filteredEvents)
  } else {
    res.json(await getAllEvents())
  }
})

app.get('/events/:id',async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const event = await getEventById(id)
  if (event) {
    res.json(event)
  } else {
    res.status(404).send('Event not found')
  }
})

app.post('/events',async (req: Request, res: Response) => {
  const newEvent: Event = req.body
  await addEvent(newEvent)
  res.json(newEvent)
})

app.get('/books', (req: Request, res: Response) => {
  if (req.query.group) {
    const group = req.query.group as string
    const filteredBooks = getBookByGroups(group as string)
    res.json(filteredBooks)
  } else {
    res.json(getAllBooks())
  }
})

app.get('/books/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const book = getBookById(id)
  if (book) {
    res.json(book)
  } else {
    res.status(404).send('Event not found')
  }
})

app.post('/books', (req: Request, res: Response) => {
  const newBook: Book = req.body
  addBook(newBook)
  res.json(newBook)
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
