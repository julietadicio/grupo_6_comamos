window.addEventListener('load', function () {
    let formulario = document.querySelector('form')

    formulario.addEventListener('submit', function (e) {
        let errores = [];

        // Email
        let campoEmail = document.getElementById('email')
        if (campoEmail.value == "") {
            errores.push("El email debe estar completado")
        }

        // Contraseña 
        let campoContraseña = document.getElementById('contraseña')
        if (campoContraseña.value == "") {
            errores.push("La contraseña debe estar completada")
        }


        //ERRORES
        if (errores.length > 0) {
            e.preventDefault();

            let ulErrores = document.querySelector('div.errores ul');

            errores.forEach(error => {
                ulErrores.innerHTML += `<li> ${error} </li>`
            })
        }
    })
})