import { Link } from 'react-router-dom';
import {useTranslation} from "react-i18next";
import { isAuthenticated } from '../../helpers/authHelper'

function CustomerListTableRow(props) {
    const customer = props.customerData
    const { t } = useTranslation();
    return (
        <tr>
            <td>{customer.customerFirstName}</td>
            <td>{customer.customerLastName}</td>
            <td>{customer.customerEmail}</td>
            <td>{customer.phoneNumber}</td>
            {isAuthenticated() &&
            <td>
                <ul className="list-actions">
                    <li><Link to={`/customers/details/${customer._id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/customers/edit/${customer._id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    <li><Link to={`/customers/delete/${customer._id}`} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                </ul>
            </td>
            }
        </tr>
    )
}

export default CustomerListTableRow