window.addEventListener('load', function () {
    let formulario = document.querySelector('form')

    formulario.addEventListener('submit', function (e) {
        let errores = [];

        // Nombre 
        let campoNombre = document.getElementById('name')
        if (campoNombre.value == "") {
            errores.push("El nombre de la mesa debe estar completado")
        } 

        let campoUbicacion = document.getElementById('ubication')
        if (campoUbicacion.value == "") {
            errores.push("La ubicación de la mesa debe estar completada")
        } 

        let campoCapacidad = document.getElementById('capacity')
        if (campoCapacidad.value == "") {
            errores.push("La capacidad de la mesa debe estar completada")
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