import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getModelByIdApiCall } from '../../apiCalls/modelApiCalls'
import { getFormattedDate } from '../../helpers/dateHelper'

function ModelDetails() {
    let { modelId } = useParams()
    modelId = parseInt(modelId)
    const model = getModelByIdApiCall(modelId)

    return (
        <main>
            <h2>Szczegóły modelu</h2>
            <p>Nazwa: {model.modelName}</p>
            <p>Producent: {model.modelManufacturer} </p>
            <p>Skala: {model.modelScale} </p>
            <p>Cena: {model.modelPrice} </p>
            <h2>Historia zamówień</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Klient</th>
                    <th>Ilość</th>
                    <th>Data zamówienia</th>
                    <th>Kwota zamówienia</th>
                </tr>
                </thead>
                <tbody>
                {model.orders.map(
                    order =>
                        <tr key={order._id}>
                            <td>{order.customer.customerFirstName} {order.customer.customerLastName}</td>
                            <td>{order.quantity}</td>
                            <td>{order.date ? getFormattedDate(order.date) : ""}</td>
                            <td>{order.orderAmount} zł</td>
                        </tr>
                )}
                </tbody>
            </table>
            <div className="form-buttons">
                <Link to="/models" className="button-back">Powrót</Link>
            </div>
        </main>
    )
}
export default ModelDetails