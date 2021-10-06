window.addEventListener('load', async () => {
    let carts = document.querySelectorAll('.btn');

    let products = await (await fetch ('http://localhost:8000/api/products')).json();
    let restaurants = await (await fetch ('http://localhost:8000/api/buisness')).json();
    let cartProducts = [];
    if(localStorage.getItem('cartProducts')){
        cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    }
    
    for (let i= 0; i< carts.length; i++) {
        carts[i].addEventListener('click', () => {
            let nameProduct = carts[i].parentElement.querySelector('h3').innerText;
            let productSelect = products.filter(p => p.plato == nameProduct);
            
            let buisnessKey = restaurants.find(b => b.idRestaurant == productSelect[0].id_restaurant).idRestaurant;
            let cartByBuisness = {};
            if(cartProducts.find(e => e.id == buisnessKey)){
                console.log('El restaurante ya existe en el array');
                let index = cartProducts.findIndex(x => x.id == buisnessKey);
                cartProducts[index].products.push(productSelect[0]);
            } else {
                console.log('hay que agregar este negocio');
                cartByBuisness = {
                    id: buisnessKey,
                    products: productSelect
                };
                cartProducts.push(cartByBuisness)
            }
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
            window.location.href = 'http://localhost:8000/user/carrito';
        })     
    }
})
    
