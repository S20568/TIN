import { Link } from "react-router-dom"
import {getFormattedDate} from "../../helpers/dateHelper";

function OrderListTableRow(props) {
    const order = props.orderData
    return (
        <tr>
            <td>{order.customer.customerFirstName} {order.customer.customerLastName}</td>
            <td>{order.model.modelName}</td>
            <td>{order.quantity}</td>
            <td>{order.date ? getFormattedDate(order.date) : ""}</td>
            <td>{order.orderAmount}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/orders/details/${order._id}`} className="list-actions-button-details">Szczegóły</Link></li>
                    <li><Link to={`/orders/edit/${order._id}`} className="list-actions-button-edit">Edytuj</Link></li>
                    <li><Link to={`/orders/delete/${order._id}`} className="list-actions-button-delete">Usuń</Link></li>
                </ul>
            </td>
        </tr>
    )
}

export default OrderListTableRow