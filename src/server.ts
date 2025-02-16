import express, { Request, Response } from 'express'
import {
  getAllEvents,
  getEventByCategory,
  getEventById,
  addEvent,
} from './services/eventService'
import type { Event } from './services/eventService'
import {
  getAllBooks,
  getBookByGroups,
  getBookById,
  addBook,
} from './services/bookService'
import type { Book } from './services/bookService'
import multer from 'multer'
import { uploadFile } from './services/uploadFileService'
const app = express()
app.use(express.json())
const port = 3000

const upload = multer({ storage: multer.memoryStorage() })

app.post('/upload', upload.single('file'), async (req: any, res: any) => {
  try {
    const file = req.file
    if (!file) {
      return res.status(400).send('No file uploaded.')
    }
    const bucket = 'images'
    const filePath = `uploads`;
    const ouputUrl = await uploadFile(bucket, filePath, file)
    res.status(200).send(ouputUrl)
  } catch (error) {
    res.status(500).send('Error uploading file.')
  }
})

app.post('/book/upload', upload.single('file'), async (req: any, res: any) => {
  try {
    const file = req.file
    if (!file) {
      return res.status(400).send('No file uploaded.')
    }
    const bucket = 'images'
    const filePath = `uploads`;
    const ouputUrl = await uploadFile(bucket, filePath, file)
    res.status(200).send(ouputUrl)
  } catch (error) {
    res.status(500).send('Error uploading file.')
  }
})

app.get('/events', async (req: Request, res: Response) => {
  if (req.query.category) {
    const category = req.query.category as string
    const filteredEvents = getEventByCategory(category as string)
    res.json(filteredEvents)
  } else {
    res.json(await getAllEvents())
  }
})

app.get('/events/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const event = await getEventById(id)
  if (event) {
    res.json(event)
  } else {
    res.status(404).send('Event not found')
  }
})

app.post('/events', async (req: Request, res: Response) => {
  const newEvent: Event = req.body
  await addEvent(newEvent)
  res.json(newEvent)
})

app.get('/books', async (req: Request, res: Response) => {
  if (req.query.group) {
    const group = req.query.group as string
    const filteredBooks = getBookByGroups(group as string)
    res.json(filteredBooks)
  } else {
    res.json(await getAllBooks())
  }
})

app.get('/books/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const book = await getBookById(id)
  if (book) {
    res.json(book)
  } else {
    res.status(404).send('Event not found')
  }
})

app.post('/books', async (req: Request, res: Response) => {
  const newBook: Book = req.body
  await addBook(newBook)
  res.json(newBook)
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
