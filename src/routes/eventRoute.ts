import express, { Request, Response } from "express";
import { getAllEvents, getEventByCategory, getEventById, addEvent } from "../services/eventService";
import type { Event } from "../models/event";
import { uploadFile } from '../services/uploadFileService'
import multer from 'multer'
import dotenv from 'dotenv'
dotenv.config()
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() })

router.post('/upload', upload.single('file'), async (req: any, res: any) => {
  try {
    const file = req.file
    if (!file) {
      return res.status(400).send('No file uploaded.')
    }
    const bucket = process.env.SUPABASE_BUCKET_NAME
    const filePath = process.env.UPLOAD_DIR

    if (!bucket || !filePath) {
      return res.status(500).send('Bucket name or file path not configured.')
    }

    const ouputUrl = await uploadFile(bucket, filePath, file)
    res.status(200).send(ouputUrl)
  } catch (error) {
    res.status(500).send('Error uploading file.')
  }
})

router.get("/", async (req: Request, res: Response) => {
  if (req.query.category) {
    const category = req.query.category as string;
    const filteredEvents = await getEventByCategory(category);
    res.json(filteredEvents);
  } else {
    res.json(await getAllEvents());
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const event = await getEventById(id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).send("Event not found");
  }
});

router.post("/", async (req: Request, res: Response) => {
  const newEvent: Event = req.body;
  await addEvent(newEvent);
  res.json(newEvent);
});

export default router;
