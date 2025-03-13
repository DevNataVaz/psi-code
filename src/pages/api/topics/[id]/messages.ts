import type { APIRoute } from 'astro';
import { pool } from '../../../../utils/db';

export const get: APIRoute = async ({ params }) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM messages WHERE topic_id = ? ORDER BY created_at ASC',
            [params.id]
        );
        return new Response(JSON.stringify(rows));
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to load messages' }), { status: 500 });
    }
};

export const post: APIRoute = async ({ request, params }) => {
    try {
        const { content, is_patient } = await request.json();
        const [result] = await pool.query(
            'INSERT INTO messages (topic_id, content, is_patient) VALUES (?, ?, ?)',
            [params.id, content, is_patient]
        );
        return new Response(JSON.stringify({ id: result.insertId, content, is_patient }));
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to save message' }), { status: 500 });
    }
};