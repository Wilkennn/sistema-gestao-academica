document.addEventListener('DOMContentLoaded', function() {
    const alertMessage = document.getElementById('alert-message');
    
    if (alertMessage) {
      Swal.fire({
        icon: alertMessage.dataset.type === "success" ? "success" : "error",
        title: alertMessage.dataset.type === "success" ? "Sucesso" : "Erro",
        html: alertMessage.dataset.message,
        showConfirmButton: true,
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed && alertMessage.dataset.type === "success") {
          window.location.href = '/curso';
        }
      });
    }
  });
  