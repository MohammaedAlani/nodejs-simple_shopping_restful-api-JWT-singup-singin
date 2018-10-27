const express = require('express');
const router = express.Router();
const cheakAuth = require('../middleware/cheak-auth');
const ordercontroller = require('../controller/orders');


router.get('/' ,cheakAuth, ordercontroller.order_get_all );

router.post('/' ,cheakAuth, ordercontroller.orders_create_order);

router.get('/:orderId' ,cheakAuth, ordercontroller.orders_get_order );

router.delete('/:orderd' ,cheakAuth ,ordercontroller.orders_delete_order);


module.exports = router;
