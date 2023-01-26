import { Link } from "react-router-dom"

function CustomerForm() {
    return (
        <main>
            <h2>Nowy klient</h2>
            <form className="form">
                <label htmlFor="customerFirstName">Imię:<abbr title="required" aria-label="required">*</abbr></label>
                <input type="text" name="customerFirstName" id="customerFirstName" placeholder="2-20 znaków" value="" />
                <span id="errorCustomerFirstName" className="errors-text"></span>

                <label htmlFor="customerLastName">Nazwisko:<abbr title="required" aria-label="required">*</abbr></label>
                <input type="text" name="customerLastName" id="customerLastName" placeholder="2-30 znaków" value="" />
                <span id="errorCustomerLastName" className="errors-text"></span>

                <label htmlFor="customerEmail">Email:<abbr title="required" aria-label="required">*</abbr></label>
                <input type="text" name="customerEmail" id="customerEmail" placeholder="np. nazwa@domena.pl" value="" />
                <span id="errorCustomerEmail" className="errors-text"></span>

                <label htmlFor="customerPhoneNumber">Numer telefonu:<abbr title="required" aria-label="required">*</abbr></label>
                <input type="text" name="customerPhoneNumber" id="customerPhoneNumber" placeholder="np +48123456789" value="" />
                <span id="errorCustomerPhoneNumber" className="errors-text"></span>

                <div className="form-buttons">
                    <p id="errorsSummary" className="errors-text"></p>
                    <input className="form-button-submit" type="submit" value="Dodaj" />
                    <Link to="/customers" className="form-button-cancel">Anuluj</Link>
                </div>
            </form>
        </main >
    )
}

export default CustomerForm