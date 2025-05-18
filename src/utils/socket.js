import { io } from "socket.io-client";

// Paso 1: Obtener el token desde localStorage
const token = localStorage.getItem("token");

// Paso 2: Conectar al servidor usando el token en `auth`
const socket = io("http://localhost:3001", {
  auth: {
    token,
  },
});

// Paso 3: Escuchar conexión
socket.on("connect", () => {
  console.log("Conectado al socket. ID:", socket.id);
});

// Paso 4: Escuchar un evento
socket.on("mensaje", (data) => {
  console.log("Mensaje recibido:", data);
});

export default socket;
