window.addEventListener('DOMContentLoaded', () => {
    const alertMessageElement = document.getElementById('alert-message');
    if (alertMessageElement) {
        const messageType = alertMessageElement.getAttribute('data-type');
        const message = alertMessageElement.getAttribute('data-message');
        if (message) {
            if (messageType === 'success') {
                alert(`Success: ${message}`);
            } else if (messageType === 'error') {
                alert(`Error: ${message}`);
            }
        }
    }
});