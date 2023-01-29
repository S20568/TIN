import { Link } from 'react-router-dom';
import FormMode, {getValidationErrorKey} from '../../helpers/formHelper'
import {useTranslation} from "react-i18next";

function FormButtons(props) {

    const { t } = useTranslation();
    let translatedErrorMessage = ''
    const error = props.error
    if (error) {
        const errorKey = getValidationErrorKey(error)
        translatedErrorMessage = t(errorKey)
    }

    const submitButtonLabel = props.formMode === FormMode.NEW ? t('form.actions.add') : t('form.actions.edit')

    return (
        <div className="form-buttons">
            <p id="errorsSummary" className="errors-text">{translatedErrorMessage}</p>
            <input className="form-button-submit" type="submit" value={submitButtonLabel} />
            <Link to={props.cancelPath} className="form-button-cancel">{t('form.actions.cancel')}</Link>
        </div>
    )
}

export default FormButtons