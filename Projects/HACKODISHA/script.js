// script.js
document.addEventListener("DOMContentLoaded", function () {
    const notificationContainer = document.getElementById("notification-container");
    
    // Create a WebSocket connection to your server
    const socket = new WebSocket("ws://your-server-url");

    // Handle incoming WebSocket messages (notifications)
    socket.addEventListener("message", function (event) {
        const notificationData = JSON.parse(event.data);
        createNotification(notificationData.title, notificationData.message);
    });

    function createNotification(title, message) {
        const notification = document.createElement("div");
        notification.classList.add("notification");
        notification.innerHTML = `
            <h3>${title}</h3>
            <p>${message}</p>
        `;
        notificationContainer.appendChild(notification);

        // Automatically remove the notification after a certain period (e.g., 5 seconds)
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
});
