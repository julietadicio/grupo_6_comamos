window.addEventListener('load', function () {

    let formulario = document.querySelector('form')

    formulario.addEventListener('submit', function (e) {
        let errores = []
        // Nombre
        let campoNombre = document.getElementById('nombre')

        if (campoNombre.value == "") {
            errores.push("El nombre tiene que estar completado")

        } else if (campoNombre.value.length < 2) {
            errores.push("El nombre debe tener mínimo 2 caracteres")
        }
        // Apellido
        let campoApellido = document.getElementById('apellido')

        if (campoApellido.value == "") {
            errores.push("El apellido tiene que estar completado")

        } else if (campoApellido.value.length < 2) {
            errores.push("El apellido debe tener mínimo 2 caracteres")
        }
        // Email

        let campoEmail = document.getElementById('email')

        if (campoEmail.value == "") {
            errores.push("El email debe estar completado")
        } else if (!campoEmail.value.includes("@") && !campoEmail.value.includes(".com"))
        errores.push('El email debe ser válido')

        // Contraseña

        let campoContraseña = document.getElementById('contraseña')

        if (campoContraseña.value == "") {
            errores.push("La contraseña debe estar completada")

        } else if (campoContraseña.value.length < 8)
            errores.push("La contraseña debe tener mínimo 8 caracteres")


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

