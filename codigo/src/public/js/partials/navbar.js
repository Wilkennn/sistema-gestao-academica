window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('logo').addEventListener('click', function () {
        var sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
    });
})