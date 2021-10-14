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
    
    window.addEventListener('load', async () => {
    let cartItem = document.querySelector('.btn');
    console.log(cartItem);
    
    const usersApi = await (await fetch('http://localhost:8000/api/users')).json();
    let emailCookie = getCookie('userEmail');
    const userLogged = usersApi.find(u => u.email == emailCookie);

    let products = await (await fetch ('http://localhost:8000/api/products')).json();
    let restaurants = await (await fetch ('http://localhost:8000/api/buisness')).json();
    let cartProducts = [];
    if(localStorage.getItem(`cartProducts_${userLogged.idUser}`)){
        cartProducts = JSON.parse(localStorage.getItem(`cartProducts_${userLogged.idUser}`));
    }
    
    
        cartItem.addEventListener('click', () => {
            let idProduct = cartItem.id;
            console.log(idProduct);
            
            let productSelect = products.find(p => p.idPlato == idProduct);
            console.log(productSelect);
            
            let buisnessKey = restaurants.find(b => b.idRestaurant == productSelect.id_restaurant).idRestaurant;
            let cartByBuisness = {};
            if(cartProducts.find(e => e.id == buisnessKey)){
                console.log('El restaurante ya existe en el array');
                let index = cartProducts.findIndex(x => x.id == buisnessKey);
                cartProducts[index].products.push(productSelect);
            } else {
                console.log('hay que agregar este negocio');
                cartByBuisness = {
                    id: buisnessKey,
                    products: [productSelect]
                };
                cartProducts.push(cartByBuisness)
            }
            localStorage.setItem(`cartProducts_${userLogged.idUser}`, JSON.stringify(cartProducts));
            window.location.href = 'http://localhost:8000/user/carrito';
        })     
    
})
    
