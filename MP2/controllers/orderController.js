const OrderRepository = require("../repository/sequelize/OrderRepository");

exports.showOrderList = (req, res, next) => {
    OrderRepository.getOrders()
        .then(orders => {
            res.render('pages/order/list', {
                orders: orders,
                navLocation: 'order',
                validationErrors: []
            });
        });
}