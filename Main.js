const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const {DatabaseConnector} = require("./DatabaseConnector");
const {join} = require("path");
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const address = 'http://192.168.1.25'
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', address+':3000')
    res.header('Access-Control-Allow-Methods','POST, GET, PUT, PATCH, DELETE, OPTIONS')
    next()
})


const port = 8000;

const initData ={"results":[{"gender":"male","name":{"title":"Mr","first":"Fernando","last":"Gallardo"},"location":{"street":{"number":5521,"name":"Avenida de Castilla"},"city":"San Sebastián de Los Reyes","state":"Extremadura","country":"Spain","postcode":32001,"coordinates":{"latitude":"-25.0303","longitude":"-48.0848"},"timezone":{"offset":"+5:45","description":"Kathmandu"}},"email":"fernando.gallardo@example.com","login":{"uuid":"54c81c93-1578-4979-8384-0a356c6f0696","username":"orangefish102","password":"cattle","salt":"gvDILEJG","md5":"09340b94f197bdc94da6ccbbce9a5f0f","sha1":"f68614e31a446e87eb59d635cfc917f80300367f","sha256":"2f07635a83004bdf1bcfc12f7c4d45abb3412e3958093ba771fe2a26d38acf7a"},"dob":{"date":"1979-08-26T23:23:41.211Z","age":42},"registered":{"date":"2006-07-23T13:55:48.365Z","age":15},"phone":"937-490-453","cell":"623-906-611","id":{"name":"DNI","value":"24697449-K"},"picture":{"large":"https://randomuser.me/api/portraits/men/33.jpg","medium":"https://randomuser.me/api/portraits/med/men/33.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/33.jpg"},"nat":"ES"}],"info":{"seed":"f1233c14ad41c665","results":1,"page":1,"version":"1.3"}}

console.log('Starting server');
//app.use(express.static(path.join(__dirname,'build')));

app.get('/send',function (req,res){
    res.send(initData)
});

app.get('/json',function (req,res){
    res.json(initData)
});

app.get('/test',function (req,res) {
    res.sendFile(path.join(__dirname,'public/index.html'))
})


// respond with "hello world" when a GET request is made to the homepage
app.get('/hello', function (req, res) {
    res.send('hello world')
})

console.log('server start on port : '+port);
app.listen(port);

console.log('Connecting Database');
const dbConnector = new DatabaseConnector();

app.get('/database', function (req, res) {
    dbConnector.GetData(function (error,result){
        if (error){}
        else {
            this.result = result;
            res.send(result);
        }
    });
})

app.get('/category', function (req, res) {
    dbConnector.GetData(function (error,result){
        if (error){}
        else {
            this.result = result;
            res.send(result);
        }
    });
})

app.post('/add_product',function (req,res){
    console.log(req.formData);
})

app.get('/product',function (req,res) {
    dbConnector.GetProduct(req.query.barcode,function (error,result){
        if (error){}
        else {
            this.result = result;
            res.send(result);
        }
    });
})

console.log('database api: '+address+':8000/database');