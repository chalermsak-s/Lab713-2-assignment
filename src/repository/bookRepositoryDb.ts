import type { Book } from '../models/book'
import connection from '../db'

export async function getBookByGroups(group: string): Promise<Book[]> {
  const [rows] = await connection.execute(
    'SELECT * FROM books WHERE groups = ?',
    [group]
  )
  return rows as Book[]
}

export async function getAllBooks(): Promise<Book[]> {
  const [rows] = await connection.execute('SELECT * FROM books')
  return rows as Book[]
}

export async function getBookById(id: number): Promise<Book | undefined> {
  const [rows] = await connection.execute('SELECT * FROM books WHERE id = ?', [
    id,
  ])
  const books = rows as Book[]
  return books.length > 0 ? books[0] : undefined
}

export async function addBook(newBook: Book): Promise<Book> {
  const { title, author_name, description, groups } = newBook
  const [result] = await connection.execute(
    'INSERT INTO books (title, author_name, description,`groups`) VALUES (?, ?, ?, ?)',
    [title, author_name, description, groups.join(",")]
  )
  newBook.id = (result as any).insertId
  return newBook
}
