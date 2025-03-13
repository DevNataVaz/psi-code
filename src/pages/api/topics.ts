import type { APIRoute } from 'astro';
import { pool } from '../../utils/db';

export const get: APIRoute = async ({ request }) => {
    try {
        const [rows] = await pool.query('SELECT * FROM topics WHERE user_id = ? ORDER BY created_at DESC', [1]); // Replace 1 with actual user_id
        return new Response(JSON.stringify(rows));
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to load topics' }), { status: 500 });
    }
};

export const post: APIRoute = async ({ request }) => {
    try {
        const { title } = await request.json();
        const [result] = await pool.query(
            'INSERT INTO topics (user_id, title) VALUES (?, ?)',
            [1, title] // Replace 1 with actual user_id
        );
        return new Response(JSON.stringify({ id: result.insertId, title }));
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to create topic' }), { status: 500 });
    }
};