import React, {useEffect, useState} from "react"
import { Link } from 'react-router-dom'
import { getOrdersApiCall } from "../../apiCalls/orderApiCalls";
import OrderListTable from "./OrderListTable";

function OrderList() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [orders, setOrders] = useState([])
    let content;

    function fetchEmploymentsList() {
        getOrdersApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setOrders(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchEmploymentsList()
    }, [])

    if (error) {
        content = <p>Błąd: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Ładowanie zamówień...</p>
    } else if (orders.length === 0) {
        content = <p>Brak zamówień.</p>
    } else {
        content = <OrderListTable ordersList={orders} />
    }

    return (
        <main>
            <h2>Zamówienia</h2>
            { content }
            <p className="form-buttons">
                <Link to="/orders/add" className="button-add">Dodaj nowe zamówienie</Link>
            </p>
        </main>
    )
}

export default OrderList