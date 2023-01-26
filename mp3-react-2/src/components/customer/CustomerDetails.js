import React, {useEffect, useState} from 'react'
import { getCustomerByIdApiCall } from '../../apiCalls/customerApiCalls'
import { Link, useParams } from 'react-router-dom'
import CustomerDetailsData from "./CustomerDetailsData";

function CustomerDetails() {
    const [customer, setCustomer] = useState({})
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)

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
        content = <p>Błąd: {error.message}</p>
    } else if (!isLoaded) {
        content = <p> Ładowanie danych klienta... </p>
    } else if (message) {
        content = <p>{message}</p>
    } else {
        content = <CustomerDetailsData customerData={customer} />
    }

    return (
        <main>
            <h2>Dane klienta</h2>
            { content }
            <div className="section-buttons">
                <Link to="/customers" className="button-back">Powrót</Link>
            </div>
        </main>
    )
}
export default CustomerDetails