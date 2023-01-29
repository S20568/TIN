import {Link, useNavigate, useParams} from 'react-router-dom'
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import FormMode, {formValidationKeys} from "../../helpers/formHelper";
import {addOrderApiCall, getOrderByIdApiCall, updateOrderApiCall} from "../../apiCalls/orderApiCalls";
import {
    checkDate,
    checkModelQuantity, checkOrderAmount,
    checkRequired,
    checkTextLengthRange
} from "../../helpers/validationCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import {getFormattedDate} from "../../helpers/dateHelper";

function OrderForm() {
    const [order, setOrder] = useState({
        'customer': '',
        'model': '',
        'quantity': '',
        'date': '',
        'orderAmount': ''
    })

    const [errors, setErrors] = useState({
        'customer': '',
        'model': '',
        'quantity': '',
        'date': '',
        'orderAmount': ''
    })

    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const { orderId } = useParams()
    const currentFormMode = orderId ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate()

    const { t } = useTranslation();
    function fetchOrderDetails() {
        getOrderByIdApiCall(orderId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setOrder(data)
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
            fetchOrderDetails()
        }
    }, [])

    function handleChange(event) {
        const { name, value } = event.target
        const errorMessage = validateField(name, value)
        setErrors({
            ...errors,
            [name]: errorMessage
        })
        setOrder({
            ...order,
            [name]: value
        })
    }

    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if (fieldName === 'customer') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }
        }
        if (fieldName === 'model') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 50)) {
                errorMessage = formValidationKeys.len_2_50
            }
        }
        if (fieldName === 'quantity') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkModelQuantity(fieldValue)) {
                errorMessage = formValidationKeys.quantityError
            }
        }
        if (fieldName === 'date') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkDate(fieldValue)) {
                errorMessage = formValidationKeys.isDate
            }
        }
        if (fieldName === 'orderAmount') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkOrderAmount(fieldValue)) {
                errorMessage = formValidationKeys.isNumeric
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
                promise = addOrderApiCall(order)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateOrderApiCall(orderId, order)
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
        Object.entries(order).forEach(([key, value]) => {
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
    const pageTitle = currentFormMode === FormMode.NEW ? t('order.form.add.pageTitle') : t('order.form.edit.pageTitle')

    return (
        <main>
            <h2>{pageTitle}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    required
                    label={t('order.fields.customerName')}
                    name="customer"
                    id="customer"
                    placeholder={t('form.placeHolders.messages.len_2_60')}
                    error={errors.customer}
                    onChange={handleChange}
                    value={order.customer.customerFirstName + " " + order.customer.customerLastName}
                />
                <FormInput
                    type="text"
                    required
                    label={t('order.fields.modelName')}
                    name="model"
                    id="model"
                    placeholder={t('form.placeHolders.messages.len_2_50')}
                    error={errors.model}
                    onChange={handleChange}
                    value={order.model.modelName}
                />
                <FormInput
                    type="text"
                    required
                    label={t('order.fields.quantity')}
                    name="quantity"
                    id="quantity"
                    placeholder={t('form.placeHolders.messages.quantity')}
                    value={order.quantity}
                    onChange={handleChange}
                    error={errors.quantity}
                />
                <FormInput
                    type="text"
                    required
                    label={t('order.fields.date')}
                    name="date"
                    id="date"
                    placeholder={t('form.placeHolders.messages.date')}
                    value={order.date ? getFormattedDate(order.date) : ""}
                    onChange={handleChange}
                    error={errors.date}
                />
                <FormInput
                    type="text"
                    required
                    label={t('order.fields.orderAmount')}
                    name="orderAmount"
                    id="orderAmount"
                    placeholder={t('form.placeHolders.messages.orderAmount')}
                    value={order.orderAmount}
                    onChange={handleChange}
                    error={errors.orderAmount}
                />
                <FormButtons
                    formMode={currentFormMode}
                    error={globalErrorMessage}
                    cancelPath="/orders"
                />
            </form>
        </main>
    )
    // const [allCustomers, setAllCustomers] = useState([])
    // const [allModels, setAllModels] = useState([])
    // useEffect(() => {
    //     getCustomersApiCall().then(r => r.json()).then(r => {
    //         setAllCustomers(r)
    //     });
    //     getModelsApiCall().then(r => r.json()).then(r => {
    //         setAllModels(r)
    //     })
    // }, [])
    //
    // const { orderId } = useParams()
    // const currentFormMode = orderId ? FormMode.EDIT : FormMode.NEW
    //
    //
    // const { t } = useTranslation();
    //
    //     return (
    //         <main>
    //             <h2>Nowe zamówienie</h2>
    //             <form className="form">
    //                 <label htmlFor="customer">Klient: <abbr title="required" aria-label="required">*</abbr></label>
    //                 <select id="customer" name="customerId" required>
    //                     <option value="">--- Wybierz klienta ---</option>
    //                     { allCustomers.map(customer =>
    //                         (<option key={customer._id} value={customer._id} label={customer.customerFirstName + " " + customer.customerLastName}></option>)
    //                     )}
    //                 </select>
    //                 <span id="errorCustomer" className="errors-text"></span>
    //
    //                 <label htmlFor="model">Departament: <abbr title="required" aria-label="required">*</abbr></label>
    //                 <select id="model" name="modelId" required>
    //                     <option value="">--- Wybierz model ---</option>
    //                     { allModels.map(model =>
    //                         (<option key={model._id} value={model._id} label={model.modelName}></option>)
    //                     )}
    //                 </select>
    //                 <span id="errorModel" className="errors-text"></span>
    //
    //                 <label htmlFor="quantity">Ilość</label>
    //                 <input type="text" name="quantity" value="" id="quantity" placeholder="min. 1" />
    //                 <span id="errorQuantity" className="errors-text"></span>
    //
    //                 <label htmlFor="date">Data zamówienia</label>
    //                 <input type="date" name="date" value="" id="date" />
    //                 <span id="errorDate" className="errors-text"></span>
    //
    //                 <div className="form-buttons">
    //                     <p id="errorsSummary" className="errors-text"></p>
    //                     <input className="form-button-submit" type="submit" value="Dodaj" />
    //                     <Link to="/orders" className="form-button-cancel">Anuluj</Link>
    //                 </div>
    //             </form>
    //         </main>
    //     )
}

export default OrderForm