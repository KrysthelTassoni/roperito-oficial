import { io } from "socket.io-client";

// Paso 1: Obtener el token desde localStorage
const token = localStorage.getItem("token");

// Paso 2: Conectar al servidor usando el token en `auth`
const socket = io("http://localhost:3001", {
  auth: {
    token,
  },
  transports: ['websocket', 'polling'],
  withCredentials: true,
  timeout: 45000
});

// Paso 3: Escuchar conexión
socket.on("connect", () => {
  console.log("Conectado al socket. ID:", socket.id);
});

// Paso 4: Escuchar errores de conexión
socket.on("connect_error", (error) => {
  console.error("Error de conexión socket:", error);
});

export default socket;
