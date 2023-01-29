const ordersBaseUrl = 'http://localhost:3000/api/orders'

export function getOrdersApiCall() {
    return fetch(ordersBaseUrl);
}

export function getOrderByIdApiCall(orderId) {
    const url = `${ordersBaseUrl}/${orderId}`;
    return fetch(url);
}

export function addOrderApiCall(order) {
    const orderString = JSON.stringify(order)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: orderString
    }
    return fetch(ordersBaseUrl, options);
}

export function updateOrderApiCall(orderId, order) {
    const url = `${ordersBaseUrl}/${orderId}`
    const empString = JSON.stringify(order)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: empString
    }
    return fetch(url, options);
}