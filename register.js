document.getElementById("registerBtn").onclick = async function () {
  const username = prompt("请输入用户名：");
  const password = prompt("请输入密码：");
  const avatar = "./assets/avatar.jpeg";

  const res = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify({ username, password, avatar }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  alert(data.message);
};