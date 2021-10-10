
window.addEventListener('load', async () => {

    let cartUser = JSON.parse(localStorage.getItem('cartProducts'));
    let productCartSection = document.querySelector('#product-cart-section');

    let cartQuantity = function (evento, quantity) {
        let buisnessTarget = evento.target.parentNode.querySelector('#id_restaurant').value;
        let idPlato = evento.target.parentNode.querySelector('#idPlato').value;
        let restaurantSelect = cartUser.find(b => b.id == buisnessTarget);
        let restaurantIndex = cartUser.indexOf(restaurantSelect);
        let productSelect = restaurantSelect.products.find(p => p.idPlato == idPlato);
        let productIndex = cartUser[restaurantIndex].products.indexOf(productSelect);
        
        cartUser[restaurantIndex].products[productIndex].quantity = quantity;
        localStorage.setItem('cartProducts', JSON.stringify(cartUser));
    }

    let costCalculation = function (evento, quantity, input) {
        let productContainer = evento.target.parentNode;
        let priceProduct = productContainer.querySelector('#precio');
        let costProduct = productContainer.querySelector('#total');
        costProduct.value = priceProduct.value * quantity;
        let inputsCost = productCartSection.querySelectorAll('#total');
        let totalCost = 0;
        for (let l = 0; l < inputsCost.length; l++) {
            const itemCost = Number(inputsCost[l].value);
            totalCost += itemCost;
        }
        input6.value = Number(totalCost);
    }

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
            let plusIcon = document.createElement('i');
            let minusIcon = document.createElement('i');
            let link = document.createElement('a');
            let br = document.createElement('br');

            
            input0.name = 'idPlato';
            input0.id = 'idPlato';
            input0.type = 'number';
            input0.value = product.idPlato;
            input0.style.display = 'none';

            input1.name = 'plato';
            input1.value = product.plato;
            input1.disabled = true;

            input2.name = 'precio';
            input2.value = product.precio;
            input2.id = 'precio';
            input2.disabled = true;
            input2.type = 'number';

            input3.name = 'quantity';
            input3.type = 'number';
            if(product.quantity){
              input3.value = product.quantity;
            } else {
                input3.value = 1;
            }
            input3.id = 'quantity';
            input3.style.width = '50px';
            input3.style.textAlign = 'center';
            plusIcon.classList = 'fas fa-plus-circle';
            plusIcon.id = 'plus';
            minusIcon.classList = 'fas fa-minus-circle';
            minusIcon.id = 'minus';

            input4.name = 'id_restaurant';
            input4.type = 'number';
            input4.value = product.id_restaurant;
            input4.id = 'id_restaurant';
            input4.style.display = 'none';

            input5.name = 'total-product';
            input5.id = 'total';
            input5.type = 'number';
            input5.value = input2.value * input3.value;
            input5.disabled = true;

            deleteIcon.classList = 'fas fa-times';
            deleteIcon.id = product.idPlato;
            
            boxProduct.appendChild(input0);
            boxProduct.appendChild(input1);
            boxProduct.appendChild(input2);
            boxProduct.appendChild(minusIcon);
            boxProduct.appendChild(input3);
            boxProduct.appendChild(plusIcon);
            boxProduct.appendChild(input4);
            boxProduct.appendChild(input5);
            boxProduct.appendChild(link);
            link.appendChild(deleteIcon);
            boxProduct.appendChild(br);
            div.appendChild(boxProduct)

        }
        
        let date = document.createElement('input');
        let comensales = document.createElement('input');
        date.id = 'date';
        date.type = 'datetime-local';
        

        /* if(element.order){
            let dataOrder = element.order;
            for (let s = 0; s < dataOrder.length; s++) {
                const data = dataOrder[s];
                if(Object.keys(data) == 'comensales'){
                    date.value = element.order[s].fecha_reserva
                    break;
                }
            }
        } */

        comensales.id = 'comensales';
        comensales.type = 'number';
        comensales.placeholder = 'cantidad de personas';
        date.name = 'date';
        comensales.name = 'comensales';
        div.appendChild(date);
        div.appendChild(comensales);
        productCartSection.appendChild(div)
        
    }

    // Calculo del costo inicial
    let input6 = document.createElement('input');
    let formShopCart = document.querySelector('#shop-cart');
    input6.type = 'number';
    input6.name = 'total';
    input6.disabled = true;
    formShopCart.appendChild(input6);
    
    let costProductSelect = 0;
    let inputsCost = productCartSection.querySelectorAll('#total');
    for (let l = 0; l < inputsCost.length; l++) {
        const itemCost = Number(inputsCost[l].value);
        costProductSelect += itemCost;
    }
    input6.value = Number(costProductSelect);
    
    //Event listener para boton de eliminar articulo del carrito y del localStorage
    let links = productCartSection.querySelectorAll('.fa-times');
    for (let k = 0; k < links.length; k++) {
        const link = links[k];
        link.addEventListener('click', (e)=>{
            
            let restaurant = e.target.parentNode.parentNode.querySelector('#id_restaurant').value;
            let index = cartUser.indexOf(cartUser.find( r => r.id == restaurant));
            let newProducts = cartUser[index].products.filter(x => x.idPlato != e.target.id);
            cartUser[index].products = newProducts;
            if(cartUser[index].products.length == 0){
                console.log(cartUser[index].products.length == 0);
                let newCartUser = cartUser.filter(u => u.id != cartUser[index].id);
                localStorage.setItem('cartProducts', JSON.stringify(newCartUser));
            } else {
                localStorage.setItem('cartProducts', JSON.stringify(cartUser));
            }
            ((e.target.parentNode).parentNode).remove();
            window.location.reload();
            
        })
    }

    // event listener para botones de sumar y restar cantidades

    let iconsPlus = document.querySelectorAll('.fa-plus-circle');
    for (let w = 0; w < iconsPlus.length; w++) {
        const iconPlus = iconsPlus[w];
        iconPlus.addEventListener('click', (e)=>{
            let quantityPlus = Number(e.target.parentNode.querySelector('#quantity').value) + 1;
            e.target.parentNode.querySelector('#quantity').value = quantityPlus;

            cartQuantity(e, quantityPlus);

            // Calculo de costo a partir de cambio de cantidades
            costCalculation(e, quantityPlus, input6);

        })
    }

    let iconsMinus = document.querySelectorAll('.fa-minus-circle');
    for (let g = 0; g < iconsMinus.length; g++) {
        const iconMinus = iconsMinus[g];
        iconMinus.addEventListener('click', (e)=>{
            let quantityPlus = Number(e.target.parentNode.querySelector('#quantity').value) - 1;
            e.target.parentNode.querySelector('#quantity').value = quantityPlus;

            cartQuantity(e, quantityPlus);

            // Calculo de costo a partir de cambio de cantidades
            costCalculation(e, quantityPlus, input6);
        
        })
    }

    let comensalesInputs = document.querySelectorAll('#comensales');
    let dateInputs = document.querySelectorAll('#date');
    let formatDate = function(date){
      /* const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; */
      let arrayTime = date.split('T');
      let arrayDate = arrayTime[0].split('-');
      /* let month = monthNames[arrayDate[1]] */
      let newDate = arrayDate[0] + '-' + arrayDate[1] + '-' + arrayDate[2] + ' ' + arrayTime[1];
      return newDate
    }

    for (let c = 0; c < comensalesInputs.length; c++) {
        const comensales = comensalesInputs[c];
        comensales.addEventListener('change', (e)=>{
            let restaurantComensales = e.target.parentNode.querySelector('#id_restaurant').value;
            let restaurantComensalesSelect = cartUser.find(b => b.id == restaurantComensales);
            let restaurantComensalesIndex = cartUser.indexOf(restaurantComensalesSelect);
            if(!cartUser[restaurantComensalesIndex].order){
                cartUser[restaurantComensalesIndex].order = [];
                cartUser[restaurantComensalesIndex].order.push ({
                    comensales: e.target.value
                })
            } else {
                let dataOrder = cartUser[restaurantComensalesIndex].order;
                for (let s = 0; s < dataOrder.length; s++) {
                    const data = dataOrder[s];
                    if(Object.keys(data) == 'comensales'){
                        cartUser[restaurantComensalesIndex].order[s] = {
                            comensales: e.target.value
                        }
                        break;
                    } else {
                        cartUser[restaurantComensalesIndex].order.push ({
                            comensales: e.target.value
                        })
                    }
                }
            }
            localStorage.setItem('cartProducts', JSON.stringify(cartUser));
        })
    }

    for (let d = 0; d < dateInputs.length; d++) {
        const dates = dateInputs[d];
        dates.addEventListener('change', (e)=>{
            let restaurantDates = e.target.parentNode.querySelector('#id_restaurant').value;
            let restaurantDatesSelect = cartUser.find(b => b.id == restaurantDates);
            let restaurantDatesIndex = cartUser.indexOf(restaurantDatesSelect);
            if(!cartUser[restaurantDatesIndex].order){
                cartUser[restaurantDatesIndex].order = [];
                cartUser[restaurantDatesIndex].order.push ({
                    fecha_reserva: formatDate(e.target.value)
                })
            } else {
                let dataOrder = cartUser[restaurantDatesIndex].order;
                for (let s = 0; s < dataOrder.length; s++) {
                    const data = dataOrder[s];
                    if(Object.keys(data) == 'fecha_reserva'){
                        cartUser[restaurantDatesIndex].order[s] = {
                            fecha_reserva: formatDate(e.target.value)
                        }
                        break;
                    } else {
                        cartUser[restaurantDatesIndex].order.push ({
                            fecha_reserva: formatDate(e.target.value)
                        })
                    }
                }
            }
            localStorage.setItem('cartProducts', JSON.stringify(cartUser));
        })
    }
    
    let shopCartButton = document.querySelector('.pay-button');
    
    shopCartButton.addEventListener('click', async (e)=> {
        /* e.preventDefault(); */
        /* const users = await (await fetch('http://localhost:8000/api/users')).json(); */
        const ordersApi = await (await fetch('http://localhost:8000/api/orders')).json();
        const lastOrderId = ordersApi.length;

        const orders = [];
        const ordersProducts = [];

        for (let a = 0; a < cartUser.length; a++) { 
            const order = cartUser[a];
            for (let s = 0; s < order.order.length; s++) {
                let data = order.order[s];
                if(Object.keys(data) == 'fecha_reserva'){
                    var fechaOrderIndex = s;
                    break;
                }
            }
            for (let t = 0; t < order.order.length; t++) {
                let data = order.order[t];
                if(Object.keys(data) == 'comensales'){
                    var comensalesOrderIndex = t;
                    break;
                }
            }
            let total = order.products.reduce((sum, t) => {return sum + (t.precio * (t.quantity? t.quantity: 1))}, 0);
            orders.push({
                idOrder: lastOrderId +1,
                id_user: 1,
                id_restaurant: cartUser[a].id,
                estado: 'Pendiente',
                comensales: cartUser[a].order[comensalesOrderIndex].comensales,
                fecha_reserva: cartUser[a].order[fechaOrderIndex].fecha_reserva,
                total: total
            })
            for (let k = 0; k < order.products.length; k++) {
                const product = order.products[k];
                ordersProducts.push({
                    id_order: lastOrderId + 1,
                    id_product: product.idPlato,
                    cantidad: (product.quantity? product.quantity: 1)
                })
            }
        }

        
        const data = JSON.stringify([{order: orders}, {ordersProducts: ordersProducts}]);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        }   
        fetch('/api/users/shop', options);
    })
    
})