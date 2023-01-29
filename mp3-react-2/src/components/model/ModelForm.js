import {Link, useNavigate, useParams} from "react-router-dom"
import FormMode from "../../helpers/formHelper";
import {addModelApiCall, getModelByIdApiCall, updateModelApiCall} from "../../apiCalls/modelApiCalls";
import {
    checkEmail, checkModelPrice,
    checkModelScale,
    checkPhoneNumber,
    checkRequired,
    checkTextLengthRange
} from "../../helpers/validationCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import {useEffect, useState} from "react";
import { formValidationKeys } from '../../helpers/formHelper'
import {useTranslation} from "react-i18next";

function ModelForm() {

    const [model, setModel] = useState({
        'modelName': '',
        'modelManufacturer': '',
        'modelScale': '',
        'modelPrice': ''
    })
        const [errors, setErrors] = useState({
        'modelName': '',
        'modelManufacturer': '',
        'modelScale': '',
        'modelPrice': ''
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const { modelId } = useParams()
    const currentFormMode = modelId ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate()

    const { t } = useTranslation();

    function fetchModelDetails() {
        getModelByIdApiCall(modelId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
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
                })
    }

    useEffect(() => {
        if (currentFormMode === FormMode.EDIT) {
        fetchModelDetails()
    }
    }, [])

    function handleChange(event) {
        const { name, value } = event.target
        const errorMessage = validateField(name, value)
        setErrors({
            ...errors,
            [name]: errorMessage
        })
        setModel({
            ...model,
            [name]: value
        })
    }

    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if (fieldName === 'modelName') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 50)) {
                errorMessage = formValidationKeys.len_2_50
            }
        }
        if (fieldName === 'modelManufacturer') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 30)) {
                errorMessage = formValidationKeys.len_2_30
            }
        }
        if (fieldName === 'modelScale') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkModelScale(fieldValue)) {
                errorMessage = formValidationKeys.inputError
            }
        }
        if (fieldName === 'modelPrice') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkModelPrice(fieldValue)) {
                errorMessage = formValidationKeys.inputError
            }
        }
        return errorMessage;
    }

    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            let promise, response
            if (currentFormMode === FormMode.NEW) {
                promise = addModelApiCall(model)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateModelApiCall(modelId, model)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        }
                    )
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                const serverFieldsErrors = {...errors}
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    serverFieldsErrors[fieldName] = errorMessage
                                }
                                setErrors(serverFieldsErrors)
                                setError(null)
                            } else {
                                setRedirect(true)
                            }
                        },
                        (error) => {
                            setError(error)
                        }
                    )
            }
        }
    }

    function hasErrors() {
        let hasErrors = false
        Object.values(errors).forEach((value) => {
            if (value.length > 0) {
                hasErrors = true
            }
        })
        return hasErrors
    }

    function validateForm() {
        let isValid = true
        let serverFieldsErrors = {...errors}
        Object.entries(model).forEach(([key, value]) => {
            const errorMessage = validateField(key, value)
            serverFieldsErrors[key] = errorMessage
            if (errorMessage.length > 0) {
                isValid = false
            }
        })
        setErrors(serverFieldsErrors)
        return isValid
    }

    const errorsSummary = hasErrors() ? t('form.validation.formErrors') : ''
    const fetchError = error ? `${t('form.validation.error_short')}: ${error.message}` : ''
    const globalErrorMessage = errorsSummary || fetchError || message
    const pageTitle = currentFormMode === FormMode.NEW ? t('model.form.add.pageTitle') : t('model.form.edit.pageTitle')

    useEffect(() => {
        if (redirect) {
            navigate('/models')
        }
    }, [redirect])

    return (
        <main>
            <h2>{pageTitle}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    required
                    label={t('model.fields.modelName')}
                    name="modelName"
                    id="modelName"
                    placeholder="2-50 znaków"
                    error={errors.modelName}
                    onChange={handleChange}
                    value={model.modelName}
                />
                <FormInput
                    type="text"
                    required
                    label={t('model.fields.modelManufacturer')}
                    name="modelManufacturer"
                    id="modelManufacturer"
                    placeholder="2-30 znaków"
                    error={errors.modelManufacturer}
                    onChange={handleChange}
                    value={model.modelManufacturer}
                />
                <FormInput
                    type="text"
                    required
                    label={t('model.fields.modelScale')}
                    name="modelScale"
                    id="modelScale"
                    placeholder="np. 1:18, 1:43"
                    error={errors.modelScale}
                    onChange={handleChange}
                    value={model.modelScale}
                />
                <FormInput
                    type="number"
                    required
                    label={t('model.fields.modelPrice')}
                    name="modelPrice"
                    id="modelPrice"
                    placeholder="min. 80, max. 1500"
                    error={errors.modelPrice}
                    onChange={handleChange}
                    value={model.modelPrice}
                />
                <FormButtons
                    formMode={currentFormMode}
                    error={globalErrorMessage}
                    cancelPath="/customers"
                />
                {/*<label htmlFor="modelName">Nazwa:<abbr title="required" aria-label="required">*</abbr></label>*/}
                {/*<input type="text" name="modelName" id="modelName" placeholder="2-50 znaków" value="" />*/}
                {/*<span id="errorModelName" className="errors-text"></span>*/}

                {/*<label htmlFor="modelManufacturer">Producent:<abbr title="required" aria-label="required">*</abbr></label>*/}
                {/*<input type="text" name="modelManufacturer" id="modelManufacturer" placeholder="2-30 znaków" value="" />*/}
                {/*<span id="errorModelManufacturer" className="errors-text"></span>*/}

                {/*<label htmlFor="modelScale">Skala:<abbr title="required" aria-label="required">*</abbr></label>*/}
                {/*<input type="text" name="modelScale" id="modelScale" placeholder="np. 1:18, 1:43" value="" />*/}
                {/*<span id="errorModelScale" className="errors-text"></span>*/}

                {/*<label htmlFor="modelPrice">Cena:<abbr title="required" aria-label="required">*</abbr></label>*/}
                {/*<input type="number" name="modelPrice" id="modelPrice" placeholder="min. 80, max. 1500" value="" />*/}
                {/*<span id="errorModelPrice" className="errors-text"></span>*/}

                {/*<div className="form-buttons">*/}
                {/*    <p id="errorsSummary" className="errors-text"></p>*/}
                {/*    <input className="form-button-submit" type="submit" value="Dodaj" />*/}
                {/*    <Link to="/models" className="form-button-cancel">Anuluj</Link>*/}
            </form>
        </main >
    )
}

export default ModelForm