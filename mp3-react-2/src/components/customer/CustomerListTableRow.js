import { Link } from 'react-router-dom';

function CustomerListTableRow(props) {
    const customer = props.customerData
    return (
        <tr>
            <td>{customer.customerFirstName}</td>
            <td>{customer.customerLastName}</td>
            <td>{customer.customerEmail}</td>
            <td>{customer.phoneNumber}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/customers/details/${customer._id}`} className="list-actions-button-details">Szczegóły</Link></li>
                    <li><Link to={`/customers/edit/${customer._id}`} className="list-actions-button-edit">Edytuj</Link></li>
                    <li><Link to={`/customers/delete/${customer._id}`} className="list-actions-button-delete">Usuń</Link></li>
                </ul>
            </td>
        </tr>
    )
}

export default CustomerListTableRow