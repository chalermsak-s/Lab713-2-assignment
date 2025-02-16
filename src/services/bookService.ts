import { Book } from "../models/book";
import * as repo from "../repository/bookRepositoryDb";
import s3Client from '../awsConfig';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { randomBytes } from 'crypto';

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

function generateSaltedFilename(originalName: string): string {
  const salt = randomBytes(16).toString('hex');
  const extension = originalName.split('.').pop();
  return `${salt}.${extension}`;
}

export async function uploadFile(bucket: string, filePath: string, file: Express.Multer.File): Promise<string> {
  const saltedFilename = generateSaltedFilename(file.originalname);
  const saltedFilePath = `${filePath}/${saltedFilename}`;
  const params = {
    Bucket: bucket,
    Key: saltedFilePath,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const data = await s3Client.send(new PutObjectCommand(params));
  console.log('File uploaded successfully:', data);
  const publicUrl = `https://qiwwqmigxpucshdwfzup.supabase.co/storage/v1/object/public/images/${saltedFilePath}`;
  console.log('File uploaded successfully:', publicUrl);
  return publicUrl;
}

