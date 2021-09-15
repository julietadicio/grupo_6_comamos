
window.addEventListener('load', () => {
    let busqueda1 = document.querySelector('#busqueda1');
    let botonBuscar = document.querySelector('#boton-buscar');

    busqueda1.addEventListener('keyup', async (e) => {
        let search = e.target.value;
        /* const results = await db.Restaurant.findAll({
            where: {
                [Op.like]: {nombre: search}
            }
        }) */
        console.log(search);

    })


})
