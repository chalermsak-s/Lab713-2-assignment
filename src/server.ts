import express, { Request, Response } from 'express'
import { getAllEvents, getEventByCategory, getEventById, addEvent } from "./services/eventService";
import type { Event} from "./services/eventService";

const app = express()
app.use(express.json())
const port = 3000

interface Book {
  id: number
  title: string
  author_name: string
  description: string
  groups: string[]
}
const books: Book[] = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author_name: 'F. Scott Fitzgerald',
    description: 'A novel set in the Jazz Age',
    groups: ['Fiction', 'Classic'],
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author_name: 'Harper Lee',
    description: 'A novel about racial injustice',
    groups: ['Fiction', 'Classic'],
  },
  {
    id: 3,
    title: '1984',
    author_name: 'George Orwell',
    description: 'A dystopian novel',
    groups: ['Fiction', 'Dystopian'],
  },
  {
    id: 4,
    title: 'The Catcher in the Rye',
    author_name: 'J.D. Salinger',
    description: 'A novel about teenage rebellion',
    groups: ['Fiction', 'Classic'],
  },
  {
    id: 5,
    title: 'Moby-Dick',
    author_name: 'Herman Melville',
    description: "A novel about a sea captain's obsession",
    groups: ['Fiction', 'Adventure'],
  },
  {
    id: 6,
    title: 'Pride and Prejudice',
    author_name: 'Jane Austen',
    description: 'A novel about manners and marriage',
    groups: ['Fiction', 'Romance'],
  },
]

function getBookByGroups(groups: string): Book[] {
  const filteredBooks = books.filter((book) => book.groups.includes(groups))
  return filteredBooks
}

function getAllBooks(): Book[] {
  return books
}

function getBookById(id: number): Book | undefined {
  return books.find((book) => book.id === id)
}

function addBook(newBook: Book): Book {
  newBook.id = books.length + 1
  books.push(newBook)
  return newBook
}

app.get('/events', (req: Request, res: Response) => {
  if (req.query.category) {
    const category = req.query.category as string
    const filteredEvents = getEventByCategory(category as string)
    res.json(filteredEvents)
  } else {
    res.json(getAllEvents())
  }
})

app.get('/events/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const event = getEventById(id)
  if (event) {
    res.json(event)
  } else {
    res.status(404).send('Event not found')
  }
})

app.post('/events', (req, res) => {
  const newEvent: Event = req.body
  addEvent(newEvent)
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

app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const book = getBookById(id)
  if (book) {
    res.json(book)
  } else {
    res.status(404).send('Event not found')
  }
})

app.post('/books', (req, res) => {
  const newBook: Book = req.body
  addBook(newBook)
  res.json(newBook)
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
