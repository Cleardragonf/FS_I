import { app } from '../server'; // Adjust the path as needed
import request from 'supertest';

let server: any;

beforeAll(async () => {
  // Start the server explicitly before tests
  server = app.listen(5000);
});

afterAll(async () => {
  // Ensure the server is closed after tests
  await new Promise<void>((resolve) => server.close(() => resolve()));
});

describe('Notes API', () => {
  it('should return an empty array on GET /notes', async () => {
    const response = await request(app).get('/notes');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should create a new note on POST /notes', async () => {
    const newNote = {
      title: 'Test Note',
      description: 'This is a test note',
    };
    const response = await request(app)
      .post('/notes')
      .send(newNote)
      .expect(201);

    expect(response.body.title).toBe(newNote.title);
    expect(response.body.description).toBe(newNote.description);
  });
});
