const customersBaseUrl = 'http://localhost:3000/api/customers'

export function getCustomersApiCall() {
    return fetch(customersBaseUrl);
}

export function getCustomerByIdApiCall(customerId) {
    const url = `${customersBaseUrl}/${customerId}`;
    return fetch(url)
}