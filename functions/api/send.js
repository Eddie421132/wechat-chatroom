export async function onRequestPost(context) {
  const db = context.env.DB;
  const { user, content } = await context.request.json();

  const query = await db.prepare("SELECT id FROM users WHERE username = ?").bind(user.username).first();
  if (!query) return Response.json({ success: false, message: "用户无效" });

  await db.prepare("INSERT INTO messages (user_id, content, timestamp) VALUES (?, ?, ?)")
          .bind(query.id, content, Date.now()).run();

  return Response.json({ success: true });
}