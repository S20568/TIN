import {useNavigate, useParams} from "react-router-dom"
import FormMode from '../../helpers/formHelper'
import {useEffect, useState} from "react";
import {addCustomerApiCall, getCustomerByIdApiCall, updateCustomerApiCall} from "../../apiCalls/customerApiCalls";
import {checkEmail, checkPhoneNumber, checkRequired, checkTextLengthRange} from "../../helpers/validationCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import { formValidationKeys } from '../../helpers/formHelper'
import {useTranslation} from "react-i18next";

function CustomerForm() {

    const [customer, setCustomer] = useState({
        'customerFirstName': '',
        'customerLastName': '',
        'customerEmail': '',
        'phoneNumber': ''
    })
    const [errors, setErrors] = useState({
        'customerFirstName': '',
        'customerLastName': '',
        'customerEmail': '',
        'phoneNumber': ''
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const { customerId } = useParams()
    const currentFormMode = customerId ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate()

    const { t } = useTranslation();

    function fetchCustomerDetails() {
        getCustomerByIdApiCall(customerId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setCustomer(data)
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
            fetchCustomerDetails()
        }
    }, [])

    function handleChange(event) {
        const { name, value } = event.target
        const errorMessage = validateField(name, value)
        setErrors({
            ...errors,
            [name]: errorMessage
        })
        setCustomer({
            ...customer,
            [name]: value
        })
    }

    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if (fieldName === 'customerFirstName') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 20)) {
                errorMessage = formValidationKeys.len_2_20
            }
        }
        if (fieldName === 'customerLastName') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 30)) {
                errorMessage = formValidationKeys.len_2_30
            }
        }
        if (fieldName === 'customerEmail') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 5, 60)) {
                errorMessage = formValidationKeys.len_5_60
            } else if (!checkEmail(fieldValue)) {
                errorMessage = formValidationKeys.isEmail
            }
        }
        if (fieldName === 'phoneNumber') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkPhoneNumber(fieldValue)) {
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
                promise = addCustomerApiCall(customer)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateCustomerApiCall(customerId, customer)
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
        Object.entries(customer).forEach(([key, value]) => {
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
    const pageTitle = currentFormMode === FormMode.NEW ? t('customer.form.add.pageTitle') : t('customer.form.edit.pageTitle')

    useEffect(() => {
        if (redirect) {
            navigate('/customers')
        }
    }, [redirect])

    return (
        <main>
            <h2>{pageTitle}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    required
                    label={t('customer.fields.customerFirstName')}
                    name="customerFirstName"
                    id="customerFirstName"
                    placeholder={t('form.placeHolders.messages.len_2_20')}
                    error={errors.customerFirstName}
                    onChange={handleChange}
                    value={customer.customerFirstName}
                />
                <FormInput
                    type="text"
                    required
                    label={t('customer.fields.customerLastName')}
                    name="customerLastName"
                    id="customerLastName"
                    placeholder={t('form.placeHolders.messages.len_2_30')}
                    error={errors.customerLastName}
                    onChange={handleChange}
                    value={customer.customerLastName}
                />
                <FormInput
                    type="text"
                    required
                    label={t('customer.fields.customerEmail')}
                    name="customerEmail"
                    id="customerEmail"
                    placeholder={t('form.placeHolders.messages.email')}
                    value={customer.customerEmail}
                    onChange={handleChange}
                    error={errors.customerEmail}
                />
                <FormInput
                    type="text"
                    required
                    label={t('customer.fields.phoneNumber')}
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder={t('form.placeHolders.messages.phoneNumber')}
                    value={customer.phoneNumber}
                    onChange={handleChange}
                    error={errors.phoneNumber}
                />
                <FormButtons
                    formMode={currentFormMode}
                    error={globalErrorMessage}
                    cancelPath="/customers"
                />
            </form>
        </main>
    )
}

export default CustomerForm