import {Link} from "react-router-dom";
import { getModelsApiCall } from '../../apiCalls/modelApiCalls'
import {useEffect, useState} from "react";
import ModelListTable from "./ModelListTable";
import {isAuthenticated} from "../../helpers/authHelper";
import {useTranslation} from "react-i18next";

function ModelList() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [models, setModels] = useState([])
    const { t } = useTranslation();

    function fetchModelList() {
        getModelsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setModels(data)
                },
                (error) => {
                    setIsLoaded(false)
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchModelList()
    }, [])

    let content;

    if (error) {
        content = <p> {t('form.validation.error_short')}: {error.message} </p>
    } else if (!isLoaded) {
        content = <p> {t('model.form.details.loading')} </p>
    } else {
        content = <ModelListTable modelList={models} />
    }

    return (
        <main>
            <h2>{t('model.list.title')}</h2>
            { content }
            {isAuthenticated() &&
            <p><Link to="/models/add" className="button-add">{t('model.list.addNew')}</Link></p>
            }
        </main>
    )
}

export default ModelList