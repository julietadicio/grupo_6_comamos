window.addEventListener('load', async () => {

    let cartUser = JSON.parse(localStorage.getItem('cartProducts'));
    let productCartSection = document.querySelector('#product-cart-section');

    let buisness = await (await fetch ('http://localhost:8000/api/buisness')).json();

    for (let i = 0; i < cartUser.length; i++) {
        const element = cartUser[i];
        const products = cartUser[i].products;
        let buisnessItem = buisness.find(e => e.idRestaurant == element.id);
        
        let restaurantName = document.createElement("h1");
        let restaurantAddress = document.createElement("h3");
        
        restaurantName.innerText = buisnessItem.nombre;
        restaurantAddress.innerText = buisnessItem.direccion;
        
        
        let div = document.createElement('div');
        div.appendChild(restaurantName);
        div.appendChild(restaurantAddress);
        
        let productsByRestaurant = products.filter(y=> y.id_restaurant == (cartUser[i].id));
        for (let p = 0; p < productsByRestaurant.length; p++) {
            const product = productsByRestaurant[p];
            let input1 = document.createElement('input');
            let input2 = document.createElement('input');
            let input3 = document.createElement('input');
            let date = document.createElement('input');
            let br = document.createElement('br');

            input1.value = product.plato;
            input1.name = 'plato';
            input1.disabled = true;
            input2.value = product.precio;
            input2.name = 'precio';
            input2.disabled = true;
            input3.type = 'number';
            input3.name = 'quantity';
            input3.placeholder = 'ingrese cantidad';
            date.type = 'datetime-local';
            date.name = 'date';

            div.appendChild(input1);
            div.appendChild(input2);
            div.appendChild(input3);
            div.appendChild(date);
            div.appendChild(br);
        }
        productCartSection.appendChild(div)
        
    }
})