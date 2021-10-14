
let buyButton = document.querySelector('.pay-button');


  
  buyButton.addEventListener('click', (e)=>{
    e.preventDefault();
    Swal.fire({
      title: 'Confirma reserva?',
      text: "La reserva quedará pendiente de confirmación por el restaurante",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(35, 253, 6)',
      cancelButtonColor: '#ED1B24',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
      'Felicitaciones!',
      'Tu reserva ha sido solicitada',
      'success'
      )
    }
    })
    let confirmButton = document.querySelector('.swal2-styled.swal2-confirm');
    let cancelButton = document.querySelector('.swal2-styled.swal2-cancel');
    confirmButton.addEventListener('click', ()=>{
      console.log('primera confirmacion');
      let confirmButton2 = document.querySelector('.swal2-styled.swal2-confirm');
      confirmButton2.addEventListener('click', ()=>{
        console.log('segunda confirmacion');
      })
      setTimeout(function(){
        window.location.href = 'http://localhost:8000/user/account/my-order';
      }, 1200);
    })
    cancelButton.addEventListener('click', ()=>{
      e.preventDefault();
    })
  })

