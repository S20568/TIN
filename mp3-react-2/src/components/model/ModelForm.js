import { Link } from "react-router-dom"

function ModelForm() {
    return (
        <main>
            <h2>Nowy model</h2>
            <form className="form">
                <label htmlFor="modelName">Nazwa:<abbr title="required" aria-label="required">*</abbr></label>
                <input type="text" name="modelName" id="modelName" placeholder="2-50 znaków" value="" />
                <span id="errorModelName" className="errors-text"></span>

                <label htmlFor="modelManufacturer">Producent:<abbr title="required" aria-label="required">*</abbr></label>
                <input type="text" name="modelManufacturer" id="modelManufacturer" placeholder="2-30 znaków" value="" />
                <span id="errorModelManufacturer" className="errors-text"></span>

                <label htmlFor="modelScale">Skala:<abbr title="required" aria-label="required">*</abbr></label>
                <input type="text" name="modelScale" id="modelScale" placeholder="np. 1:18, 1:43" value="" />
                <span id="errorModelScale" className="errors-text"></span>

                <label htmlFor="modelPrice">Cena:<abbr title="required" aria-label="required">*</abbr></label>
                <input type="number" name="modelPrice" id="modelPrice" placeholder="min. 80, max. 1500" value="" />
                <span id="errorModelPrice" className="errors-text"></span>

                <div className="form-buttons">
                    <p id="errorsSummary" className="errors-text"></p>
                    <input className="form-button-submit" type="submit" value="Dodaj" />
                    <Link to="/models" className="form-button-cancel">Anuluj</Link>
                </div>
            </form>
        </main >
    )
}

export default ModelForm