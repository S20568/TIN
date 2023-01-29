import React from 'react';
import ModelListTableRow from './ModelListTableRow'
import {isAuthenticated} from "../../helpers/authHelper";
import {useTranslation} from "react-i18next";


function ModelListTable(props) {
    const models = props.modelList
    const { t } = useTranslation();
    return (
        <table className="table-list" >
            <thead>
            <tr>
                <th>{t('model.fields.modelName')}</th>
                <th>{t('model.fields.modelManufacturer')}</th>
                <th>{t('model.fields.modelScale')}</th>
                <th>{t('model.fields.modelPrice')}</th>
                {isAuthenticated() &&
                    <th>{t('list.actions.title')}</th>
                }
            </tr>
            </thead>
            <tbody>
            {models.map(model =>
                <ModelListTableRow modelData={model} key={model._id} />
            )}
            </tbody>
        </table >
    )
}

export default ModelListTable