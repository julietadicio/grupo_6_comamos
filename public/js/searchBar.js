
window.addEventListener('load', () => {
    let searchButton = document.querySelector('#boton-buscar');
    let searchBar = document.querySelector('#search-bar');

    searchButton.addEventListener('click', (e) => {
        let resultValue1 = e.target.parentNode.querySelector('#busqueda1').value;
        let resultValue2 = e.target.parentNode.querySelector('#busqueda2').value;

        if (resultValue1.length > 1) {
            e.preventDefault();
            e.target.parentNode.action = `http://localhost:8000/product/search/${resultValue1}`;
            searchBar.submit();
        } else if (resultValue2.length > 1){
            e.target.parentNode.action = `http://localhost:8000/product/search/${resultValue2}`;
            searchBar.submit();
        }
        
        
        
        

        
    })

})
