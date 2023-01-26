import {Link} from "react-router-dom";
import { getCustomersApiCall } from '../../apiCalls/customerApiCalls'
import {useEffect, useState} from "react";
import CustomerListTable from "./CustomerListTable";

function CustomerList() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [customers, setCustomers] = useState([])
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
        content = <p> Błąd: {error.message} </p>
    } else if (!isLoaded) {
        content = <p> Ładowanie danych klientów... </p>
    } else {
        content = <CustomerListTable customerList={customers} />
    }

    return (
        <main>
            <h2>Klienci</h2>
            { content }
            <p><Link to="/customers/add" className="button-add">Dodaj nowego klienta</Link></p>
        </main>
    )
}

export default CustomerList