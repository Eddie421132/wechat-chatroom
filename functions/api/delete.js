export async function onRequestPost(context) {
  const db = context.env.DB;
  const { id, user } = await context.request.json();

  const u = await db.prepare("SELECT * FROM users WHERE username = ?").bind(user.username).first();
  if (!u || u.is_admin !== 1) return Response.json({ success: false, message: "无权限" });

  await db.prepare("DELETE FROM messages WHERE id = ?").bind(id).run();
  return Response.json({ success: true });
}