import request from 'supertest';
import notes from '../test-data/notes.json';


export const baseURL = process.env.API_BASE_URL || 'https://practice.expandtesting.com/notes/api';

export async function createNote(token: string) {
  const res = await request(baseURL)
    .post('/notes')
    .set('x-auth-token', token)
    .type('form')
    .send(notes.valid);

  return res.body.data;
}
