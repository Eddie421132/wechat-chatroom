window.onload = async function () {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  document.getElementById("chatBox").classList.remove("hidden");
  document.getElementById("sendBox").classList.remove("hidden");

  const chatBox = document.getElementById("chatBox");
  const msgInput = document.getElementById("msgInput");

  async function loadMessages() {
    const res = await fetch("/api/messages");
    const data = await res.json();
    chatBox.innerHTML = "";
    data.forEach(msg => {
      const div = document.createElement("div");
      div.className = "flex items-start space-x-2 p-2";
      div.innerHTML = `
        <img src="${msg.avatar}" class="w-8 h-8 rounded-full" />
        <div class="bg-gray-200 p-2 rounded w-full">
          <div class="text-sm font-bold">${msg.username}${msg.is_admin ? "（管理员）" : ""}</div>
          <div>${msg.content}</div>
          ${user.admin ? `<button onclick="deleteMsg(${msg.id})" class="text-xs text-red-600">删除</button>` : ""}
        </div>`;
      chatBox.appendChild(div);
    });
  }

  document.getElementById("sendBtn").onclick = async function () {
    const text = msgInput.value;
    if (!text) return;

    await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify({ content: text, user }),
      headers: { "Content-Type": "application/json" },
    });

    msgInput.value = "";
    loadMessages();
  };

  window.deleteMsg = async function (id) {
    await fetch("/api/delete", {
      method: "POST",
      body: JSON.stringify({ id, user }),
      headers: { "Content-Type": "application/json" },
    });
    loadMessages();
  };

  loadMessages();
};