const express = require('express');
const app = express();
const routerproudcts = require('./api/route/products');
const routerorder = require('./api/route/orders');
const userRoute = require('./api/route/user');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoos = require('mongoose');



mongoos.connect('mongodb://mohammed:1212momo@cluster0-shard-00-00-nyfo3.mongodb.net:27017,cluster0-shard-00-01-nyfo3.mongodb.net:27017,cluster0-shard-00-02-nyfo3.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',{ useNewUrlParser: true })
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Origin, X-Requsted-With, Content-Type, Accept, Authorization');

if (req.method === 'OPTIONS') {
    res.header('Acess-Control-Allow-Methods' , 'PUT,POST,PATCH,DELETE,GET');
    return res.status(200).json({});
};
next();
});
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/order', routerorder);
app.use(morgan('dev'));
app.use('/user', userRoute);
app.use('/proudcts', routerproudcts);
app.use('/uploads', express.static('uploads'));
mongoos.Promise = global.Promise;
module.exports = app;