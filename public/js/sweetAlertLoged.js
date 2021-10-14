let buyButton = document.querySelector('.btn');

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}
let emailCookie = getCookie('userEmail');

if(!emailCookie){
  buyButton.addEventListener('click', (e)=>{
    e.preventDefault();
    Swal.fire({
    icon: 'warning',
    title: 'Tienes que iniciar sesión para reservar',
    showConfirmButton: false,
    timer: 1500
    })
    setTimeout(function(){
      window.location.href = 'http://localhost:8000/user/login';
    }, 1500);
  })
}