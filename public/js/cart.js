window.addEventListener('load', async () => {

    let cartUser = JSON.parse(localStorage.getItem('cartItem'));
    let restaurantName = document.querySelector('#restaurant-name');
    let restaurantAddress = document.querySelector('#restaurant-address');
    let productCartSection = document.querySelector('#product-cart-section');

    let buisness = await (await fetch (`http://localhost:8000/api/buisness/${cartUser[0].id_restaurant}`)).json();

    restaurantName.innerText = buisness.nombre;
    restaurantAddress.innerText = buisness.direccion;

    let a = document.createElement("a");
    let p = document.createElement("p");
    let article = document.createElement("article");
    let productName = document.createTextNode(cartUser[0].plato);
    let deleteProduct = document.createTextNode('Quitar producto');


    p.appendChild(productName);
    a.appendChild(deleteProduct);
    article.appendChild(p);
    article.appendChild(a);
    productCartSection.appendChild(article)
})