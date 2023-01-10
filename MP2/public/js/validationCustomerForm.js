function validateForm() {
    const customerNameInput = document.getElementById('customerName')
    const customerSurnameInput = document.getElementById('customerSurname')
    const customerPhoneNumberInput = document.getElementById('customerPhoneNumber')
    const errorCustomerName = document.getElementById('errorCustomerName')
    const errorCustomerSurname = document.getElementById('errorCustomerSurname')
    const errorCustomerPhoneNumber = document.getElementById('errorCustomerPhoneNumber')
    const errorSummary = document.getElementById('errorsSummary')

    resetErrors([customerNameInput, customerSurnameInput, customerPhoneNumberInput], [errorCustomerName, errorCustomerSurname, errorCustomerPhoneNumber], errorSummary);

    let valid = true;

    if(!checkRequired(customerNameInput.value)) {
        valid = false;
        customerNameInput.classList.add("error-input");
        errorCustomerName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(customerNameInput.value, 2, 20)) {
        valid = false;
        customerNameInput.classList.add("error-input");
        errorCustomerName.innerText = "Pole powinno zawierać od 2 do 20 znaków"
    }

    if(!checkRequired(customerSurnameInput.value)) {
        valid = false;
        customerSurnameInput.classList.add("error-input");
        errorCustomerSurname.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(customerSurnameInput.value, 2, 30)) {
        valid = false;
        customerSurnameInput.classList.add("error-input");
        errorCustomerSurname.innerText = "Pole powinno zawierać od 2 do 30 znaków"
    }

    if(!checkRequired(customerPhoneNumberInput.value)) {
        valid = false;
        customerPhoneNumberInput.classList.add("error-input");
        errorCustomerPhoneNumber.innerText = "Pole jest wymagane";
    } else if (!checkPhoneNumber(customerPhoneNumberInput.value)) {
        valid = false;
        customerPhoneNumberInput.classList.add("error-input");
        errorCustomerPhoneNumber.innerText = "Pole powinno zawierać prawidłowy numer telefonu";
    }

    if (!valid) {
        errorSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}