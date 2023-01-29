import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCustomerByIdApiCall } from '../../apiCalls/customerApiCalls'
import CustomerDetailsData from "./CustomerDetailsData";
import { useTranslation } from 'react-i18next';

function CustomerDetails() {
    const [customer, setCustomer] = useState({})
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)

    const { t } = useTranslation();

    let { customerId } = useParams()
    customerId = parseInt(customerId)

    function fetchCustomerDetails() {
        getCustomerByIdApiCall(customerId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setCustomer(null)
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
                }
            )
    }

    useEffect(() => {
        fetchCustomerDetails()
    }, [])

    let content;

    if (error) {
        content = <p>{t('form.validation.error_short')}: {error.message}</p>
    } else if (!isLoaded) {
        content = <p> {t('customer.form.details.loading')} </p>
    } else if (message) {
        content = <p>{message}</p>
    } else {
        content = <CustomerDetailsData customerData={customer} />
    }

    return (
        <main>
            <h2>{t('customer.form.details.pageTitle')}</h2>
            { content }
            <div className="form-buttons">
                <Link to="/customers" className="button-back">{t('form.actions.return')}</Link>
            </div>
        </main>
    )
}
export default CustomerDetails