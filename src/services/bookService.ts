import { Book } from "../models/book";
import * as repo from "../repository/bookRepository";

export { Book };

export function getBookByGroups(groups: string): Promise<Book[]> {
  return repo.getBookByGroups(groups);
}

export function getAllBooks(): Promise<Book[]> {
  return repo.getAllBooks();
}

export function getBookById(id: number): Promise<Book | undefined> {
  return repo.getBookById(id);
}

export function addBook(newBook: Book): Promise<Book> {
  return repo.addBook(newBook);
}

