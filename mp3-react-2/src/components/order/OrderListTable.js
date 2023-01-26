import OrderListTableRow from './OrderListTableRow'

function OrderListTable(props) {
    const orders = props.ordersList
    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>Klient</th>
                    <th>Model</th>
                    <th>Ilość</th>
                    <th>Data zamówienia</th>
                    <th>Kwota zamówienia</th>
                    <th>Akcje</th>
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