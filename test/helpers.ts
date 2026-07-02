import request from 'supertest';

export const baseURL = 'https://practice.expandtesting.com/notes/api';

export async function createNote(token: string) {
  const res = await request(baseURL)
    .post('/notes')
    .set('x-auth-token', token)
    .type('form')
    .send({
      title: 'Note สำหรับเทส',
      description: 'สร้างจาก helper',
      category: 'Home',
    });
  return res.body.data;
}
