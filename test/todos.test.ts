import request from 'supertest';
const baseURL = 'https://jsonplaceholder.typicode.com';

describe('todos API', () => {
it('GET /todos/1 → 200', async () => {
const res = await request(baseURL).get('/todos/1');
expect(res.status).toBe(200);   // status ไม่มีวงเล็บ
expect(res.body.id).toEqual(1);
expect(res.body).toHaveProperty('title'); // body แปลง json ให้แล้ว → ใช้ toEqual
    });

it('GET /todos/99999 → 404', async () => {
const res = await request(baseURL).get('/todos/99999');
expect(res.status).toBe(404);   // status ไม่มีวงเล็บ
    });
});    
