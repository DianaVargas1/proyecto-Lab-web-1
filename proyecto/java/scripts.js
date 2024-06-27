
// Datos de médicos por especialidad y obra social
const medicosPorEspecialidad = {
  1: [
    { id: 1, nombre: "Dra. Acosta Andrea", diasAtencion: ["Lunes", "Miércoles", "Viernes"], 
        obrasSociales: [1, 2] },
        
      { id: 1, nombre: "Dr. Casas José", diasAtencion: ["Martes","Miércoles", "Jueves", "Viernes"], obrasSociales: [1] },
      { id: 1, nombre: "Dr. Perez Juan", diasAtencion: ["Lunes", "Martes","Miércoles", "Jueves", "Viernes"], obrasSociales: [1] }
     ],
  2: [
    { id: 4, nombre: "Dra. Berra María", diasAtencion: ["Martes", "Jueves"], obrasSociales: [2] },
    { id: 5, nombre: "Dr. Díaz Pablo", diasAtencion: ["Lunes", "Miércoles", "Viernes"], obrasSociales: [1, 2] },
    { id: 6, nombre: "Dra. Flores Cintia", diasAtencion: ["Lunes", "Martes","Miércoles", "Jueves", "Viernes"], obrasSociales: [1] }
  
  ],
  3: [
    { id: 7, nombre: "Dr. Zari Juan", diasAtencion: ["Lunes", "Martes","Miércoles", "Jueves", "Viernes"], obrasSociales: [2] },
    
  ],
  4: [
    { id: 8, nombre: "Dr. Morales Juan", diasAtencion: ["Lunes", "Martes","Miércoles", "Jueves", "Viernes"], obrasSociales: [2] },
    { id: 9, nombre: "Dra. Oses María", diasAtencion: ["Lunes", "Martes","Miércoles", "Jueves", "Viernes"], obrasSociales: [1, 2] }
    
  ],
  5: [
    { id: 10, nombre: "Dr. Carrizo Andres", diasAtencion: ["Lunes", "Martes","Miércoles", "Jueves", "Viernes"], obrasSociales: [2] },
  ],
  6: [
    { id: 11, nombre: "Dra. Diaz Zulema", diasAtencion: ["Lunes", "Martes","Miércoles", "Jueves", "Viernes"], obrasSociales: [2] },
  ],
  7: [
    { id: 12, nombre: "Dra. Diaz Alicia", diasAtencion: ["Lunes", "Martes","Miércoles", "Jueves", "Viernes"], obrasSociales: [2] },
  ],
  8: [
    { id: 13, nombre: "Dra. Suarez Lucía", diasAtencion: ["Lunes", "Martes","Miércoles", "Jueves", "Viernes"], obrasSociales: [2] },
  ],
  9: [
    { id: 14, nombre: "Dr. García Juan", diasAtencion: ["Lunes", "Martes","Miércoles", "Jueves", "Viernes"], obrasSociales: [2] },
    { id: 15, nombre: "Dra. López Cecilia", diasAtencion: ["Lunes", "Martes","Miércoles", "Jueves", "Viernes"], obrasSociales: [2] },
  
  ],
  10: [
    { id: 16, nombre: "Dr. López Juan", diasAtencion: ["Lunes", "Martes","Miércoles", "Jueves", "Viernes"], obrasSociales: [2] },
  ]
  
  
};

// Array para almacenar los turnos
let turnos = [];

// Función para cargar los médicos según la especialidad seleccionada
function cargarMedicos() {
  let especialidadId = document.getElementById("especialidad").value;
  let medicoSelect = document.getElementById("medico");
  medicoSelect.innerHTML = '<option value="">Seleccione un médico</option>';

  if (especialidadId !== "") {
    medicosPorEspecialidad[especialidadId].forEach(medico => {
      let option = document.createElement("option");
      option.value = medico.id;
      option.textContent = medico.nombre;
      medicoSelect.appendChild(option);
    });
  }
}

// Función para cargar los días de atención del médico seleccionado
function cargarDiasAtencion() {
  let medicoId = document.getElementById("medico").value;
  let diasSelect = document.getElementById("diaAtencion");
  diasSelect.innerHTML = '<option value="">Seleccione un día</option>';

  if (medicoId !== "") {
    let medico = obtenerMedicoPorId(medicoId);

    if (medico) {
      medico.diasAtencion.forEach(dia => {
        let option = document.createElement("option");
        option.value = dia;
        option.textContent = dia;
        diasSelect.appendChild(option);
      });
    }
  }
}

// Función para cargar las horas disponibles cada 15 minutos
function cargarHorasDisponibles() {
  let horasSelect = document.getElementById("hora");
  horasSelect.innerHTML = '<option value="">Seleccione una hora</option>';

  // Generar opciones de horas cada 15 minutos
  for (let hora = 9; hora < 13; hora++) {
    for (let minuto = 0; minuto < 60; minuto += 15) {
      let horaFormato = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
      let option = document.createElement("option");
      option.value = horaFormato;
      option.textContent = horaFormato;
      horasSelect.appendChild(option);
    }
  }
}

// Función para sacar un turno
function sacarTurno() {
  let especialidadId = document.getElementById("especialidad").value;
  let medicoId = document.getElementById("medico").value;
  let obraSocial = document.getElementById("obraSocial").value;
  let diaAtencion = document.getElementById("diaAtencion").value;
  let hora = document.getElementById("hora").value;

  // Validar que los campos no estén vacíos
  if (especialidadId === "" || medicoId === "" || obraSocial === "" || diaAtencion === "" || hora === "") {
    alert("Por favor, complete todos los campos.");
    return;
  }

  // Crear objeto turno
  let medico = obtenerMedicoPorId(medicoId);
  let medicoNombre = medico ? medico.nombre : "";

  let turno = {
    especialidadId: especialidadId,
    medicoId: medicoId,
    medicoNombre: medicoNombre,
    obraSocial: obraSocial,
    diaAtencion: diaAtencion,
    hora: hora
  };

  // Agregar turno al array
  turnos.push(turno);

  // Limpiar campos del formulario después de agregar el turno
  document.getElementById("turnoForm").reset();

  // Actualizar lista de turnos en el DOM
  actualizarListaTurnos();
}

// Función para obtener el objeto médico por su ID
function obtenerMedicoPorId(medicoId) {
  let especialidadId = document.getElementById("especialidad").value;
  let medicos = medicosPorEspecialidad[especialidadId];
  return medicos.find(m => m.id == medicoId);
}

// Función para actualizar la lista de turnos en el DOM
function actualizarListaTurnos() {
  let turnoItems = document.getElementById("turnoItems");
  turnoItems.innerHTML = "";

  turnos.forEach(turno => {
    let li = document.createElement("li");
    li.textContent = `Especialidad: ${turno.especialidadId}, Médico: ${turno.medicoNombre}, Obra Social: ${turno.obraSocial}, Día: ${turno.diaAtencion}, Hora: ${turno.hora}`;
    turnoItems.appendChild(li);
  });
}

// Cargar médicos al inicio (opcional)
cargarMedicos();
