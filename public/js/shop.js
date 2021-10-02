window.addEventListener('load', async () => {
    let carts = document.querySelectorAll('.btn');

    let products = await (await fetch ('http://localhost:8000/api/products')).json();
    /* let cartProducts = []; */
    
    for (let i= 0; i< carts.length; i++) {
        carts[i].addEventListener('click', () => {
            let nameProduct = carts[i].parentElement.querySelector('h3').innerText;
            let productSelect = products.filter(p => p.plato == nameProduct);
            /* if(localStorage.getItem('cartItem')){
                cartProducts = JSON.parse(localStorage.getItem('cartItem'));
            }
            console.log(productSelect);
            cartProducts.push(productSelect) */
            localStorage.setItem('cartItem', JSON.stringify(productSelect))
            window.location.href = 'http://localhost:8000/user/carrito';
        })     
    }
    /* 
    function onLoadCartNumbers () {
        let productNumbers = Number(localStorage.getItem('cartNumbers'));
        if (productNumbers) {
            document.querySelector('#align-header > section > div:nth-child(1) > a > i > span').textContent = productNumbers;
        }
    }
    
    function cartNumbers () {
        //console.log('el producto elegido es ');
        let productNumbers = Number(localStorage.getItem('cartNumbers'));
        if (productNumbers) {
            localStorage.setItem('cartNumbers', productNumbers + 1);
            document.querySelector('#align-header > section > div:nth-child(1) > a > i > span').textContent = productNumbers + 1;
        } else {
            localStorage.setItem('cartNumbers', 1);
            document.querySelector('#align-header > section > div:nth-child(1) > a > i > span').textContent = 1;
        }
    }
    
    onLoadCartNumbers(); */
})
    
