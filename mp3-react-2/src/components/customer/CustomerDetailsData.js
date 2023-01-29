import { getFormattedDate } from "../../helpers/dateHelper"
import {useTranslation} from "react-i18next";

function CustomerDetailsData(props) {
    const customer = props.customerData
    const { t } = useTranslation();
    return (
        <>
            <p>{t('customer.fields.customerFirstName')}: {customer.customerFirstName} </p>
            <p>{t('customer.fields.customerLastName')}: {customer.customerLastName} </p>
            <p>{t('customer.fields.customerEmail')}: {customer.customerEmail} </p>
            <p>{t('customer.fields.phoneNumber')}: {customer.phoneNumber} </p>
            <h2>{t('customer.form.order')}</h2>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>{t('customer.form.details.model')}</th>
                        <th>{t('order.fields.quantity')}</th>
                        <th>{t('order.fields.date')}</th>
                        <th>{t('order.fields.orderAmount')}</th>
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