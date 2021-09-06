const db = require ('../database/models');
const { Op } = require("sequelize");


const controller = {
    initMap: (req, res) => {
        /* const productSelect = await db.Product.findOne({
                    where: {idPlato: req.params.idPlato},
                    include: {association: 'productRestaurant'}
                })
        const resp = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${productSelect.productRestaurant.direccion}&key=AIzaSyAFOo6YZ_RiBv1vbXSOxAWR6UmMIMozn6M`)
        const data = await resp.json();
        const address = { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng };
        // The map, centered at address
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 18,
            center: address,
        });
        // The marker, positioned at address
        const marker = new google.maps.Marker({
            position: address,
            map: map,
        }); */
        console.log('estoy viajando por fetch a la vista!!!');
    }
}

module.exports = controller;    