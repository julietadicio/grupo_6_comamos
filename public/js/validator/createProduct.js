window.addEventListener('load', function () {
    let formulario = document.querySelector('form')

    formulario.addEventListener('submit', function (e) {
        let errores = [];

        // Nombre del plato 
        let campoPlato = document.getElementById('plato')
        if (campoPlato.value == "") {
            errores.push("El nombre del plato debe estar completado")
        } else if (campoPlato.value.length < 5) {
            errores.push("El nombre del plato debe tener mínimo 5 caracteres")
        }

        // Descripción 
        let campoDescripcion = document.getElementById('descripcion')
        if (campoDescripcion.value.length < 20) {
            errores.push("La descripción del plato debe tener mínimo 20 caracteres")
        }

        // Categoría 
        let campoCategoria = document.getElementById('categoria')
        if (campoCategoria.value == "") {
            errores.push("La categoría del plato debe estar completada")
        }

        // Precio 
        let campoPrecio = document.getElementById('precio')
        if (campoPrecio.value == undefined) {
            errores.push("El precio del plato debe estar completado")
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