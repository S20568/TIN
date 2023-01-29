import {Link} from "react-router-dom";
import { getCustomersApiCall } from '../../apiCalls/customerApiCalls'
import {useEffect, useState} from "react";
import CustomerListTable from "./CustomerListTable";
import {useTranslation} from "react-i18next";

function CustomerList() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [customers, setCustomers] = useState([])
    const { t } = useTranslation();

    function fetchCustomerList() {
        getCustomersApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setCustomers(data)
                },
                (error) => {
                    setIsLoaded(false)
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchCustomerList()
    }, [])

    let content;

    if (error) {
        content = <p> {t('form.validation.error_short')}: {error.message} </p>
    } else if (!isLoaded) {
        content = <p> {t('customer.form.details.loading')} </p>
    } else {
        content = <CustomerListTable customerList={customers} />
    }

    return (
        <main>
            <h2>{t('customer.list.title')}</h2>
            { content }
            <p><Link to="/customers/add" className="button-add">{t('customer.list.addNew')}</Link></p>
        </main>
    )
}

export default CustomerList