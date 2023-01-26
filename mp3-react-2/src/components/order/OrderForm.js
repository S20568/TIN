import { Link } from 'react-router-dom'
import { getCustomersApiCall } from '../../apiCalls/customerApiCalls'
import { getModelsApiCall } from '../../apiCalls/modelApiCalls'

function OrderForm() {
    const allCustomers = getCustomersApiCall()
    const allModels = getModelsApiCall()

    return (
        <main>
            <h2>Nowe zamówienie</h2>
            <form className="form">

                <label htmlFor="customer">Klient: <abbr title="required" aria-label="required">*</abbr></label>
                <select id="customer" name="customerId" required>
                    <option value="">--- Wybierz klienta ---</option>
                    {allCustomers.map(customer =>
                        (<option key={customer._id} value={customer._id} label={customer.customerFirstName + " " + customer.customerLastName}></option>)
                    )}
                </select>
                <span id="errorCustomer" className="errors-text"></span>

                <label htmlFor="model">Departament: <abbr title="required" aria-label="required">*</abbr></label>
                <select id="model" name="modelId" required>
                    <option value="">--- Wybierz model ---</option>
                    {allModels.map(model =>
                        (<option key={model._id} value={model._id} label={model.modelName}></option>)
                    )}
                </select>
                <span id="errorModel" className="errors-text"></span>

                <label htmlFor="quantity">Ilość</label>
                <input type="text" name="quantity" value="" id="quantity" placeholder="min. 1" />
                <span id="errorQuantity" className="errors-text"></span>

                <label htmlFor="date">Data zamówienia</label>
                <input type="date" name="date" value="" id="date" />
                <span id="errorDate" className="errors-text"></span>

                <div className="form-buttons">
                    <p id="errorsSummary" className="errors-text"></p>
                    <input className="form-button-submit" type="submit" value="Dodaj" />
                    <Link to="/order" className="form-button-cancel">Anuluj</Link>
                </div>
            </form>
        </main>
    )
}

export default OrderForm