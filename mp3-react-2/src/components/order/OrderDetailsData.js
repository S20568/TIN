import { getFormattedDate } from '../../helpers/dateHelper';
import {useTranslation} from "react-i18next";

function OrderDetailsData(props) {
    const order = props.orderData
    const orderDate = order.date ? getFormattedDate(order.date) : ""
    const { t } = useTranslation();
    return (
        <>
            <p>{t('order.fields.customerName')}: {order.customer.customerFirstName} {order.customer.customerLastName}</p>
            <p>{t('order.fields.modelName')}: {order.model.modelName} </p>
            <p>{t('order.fields.quantity')}: {order.quantity} </p>
            <p>{t('order.fields.date')}: {orderDate} </p>
            <p>{t('order.fields.orderAmount')}: {order.orderAmount} zł</p>
        </>
    )
}

export default OrderDetailsData