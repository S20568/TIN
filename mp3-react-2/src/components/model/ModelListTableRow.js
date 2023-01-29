import { Link } from 'react-router-dom';
import {isAuthenticated} from "../../helpers/authHelper";
import {useTranslation} from "react-i18next";

function ModelListTableRow(props) {
    const model = props.modelData
    const { t } = useTranslation();
    return (
        <tr>
            <td>{model.modelName}</td>
            <td>{model.modelManufacturer}</td>
            <td>{model.modelScale}</td>
            <td>{model.modelPrice} zł</td>
            {isAuthenticated() &&
            <td>
                <ul className="list-actions">
                    <li><Link to={`/models/details/${model._id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/models/edit/${model._id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    <li><Link to={`/models/delete/${model._id}`} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                </ul>
            </td>
            }
        </tr>
    )
}

export default ModelListTableRow