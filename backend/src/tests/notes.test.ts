import request from 'supertest';
import { app } from '../server';  // Import the app instead of starting the server here

describe('Notes API', () => {
  let server: any;

  beforeAll(() => {
    // Start the server before the tests
    server = app.listen(5000);
  });

  afterAll(() => {
    // Close the server after the tests
    server.close();
  });

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

    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(newNote.title);
    expect(response.body.description).toBe(newNote.description);
  });
});
