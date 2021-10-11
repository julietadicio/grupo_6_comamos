
window.addEventListener('load', () => {
    let searchButton = document.querySelector('#boton-buscar');
    let searchBar = document.querySelector('#search-bar');

    searchButton.addEventListener('click', (e)=>{
        e.preventDefault();
        let resultValue1 = e.target.parentNode.querySelector('#busqueda1').value;
        e.target.parentNode.action = `http://localhost:8000/product/${resultValue1}`;
        searchBar.submit();
    })

})
