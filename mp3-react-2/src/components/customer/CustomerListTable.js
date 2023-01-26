import React from 'react';
import CustomerListTableRow from './CustomerListTableRow'

function CustomerListTable(props) {
    const customers = props.customerList
    return (
        <table className="table-list" >
            <thead>
                <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>E-mail</th>
                    <th>Numer telefonu</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                {customers.map(customer =>
                    <CustomerListTableRow customerData={customer} key={customer._id} />
                )}
            </tbody>
        </table >
    )
}

export default CustomerListTable