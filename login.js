document.getElementById("loginBtn").onclick = async function () {
  const username = prompt("请输入用户名：");
  const password = prompt("请输入密码：");

  const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if (data.success) {
    localStorage.setItem("user", JSON.stringify({
      username, avatar: data.avatar, admin: data.admin
    }));
    location.reload();
  } else {
    alert("登录失败：" + data.message);
  }
};