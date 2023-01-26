import { getFormattedDate } from "../../helpers/dateHelper"

function CustomerDetailsData(props) {
    const customer = props.customer
    return (
        <>
            <p>Imię: {customer.customerFirstName} </p>
            <p>Nazwisko: {customer.customerLastName} </p>
            <p>E-mail: {customer.customerEmail} </p>
            <p>Numer telefonu: {customer.phoneNumber} </p>
            <h2>Historia zamówień</h2>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>Model</th>
                        <th>Ilość</th>
                        <th>Data zamówienia</th>
                        <th>Kwota zamówienia</th>
                    </tr>
                </thead>
                <tbody>
                {customer.orders.map(
                    order =>
                        <tr key={order._id}>
                            <td>{order.model.modelName}</td>
                            <td>{order.quantity}</td>
                            <td>{order.date ? getFormattedDate(order.date) : ""}</td>
                            <td>{order.orderAmount}</td>
                        </tr>
                )}
                </tbody>
            </table>
        </>
    )
}

export default CustomerDetailsData