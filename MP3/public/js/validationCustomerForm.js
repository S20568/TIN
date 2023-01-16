function validateForm() {
    const customerNameInput = document.getElementById('customerName')
    const customerSurnameInput = document.getElementById('customerSurname')
    const customerEmailInput = document.getElementById('customerEmail')
    const customerPhoneNumberInput = document.getElementById('customerPhoneNumber')
    const errorCustomerName = document.getElementById('errorCustomerName')
    const errorCustomerSurname = document.getElementById('errorCustomerSurname')
    const errorCustomerEmail = document.getElementById('errorCustomerEmail')
    const errorCustomerPhoneNumber = document.getElementById('errorCustomerPhoneNumber')
    const errorSummary = document.getElementById('errorsSummary')

    resetErrors([customerNameInput, customerSurnameInput, customerEmailInput, customerPhoneNumberInput], [errorCustomerName, errorCustomerSurname, errorCustomerEmail, errorCustomerPhoneNumber], errorSummary);

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

    if(checkRequired(customerEmailInput.value)) {
        valid = false;
        customerEmailInput.classList.add("error-input");
        errorCustomerEmail.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(customerEmailInput, 5, 60)) {
        valid = false;
        customerEmailInput.classList.add("error-input");
        errorCustomerEmail.innerText = "Pole powinno zawierać od 5 do 60 znaków";
    } else if (!checkEmail(customerEmailInput.value)) {
        valid = false;
        customerEmailInput.classList.add("error-input");
        errorCustomerEmail.innerText = "Pole powinno zawierać prawidłowy adres email";
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