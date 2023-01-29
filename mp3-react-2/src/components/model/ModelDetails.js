import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { getModelByIdApiCall } from '../../apiCalls/modelApiCalls'
import ModelDetailsData from "./ModelDetailsData";
import {useTranslation} from "react-i18next";

function ModelDetails() {
    const [model, setModel] = useState({})
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)

    const { t } = useTranslation();

    let { modelId } = useParams()
    modelId = parseInt(modelId)

    function fetchModelDetails() {
        getModelByIdApiCall(modelId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setModel(null)
                        setMessage(data.message)
                    } else {
                        setModel(data)
                        setMessage(null)
                    }
                    setIsLoaded(true)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchModelDetails()
    }, [])

    let content;

    if (error) {
        content = <p>{t('form.validation.error_short')}: {error.message}</p>
    } else if (!isLoaded) {
        content = <p> {t('model.form.details.loading')} </p>
    } else if (message) {
        content = <p>{message}</p>
    } else {
        content = <ModelDetailsData modelData={model} />
    }

    return (
        <main>
            <h2>{t('model.form.details.pageTitle')}</h2>
            { content }
            <div className="form-buttons">
                <Link to="/models" className="button-back">{t('form.actions.return')}</Link>
            </div>
        </main>
    )
}
export default ModelDetails