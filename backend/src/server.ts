import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

interface Note {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

let notes: Note[] = [];

function saveNotesToFile() {
  // Save notes to file (could be replaced with DB later)
}

function loadNotesFromFile() {
  // Load notes from file or DB
}

// API Routes
app.get('/notes', (req: Request, res: Response): void => {
  res.json(notes);
});

app.get('/notes/:id', (req: Request, res: Response): void => {
  const note = notes.find(n => n.id === req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

app.post('/notes', (req: Request, res: Response): void => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400).json({ message: 'Title and description are required' });
    return;
  }

  const newNote: Note = {
    id: uuidv4(),
    title,
    description,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  notes.push(newNote);
  saveNotesToFile();
  res.status(201).json(newNote);
});

app.put('/notes/:id', (req: Request, res: Response): void => {
  const { title, description } = req.body;
  const note = notes.find(n => n.id === req.params.id);

  if (!note) {
    res.status(404).json({ message: 'Note not found' });
    return;
  }

  if (!title || !description) {
    res.status(400).json({ message: 'Title and description are required' });
    return;
  }

  note.title = title;
  note.description = description;
  note.updatedAt = new Date().toISOString();

  saveNotesToFile();
  res.json(note);
});

app.delete('/notes/:id', (req: Request, res: Response): void => {
  const noteIndex = notes.findIndex(n => n.id === req.params.id);
  if (noteIndex === -1) {
    res.status(404).json({ message: 'Note not found' });
    return;
  }

  notes.splice(noteIndex, 1);
  saveNotesToFile();
  res.status(204).send();
});

// Check if the environment is not 'test' before starting the server
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export { app };
