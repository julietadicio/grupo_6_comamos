const express = require ('express')
const path = require ('path')

const app = express()

const publicPath = path.resolve (__dirname, './public') ;

app.listen(3030, () => { 
    console.log ("servidor corriendo en el purto 3030")
})

app.use (express.static(path.resolve(__dirname, './public')))



app.get('/login', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, './Views/login.html'));
  });
  
  
  app.get('/loginNegocio', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, './Views/loginNegocio.html'));
  });
