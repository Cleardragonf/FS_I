"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
exports.app = app;
const port = 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
let notes = [];
function saveNotesToFile() {
    // Save notes to file (could be replaced with DB later)
}
function loadNotesFromFile() {
    // Load notes from file or DB
}
// API Routes
app.get('/notes', (req, res) => {
    res.json(notes);
});
app.get('/notes/:id', (req, res) => {
    const note = notes.find(n => n.id === req.params.id);
    if (note) {
        res.json(note);
    }
    else {
        res.status(404).json({ message: 'Note not found' });
    }
});
app.post('/notes', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        res.status(400).json({ message: 'Title and description are required' });
        return;
    }
    const newNote = {
        id: (0, uuid_1.v4)(),
        title,
        description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    notes.push(newNote);
    saveNotesToFile();
    res.status(201).json(newNote);
});
app.put('/notes/:id', (req, res) => {
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
app.delete('/notes/:id', (req, res) => {
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
