import {getCurrentUser} from "../helpers/authHelper";

const customersBaseUrl = 'http://localhost:3000/api/customers'

export function getCustomersApiCall() {
    return fetch(customersBaseUrl);
}

export function getCustomerByIdApiCall(customerId) {
    const url = `${customersBaseUrl}/${customerId}`;
    return fetch(url)
}
export function addCustomerApiCall(customer) {
    const user = getCurrentUser()
    const customerString = JSON.stringify(customer)
    let token
    if (user && user.token) {
        token = user.token
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: customerString
    }
    return fetch(customersBaseUrl, options);
}

export function updateCustomerApiCall(customerId, customer) {
    const url = `${customersBaseUrl}/${customerId}`
    const empString = JSON.stringify(customer)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: empString
    }
    return fetch(url, options);
}