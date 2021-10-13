let selectTables = document.querySelector('#tables');

selectTables.addEventListener('change', (e)=> {
    console.log('estoy eligiendo una mesa');
    console.log(e.target.value);
})