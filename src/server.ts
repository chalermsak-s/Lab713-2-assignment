import express, { Request, Response } from "express";
const app = express();
const port = 3000;

interface Event {
  id: number;
  category: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  petsAllowed: boolean;
  organizer: string;
}

const events: Event[] = [
  {
    id: 1,
    category: "Music",
    title: "Concert",
    description: "A live concert",
    location: "London",
    date: "2021-07-01",
    time: "19:00",
    petsAllowed: false,
    organizer: "Live Nation",
  },
  {
    id: 2,
    category: "Art",
    title: "Art Exhibition",
    description: "An exhibition of modern art",
    location: "Paris",
    date: "2021-08-15",
    time: "10:00",
    petsAllowed: true,
    organizer: "Art World",
  },
  {
    id: 3,
    category: "Technology",
    title: "Tech Conference",
    description: "A conference on the latest in tech",
    location: "San Francisco",
    date: "2021-09-10",
    time: "09:00",
    petsAllowed: false,
    organizer: "Tech Innovators",
  },
  {
    id: 4,
    category: "Sports",
    title: "Marathon",
    description: "A city-wide marathon",
    location: "New York",
    date: "2021-10-05",
    time: "07:00",
    petsAllowed: true,
    organizer: "RunNYC",
  },
  {
    id: 5,
    category: "Food",
    title: "Food Festival",
    description: "A festival of food and drinks",
    location: "Tokyo",
    date: "2021-11-20",
    time: "12:00",
    petsAllowed: true,
    organizer: "Foodies United",
  },
  {
    id: 6,
    category: "Film",
    title: "Film Premiere",
    description: "Premiere of a new blockbuster",
    location: "Los Angeles",
    date: "2021-12-01",
    time: "18:00",
    petsAllowed: false,
    organizer: "Hollywood Studios",
  },
];

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

app.get("/events/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const event = events.find((event) => event.id === id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).send("Event not found");
  }
});

app.get("/books/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const book = books.find((book) => book.id === id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
