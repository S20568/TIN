import React, {useEffect, useState} from "react"
import { Link } from 'react-router-dom'
import { getOrdersApiCall } from "../../apiCalls/orderApiCalls";
import OrderListTable from "./OrderListTable";
import {useTranslation} from "react-i18next";

function OrderList() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [orders, setOrders] = useState([])
    let content;
    const { t } = useTranslation();

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
        content = <p>{t('form.validation.error_short')}: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('order.form.details.loading')}</p>
    } else if (orders.length === 0) {
        content = <p>{t('order.list.noData')}</p>
    } else {
        content = <OrderListTable ordersList={orders} />
    }

    return (
        <main>
            <h2>{t('order.list.title')}</h2>
            { content }
            <p className="form-buttons">
                <Link to="/orders/add" className="button-add">{t('order.list.addNew')}</Link>
            </p>
        </main>
    )
}

export default OrderList