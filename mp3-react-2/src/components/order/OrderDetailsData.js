import { getFormattedDate } from '../../helpers/dateHelper';

function OrderDetailsData(props) {
    const order = props.orderData
    const orderDate = order.date ? getFormattedDate(order.date) : ""
    return (
        <>
            <p>Klient: {order.customer.customerFirstName} {order.customer.customerFirstName}</p>
            <p>Model: {order.model.modelName} </p>
            <p>Ilość: {order.quantity} </p>
            <p>Data zamówienia: {orderDate} </p>
            <p>Kwota zamówienia: {order.orderAmount} zł</p>
        </>
    )
}

export default OrderDetailsData