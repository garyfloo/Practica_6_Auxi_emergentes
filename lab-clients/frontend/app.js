const API_URL = "http://localhost:8080/api/clients";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("clientForm");
  const tbody = document.getElementById("clientTableBody");

  // 🧠 Mostrar los clientes existentes
  function loadClients() {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        tbody.innerHTML = "";
        data.forEach(client => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${client.name}</td>
            <td>${client.email}</td>
            <td>${client.phone}</td>
          `;
          tbody.appendChild(row);
        });
      })
      .catch(err => console.error("Error al cargar clientes:", err));
  }

  // 🚀 Enviar un nuevo cliente
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newClient = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
    };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newClient),
    })
      .then(response => {
        if (!response.ok) throw new Error("Error al agregar cliente");
        form.reset();
        loadClients(); // recargar la tabla
      })
      .catch(err => console.error(err));
  });

  loadClients();
});
