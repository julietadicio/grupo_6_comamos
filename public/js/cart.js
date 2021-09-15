let cartUser = JSON.parse(localStorage.getItem('cartItem'));
let productContainer = document.querySelector('.product-container');

cartUser.map(item => {
    productContainer.innerHTML+= `<article>  <p>${item[0].plato}</p> </article><a href="">Quitar Producto</a>`
    //console.log(item[0]);
})