export async function onRequestPost(context) {
  const db = context.env.DB;
  const { username, password, avatar } = await context.request.json();

  if (!username || !password) {
    return Response.json({ success: false, message: "用户名和密码不能为空" });
  }

  try {
    await db.prepare("INSERT INTO users (username, password, avatar, is_admin) VALUES (?, ?, ?, 0)")
            .bind(username, password, avatar).run();

    return Response.json({ success: true, message: "注册成功" });
  } catch (e) {
    return Response.json({ success: false, message: "用户名已存在" });
  }
}