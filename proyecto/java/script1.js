document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener valores de los campos
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const asunto = document.getElementById("asunto").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    // Validar campos
    if (nombre === "" || email === "" || asunto === "" || mensaje === "") {
      document.getElementById("statusMessage").textContent = "Por favor, complete todos los campos.";
      return;
    }

    // Simular envío del formulario (aquí podrías realizar una solicitud HTTP real)
    setTimeout(() => {
      // Limpiar formulario
      document.getElementById("contactForm").reset();
      document.getElementById("statusMessage").textContent = "Mensaje enviado correctamente.";
    }, 1000); // Simulación de tiempo de carga

  });