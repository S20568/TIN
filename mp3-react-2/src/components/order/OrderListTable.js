import OrderListTableRow from './OrderListTableRow'
import {useTranslation} from "react-i18next";
import React from "react";

function OrderListTable(props) {
    const orders = props.ordersList
    const { t } = useTranslation();
    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('order.fields.customerName')}</th>
                    <th>{t('order.fields.modelName')}</th>
                    <th>{t('order.fields.quantity')}</th>
                    <th>{t('order.fields.date')}</th>
                    <th>{t('order.fields.orderAmount')}</th>
                    <th>{t('list.actions.title')}</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order =>
                    <OrderListTableRow orderData={order} key={order._id} />
                )}
            </tbody>
        </table>
    )
}

export default OrderListTable