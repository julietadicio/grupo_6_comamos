window.addEventListener('load', async () => {
    
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
    
    let products = await (await fetch ('http://localhost:8000/api/products')).json();
    let restaurants = await (await fetch ('http://localhost:8000/api/buisness')).json();
    const usersApi = await (await fetch('http://localhost:8000/api/users')).json();
    let emailCookie = getCookie('userEmail');
    const userLogged = usersApi.find(u => u.email == emailCookie);
    
    let carts = document.querySelectorAll('.btn');
    let cartProducts = [];
    if(localStorage.getItem(`cartProducts_${userLogged.idUser}`)){
        cartProducts = JSON.parse(localStorage.getItem(`cartProducts_${userLogged.idUser}`));
    }
    
    for (let i= 0; i< carts.length; i++) {
        carts[i].addEventListener('click', () => {
            let idProduct = carts[i].id;
            let productSelect = products.find(p => p.idPlato == idProduct);
            
            let buisnessKey = restaurants.find(b => b.idRestaurant == productSelect.id_restaurant).idRestaurant;
            let cartByBuisness = {};
            if(cartProducts.find(e => e.id == buisnessKey)){
                let index = cartProducts.findIndex(x => x.id == buisnessKey);
                cartProducts[index].products.push(productSelect);
            } else {
                cartByBuisness = {
                    id: buisnessKey,
                    products: [productSelect]
                };
                cartProducts.push(cartByBuisness)
            }
            localStorage.setItem(`cartProducts_${userLogged.idUser}`, JSON.stringify(cartProducts));
            window.location.href = 'http://localhost:8000/user/carrito';
        })     
    }
})
    
