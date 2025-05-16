export async function notifyUser({ title, body, url, delay = 0 }) {
  if (!("Notification" in window)) {
    console.warn("Este navegador no soporta notificaciones");
    return;
  }

  // Pide permiso si aún no lo tiene
  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }

  if (Notification.permission === "granted") {
    // Esperar el tiempo indicado antes de mostrar la notificación
    setTimeout(() => {
      const notification = new Notification(title, {
        body,
        icon: "/icon.png", // opcional
        data: { url },
      });

      notification.onclick = function (event) {
        event.preventDefault();
        if (notification.data?.url) {
          window.open(notification.data.url, "_blank");
        }
      };
    }, delay);
  }
}
