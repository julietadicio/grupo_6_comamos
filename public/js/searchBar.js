
window.addEventListener('load', async () => {
    let queryProduct = new URLSearchParams(location.search);
    let queryRestaurant = new URLSearchParams(location.search);
    let queryCategory = new URLSearchParams(location.search);
    
    let searchProduct = queryProduct.get('busqueda1');
    let searchRestaurant = queryRestaurant.get('busqueda2');
    let searchCategory = queryCategory.get('filtrar');

    const productsApi = await (await fetch('http://localhost:8000/api/products')).json();
    const buisnessApi = await (await fetch('http://localhost:8000/api/buisness')).json();
    let productsCategory = [];


    let productDisplay = function (category, filter) {
        let categoryHtml = document.querySelector(`#${category}`);
        let swiperElement = categoryHtml.parentNode.querySelector('.swiper-wrapper');

        if(searchRestaurant != ''){
            let buisnessFilter = buisnessApi.filter( b=> (
                (b.nombre.toLocaleLowerCase()).includes(searchRestaurant.toLocaleLowerCase())
                || (b.direccion.toLocaleLowerCase()).includes(searchRestaurant.toLocaleLowerCase())
                )
            )
            let arrayBuisnessId = [];
            for (let r = 0; r < buisnessFilter.length; r++) {
                const buisness = buisnessFilter[r];
                arrayBuisnessId.push(buisness.idRestaurant);
            }
            let productsByRestaurant = [];
            for (let b = 0; b < arrayBuisnessId.length; b++) {
                const buisnessId = arrayBuisnessId[b];
                productsApi.forEach(product => {
                    if(product.id_restaurant == buisnessId){
                        productsByRestaurant.push(product)
                    }
                });
            }
            productsCategory = productsByRestaurant.filter(p => p.categoria == filter);
        } else {
            productsCategory = productsApi.filter(p => p.categoria == filter);
        }

        let productsFilter = [];
        if(searchProduct != ''){
            productsFilter = productsCategory.filter(z => (
                (z.plato.toLowerCase()).includes(searchProduct.toLocaleLowerCase())
                || (z.descripcion.toLowerCase()).includes(searchProduct.toLocaleLowerCase())
                )
            )
        } else {
            productsFilter = productsCategory;
        }
        
        for (let i = 0; i < productsFilter.length; i++) {
            const plato = productsFilter[i];
            
            let swiperSlide = document.createElement('div');
            swiperSlide.classList = 'swiper-slide';

            let imgProduct = document.createElement('img');
            imgProduct.src = plato.imagen;
            imgProduct.id = plato.idPlato;
            let h4Product = document.createElement('h4');
            h4Product.classList = 'product-name';
            h4Product.innerText = plato.plato;
            let h5Product = document.createElement('h5');
            h5Product.classList = 'product-price';
            h5Product.innerText = plato.precio;

            swiperSlide.appendChild(imgProduct);
            swiperSlide.appendChild(h4Product);
            swiperSlide.appendChild(h5Product);

            swiperElement.appendChild(swiperSlide);
        }
    }
    if(searchCategory != 'filtra'){
        if(searchCategory == 'Plato Principal'){
            productDisplay('Plato-Principal', searchCategory);
        }
        productDisplay(searchCategory, searchCategory);
    } else {
        productDisplay('Entrada', 'Entrada');
        productDisplay('Plato-Principal', 'Plato Principal');
        productDisplay('Postre', 'Postre');
        productDisplay('Bebida', 'Bebida');
    }

    let imgProducts = document.querySelectorAll('img');
    for (let x = 0; x < imgProducts.length; x++) {
        let imgProduct = imgProducts[x];
        imgProduct.addEventListener('click', (e)=>{
            window.location.href = `/product/${imgProduct.id}`;
        })
    }
})
