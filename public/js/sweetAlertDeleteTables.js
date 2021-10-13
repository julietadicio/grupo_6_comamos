
let deleteButtons = document.querySelectorAll('#delete-table');

for (let a = 0; a < deleteButtons.length; a++) {
  const deleteButton = deleteButtons[a];
  deleteButtons[a].addEventListener('click', (e)=>{
    e.preventDefault();
    Swal.fire({
      title: 'Estas seguro?',
      text: "La eliminación de la mesa no puede deshacerse!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(35, 253, 6)',
      cancelButtonColor: '#ED1B24',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
      'Eliminado!',
      'La mesa ha sido eliminada',
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
      let deleteForm = deleteButtons[a].parentNode;
      setTimeout(function(){
        deleteForm.submit();
      }, 1200);
    })
    cancelButton.addEventListener('click', ()=>{
      e.preventDefault();
    })
  })
}
