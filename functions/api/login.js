export async function onRequestPost(context) {
  const db = context.env.DB;
  const { username, password } = await context.request.json();

  const query = await db.prepare("SELECT * FROM users WHERE username = ?").bind(username).first();
  if (!query) return Response.json({ success: false, message: "用户不存在" });

  if (query.password !== password) return Response.json({ success: false, message: "密码错误" });

  return Response.json({
    success: true,
    admin: query.is_admin === 1,
    avatar: query.avatar
  });
}