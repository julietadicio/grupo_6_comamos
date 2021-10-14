let selectTables = document.querySelectorAll('#tables');


for (let i = 0; i < selectTables.length; i++) {
    const tables = selectTables[i];
    tables.addEventListener('change', (e)=> {
        let optionIdSelect = e.target.value;
        let allOptions = e.target.querySelectorAll('option');
        for (let a = 0; a < allOptions.length; a++) {
            const option = allOptions[a];
            if(option.id == optionIdSelect){
                let optionSelected = option.id;
                let idOrder = option.parentNode.parentNode.id;
                const structure = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({idMesa: optionSelected, idOrder: idOrder})
                }   
                fetch('/api/buisness/assignTable', structure);
                break
            }
        }
        window.location.reload();
    })
    
}
