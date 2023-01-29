import {Link, useParams} from "react-router-dom";
import {getOrderByIdApiCall } from "../../apiCalls/orderApiCalls"
import React, {useEffect, useState} from "react";
import OrderDetailsData from "./OrderDetailsData";
import {useTranslation} from "react-i18next";

function OrderDetails() {
    const [order, setOrder] = useState({})
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)

    const { t } = useTranslation();

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
        content = <p>{t('form.validation.error_short')}: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('order.form.details.loading')}</p>
    } else if (message) {
        content = <p>{message}</p>
    } else {
        content = <OrderDetailsData orderData={order} />
    }

    return (
        <main>
            <h2> {t('order.form.details.pageTitle')} </h2>
            { content }
            <div className="form-buttons">
                <Link to="/orders" className="button-back">{t('form.actions.return')}</Link>
            </div>
        </main>
    )
}
export default OrderDetails