
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
        div.id = 'box-restaurant'
        div.appendChild(restaurantName);
        div.appendChild(restaurantAddress);
        
        let productsByRestaurant = products.filter(y=> y.id_restaurant == (cartUser[i].id));
        for (let p = 0; p < productsByRestaurant.length; p++) {
            const product = productsByRestaurant[p];
            let boxProduct = document.createElement('div');
            boxProduct.id = 'box-product'
            let input0 = document.createElement('input');
            let input1 = document.createElement('input');
            let input2 = document.createElement('input');
            let input3 = document.createElement('input');
            let input4 = document.createElement('input');
            let input5 = document.createElement('input');
            let deleteIcon = document.createElement('i');
            let link = document.createElement('a');
            let br = document.createElement('br');

            
            input0.name = 'idPlato';
            input0.type = 'number';
            input0.value = product.idPlato;
            input0.style.display = 'none';
            input1.value = product.plato;
            input1.name = 'plato';
            input1.disabled = true;
            input2.value = product.precio;
            input2.name = 'precio';
            input2.id = 'precio';
            input2.disabled = true;
            input2.type = 'number';
            input3.type = 'number';
            input3.value = 1;
            input3.name = 'quantity';
            input3.id = 'quantity';
            input4.name = 'id_restaurant';
            input4.type = 'number';
            input4.value = product.id_restaurant;
            input4.style.display = 'none';
            input5.id = 'total';
            input5.name = 'total-product';
            input5.type = 'number';
            input5.value = input2.value * input3.value;
            input5.disabled = true;

            deleteIcon.classList = 'fas fa-times';
            deleteIcon.id = product.idPlato;
            
            boxProduct.appendChild(input0);
            boxProduct.appendChild(input1);
            boxProduct.appendChild(input2);
            boxProduct.appendChild(input3);
            boxProduct.appendChild(input4);
            boxProduct.appendChild(input5);
            boxProduct.appendChild(link);
            link.appendChild(deleteIcon);
            boxProduct.appendChild(br);
            div.appendChild(boxProduct)

        }
        
        let date = document.createElement('input');
        let comensales = document.createElement('input');
        date.type = 'datetime-local';
        comensales.type = 'number';
        comensales.placeholder = 'cantidad de personas';
        date.name = 'date';
        comensales.name = 'comensales';
        div.appendChild(date);
        div.appendChild(comensales);
        productCartSection.appendChild(div)
        
    }
    
    
    /* link.addEventListener('click', (e)=> {
        let newProducts = cartUser[i].products.filter(x => x.idPlato != e.target.id);
        cartUser[i].products = newProducts;
        if(cartUser[i].products.length == 0){
            let newCartUser = cartUser.filter(u => u.id != cartUser[i].id);
            localStorage.setItem('cartProducts', JSON.stringify(newCartUser));
        } else {
            localStorage.setItem('cartProducts', JSON.stringify(cartUser));
        }
        ((e.target.parentNode).parentNode).remove();
        window.location.reload();
    }) */

    let quantityFields = productCartSection.querySelectorAll('#quantity');
    for (let r = 0; r < quantityFields.length; r++) {
        const quantityItem = quantityFields[r];
        quantityItem.addEventListener('change', (event)=> {
            let productContainer = event.target.parentNode;
            let priceProduct = productContainer.querySelector('#precio');
            let costProduct = productContainer.querySelector('#total');
            costProduct.value = Number(priceProduct.value) * Number(event.target.value);
        })
    }

    let shopCartButton = document.querySelector('.pay-button');
    shopCartButton.addEventListener('click', (e)=> {
        e.preventDefault();
        console.log('estoy enviando el formulario');
    })

})