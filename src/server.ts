import express, { Request, Response } from 'express'
import eventRoute from './routes/eventRoute';
import {
  getAllBooks,
  getBookByGroups,
  getBookById,
  addBook,
} from './services/bookService'
import type { Book } from './services/bookService'
import multer from 'multer'
import dotenv from 'dotenv'
dotenv.config()
import { uploadFile } from './services/uploadFileService'
const app = express()
app.use(express.json())
app.use('/events',eventRoute);
const port = 3000

const upload = multer({ storage: multer.memoryStorage() })

app.post('/books/upload', upload.single('file'), async (req: any, res: any) => {
  try {
    const file = req.file
    if (!file) {
      return res.status(400).send('No file uploaded.')
    }
    const bucket = 'images'
    const filePath = `uploads`
    const ouputUrl = await uploadFile(bucket, filePath, file)
    res.status(200).send(ouputUrl)
  } catch (error) {
    res.status(500).send('Error uploading file.')
  }
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
