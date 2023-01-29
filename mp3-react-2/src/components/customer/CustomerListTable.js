import React from 'react';
import CustomerListTableRow from './CustomerListTableRow'
import {useTranslation} from "react-i18next";

function CustomerListTable(props) {
    const customers = props.customerList
    const { t } = useTranslation();
    return (
        <table className="table-list" >
            <thead>
                <tr>
                    <th>{t('customer.fields.customerFirstName')}</th>
                    <th>{t('customer.fields.customerLastName')}</th>
                    <th>{t('customer.fields.customerEmail')}</th>
                    <th>{t('customer.fields.phoneNumber')}</th>
                    <th>{t('list.actions.title')}</th>
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