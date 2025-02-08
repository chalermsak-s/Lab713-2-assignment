import express, { Request, Response } from "express";
const app = express();
const port = 3000;

interface Book {
  id: number;
  title: string;
  author_name: string;
  description: string;
  groups: string[];
}

const books: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author_name: "F. Scott Fitzgerald",
    description: "A novel set in the Jazz Age",
    groups: ["Fiction", "Classic"],
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author_name: "Harper Lee",
    description: "A novel about racial injustice",
    groups: ["Fiction", "Classic"],
  },
  {
    id: 3,
    title: "1984",
    author_name: "George Orwell",
    description: "A dystopian novel",
    groups: ["Fiction", "Dystopian"],
  },
  {
    id: 4,
    title: "The Catcher in the Rye",
    author_name: "J.D. Salinger",
    description: "A novel about teenage rebellion",
    groups: ["Fiction", "Classic"],
  },
  {
    id: 5,
    title: "Moby-Dick",
    author_name: "Herman Melville",
    description: "A novel about a sea captain's obsession",
    groups: ["Fiction", "Adventure"],
  },
  {
    id: 6,
    title: "Pride and Prejudice",
    author_name: "Jane Austen",
    description: "A novel about manners and marriage",
    groups: ["Fiction", "Romance"],
  },
];

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/test", (req: Request, res: Response) => {
  const id = req.query.id;
  const output = `id: ${id}`;
  res.send(output);
});

app.get("/events", (req, res) => {
  res.json(books);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
