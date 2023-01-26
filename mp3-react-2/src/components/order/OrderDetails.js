import {Link, useParams} from "react-router-dom";
import {getOrderByIdApiCall } from "../../apiCalls/orderApiCalls"
import React, {useEffect, useState} from "react";
import OrderDetailsData from "./OrderDetailsData";

function OrderDetails() {
    const [order, setOrder] = useState({})
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)

    let { orderId } = useParams()
    orderId = parseInt(orderId)

    function fetchOrderDetails() {
        getOrderByIdApiCall(orderId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setOrder(null)
                        setMessage(data.message)
                    } else {
                        setOrder(data)
                        setMessage(null)
                    }
                    setIsLoaded(true)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchOrderDetails()
    }, [])

    let content

    if (error) {
        content = <p>Błąd: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Ładowanie zamówień...</p>
    } else if (message) {
        content = <p>{message}</p>
    } else {
        content = <OrderDetailsData orderData={order} />
    }

    return (
        <main>
            <h2> Zamówienia </h2>
            { content }
            <div className="form-buttons">
                <Link to="/orders" className="button-back">Powrót</Link>
            </div>
        </main>
    )
}
export default OrderDetails