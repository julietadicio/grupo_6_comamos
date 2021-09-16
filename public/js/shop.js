window.addEventListener('load', async () => {

    let cart = document.querySelectorAll('.btn');

    let products = await JSON.stringify((await fetch ('http://localhost:8000/api/products')));
    
    
    for (let i= 0; i< cart.length; i++) {
        cart[i].addEventListener('click', () => {
            cartNumbers ();
        })     
    }
})

function cartNumbers () {
    let productNumbers = Number(localStorage.getItem('cartNumbers'));
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
    } else {
        localStorage.setItem('cartNumbers', 1);
    }
}