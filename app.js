const express = require('express');
const app = express();
const routerproudcts = require('./api/route/products');
const routerorder = require('./api/route/order');
const morgan = require('morgan');
const bodyParser = require('body-parser');
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
app.use('/proudcts', routerproudcts);

module.exports = app;