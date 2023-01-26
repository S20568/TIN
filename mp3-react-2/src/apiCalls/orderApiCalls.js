const ordersBaseUrl = 'http://localhost:3000/api/orders'

export function getOrdersApiCall() {
    return fetch(ordersBaseUrl);
}

export function getOrderByIdApiCall(orderId) {
    const url = `${ordersBaseUrl}/${orderId}`;
    return fetch(url);
}