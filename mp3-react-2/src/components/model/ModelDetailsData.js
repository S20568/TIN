import { getFormattedDate } from "../../helpers/dateHelper"
import {useTranslation} from "react-i18next";

function ModelDetailsData(props) {
    const model = props.modelData;
    const { t } = useTranslation();
    return (
        <>
            <p>{t('model.fields.modelName')}: {model.modelName} </p>
            <p>{t('model.fields.modelManufacturer')}: {model.modelManufacturer} </p>
            <p>{t('model.fields.modelScale')}: {model.modelScale} </p>
            <p>{t('model.fields.modelPrice')}: {model.modelPrice} </p>
            <h2>{t('model.form.order')}</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('model.form.details.customer')}</th>
                    <th>{t('order.fields.quantity')}</th>
                    <th>{t('order.fields.date')}</th>
                    <th>{t('order.fields.orderAmount')}</th>
                </tr>
                </thead>
                <tbody>
                {model.orders.map(
                    order =>
                        <tr key={order._id}>
                            <td>{order.customer.customerFirstName} {order.customer.customerLastName}</td>
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

export default ModelDetailsData