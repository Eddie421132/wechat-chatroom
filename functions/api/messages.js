export async function onRequestGet(context) {
  const db = context.env.DB;

  const results = await db.prepare(`
    SELECT m.id, m.content, m.timestamp, u.username, u.avatar, u.is_admin
    FROM messages m
    JOIN users u ON m.user_id = u.id
    ORDER BY m.timestamp ASC
  `).all();

  return Response.json(results.results || []);
}
// yyt
