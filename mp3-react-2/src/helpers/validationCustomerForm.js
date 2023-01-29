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
    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const sumMessage = document.getElementById('errorMessage-summary').innerText;
    const firstNameTextLengthMessage = document.getElementById('errorMessage-firstNameTextLength').innerText;
    const lastNameTextLengthMessage = document.getElementById('errorMessage-lastNameTextLength').innerText;
    const emailTextLengthMessage = document.getElementById('errorMessage-emailTextLength').innerText;
    const emailMessage = document.getElementById('errorMessage-email').innerText;
    const phoneNumberMessage = document.getElementById('errorMessage-phoneNumber').innerText;

    resetErrors([customerNameInput, customerSurnameInput, customerEmailInput, customerPhoneNumberInput], [errorCustomerName, errorCustomerSurname, errorCustomerEmail, errorCustomerPhoneNumber], errorSummary);

    let valid = true;

    if(!checkRequired(customerNameInput.value)) {
        valid = false;
        customerNameInput.classList.add("error-input");
        errorCustomerName.innerText = reqMessage;
    } else if (!checkTextLengthRange(customerNameInput.value, 2, 20)) {
        valid = false;
        customerNameInput.classList.add("error-input");
        errorCustomerName.innerText = firstNameTextLengthMessage;
    }

    if(!checkRequired(customerSurnameInput.value)) {
        valid = false;
        customerSurnameInput.classList.add("error-input");
        errorCustomerSurname.innerText = reqMessage;
    } else if (!checkTextLengthRange(customerSurnameInput.value, 2, 30)) {
        valid = false;
        customerSurnameInput.classList.add("error-input");
        errorCustomerSurname.innerText = lastNameTextLengthMessage;
    }

    if(checkRequired(customerEmailInput.value)) {
        valid = false;
        customerEmailInput.classList.add("error-input");
        errorCustomerEmail.innerText = reqMessage;
    } else if (!checkTextLengthRange(customerEmailInput, 5, 60)) {
        valid = false;
        customerEmailInput.classList.add("error-input");
        errorCustomerEmail.innerText = emailTextLengthMessage;
    } else if (!checkEmail(customerEmailInput.value)) {
        valid = false;
        customerEmailInput.classList.add("error-input");
        errorCustomerEmail.innerText = emailMessage;
    }

    if(!checkRequired(customerPhoneNumberInput.value)) {
        valid = false;
        customerPhoneNumberInput.classList.add("error-input");
        errorCustomerPhoneNumber.innerText = reqMessage;
    } else if (!checkPhoneNumber(customerPhoneNumberInput.value)) {
        valid = false;
        customerPhoneNumberInput.classList.add("error-input");
        errorCustomerPhoneNumber.innerText = phoneNumberMessage;
    }

    if (!valid) {
        errorSummary.innerText = sumMessage;
    }
    return valid;
}