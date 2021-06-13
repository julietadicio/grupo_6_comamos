const express = require ('express')
const path = require ('path')

const app = express()

const publicPath = path.resolve (__dirname, './public') ;

app.listen(3030, () => { 
    console.log ("servidor corriendo en el purto 3030")
})

app.use (express.static(path.resolve(__dirname, './public')))



app.get('/register', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, './Views/register.html'));
  });
  
  
  app.get('/register2', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, './Views/register2.html'));
  });

  app.get('/register2Ok', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, './Views/register2Ok.html'));
  });

  app.get('/registerOk', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, './Views/registerOk.html'));
  });

