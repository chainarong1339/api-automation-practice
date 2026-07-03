import request from 'supertest';
import { baseURL, createNote } from '../utils/api-client';
import notes from '../test-data/notes.json';


describe('notes API', () => {
    let token: string;
    beforeAll(async () => {
        const email = `qa${Date.now()}@test.com`;
        const password = 'Password123!';

        await request(baseURL).post('/users/register')
            .type('form').send({ name: 'QA Tester', email, password });

        const res = await request(baseURL).post('/users/login')
            .type('form').send({ email, password });

        token = res.body.data.token;
    }, 10000);

    it('GET /notes ด้วย token → 200', async () => {
        const res = await request(baseURL)
            .get('/notes')
            .set('x-auth-token', token);

        expect(res.status).toBe(200);
    });
    it('POST /notes สร้าง note → 200', async () => {
        const res = await request(baseURL)
            .post('/notes')
            .set('x-auth-token', token)
            .type('form')
            .send({
                title: 'My Test Note',
                description: 'This is a test note',
                category: 'Home',
            });

        expect(res.status).toBe(200);
        expect(res.body.data.title).toBe('My Test Note');
    });
    it('PUT /notes/:id แก้ไข note → 200', async () => {
        const note = await createNote(token);
        const noteId = note.id;

        const res = await request(baseURL)
            .put(`/notes/${noteId}`)
            .set('x-auth-token', token)
            .type('form')
            .send({
                title: 'Note ใหม่',
                description: 'แก้แล้ว',
                completed: true,
                category: 'Work',
            });

        expect(res.status).toBe(200);
        expect(res.body.data.title).toBe('Note ใหม่');
    });
    it('DELETE /notes/:id ลบ note → 200', async () => {
        const note = await createNote(token);
        const noteId = note.id;
        const res = await request(baseURL)
            .delete(`/notes/${noteId}`)
            .set('x-auth-token', token);

        expect(res.status).toBe(200);

        const check = await request(baseURL)
            .get(`/notes/${noteId}`)
            .set('x-auth-token', token);

        expect(check.status).toBe(404);

    });
    it('GET /notes ไม่ส่ง token → 401', async () => {
        const res = await request(baseURL).get('/notes');
        expect(res.status).toBe(401);
    });

    it.each(notes.invalidCategories)('POST /notes category "%s" → 400', async (category) => {

        const res = await request(baseURL)
            .post('/notes')
            .set('x-auth-token', token)
            .type('form')
            .send({
                title: 'Test',
                description: 'Test',
                category: category,
            });

        expect(res.status).toBe(400);
    });

});
