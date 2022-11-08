function validateForm() {
    const clientNameInput = document.getElementById('clientName')
    const clientSurnameInput = document.getElementById('clientSurname')
    const clientPhoneNumberInput = document.getElementById('clientPhoneNumber')
    const errorClientName = document.getElementById('errorClientName')
    const errorClientSurname = document.getElementById('errorClientSurname')
    const errorClientPhoneNumber = document.getElementById('errorClientPhoneNumber')
    const errorSummary = document.getElementById('errorSummary')

    resetErrors([clientNameInput, clientSurnameInput, clientPhoneNumberInput], [errorClientName, errorClientSurname, errorClientPhoneNumber], errorSummary);

    let valid = true;

    if(!checkRequired(clientNameInput.value)) {
        valid = false;
        clientNameInput.classList.add("error-input");
        errorClientName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(clientNameInput.value, 2, 20)) {
        valid = false;
        clientNameInput.classList.add("error-input");
        errorClientName.innerText = "Pole powinno zawierać od 2 do 20 znaków"
    }

    if(!checkRequired(clientSurnameInput.value)) {
        valid = false;
        clientSurnameInput.classList.add("error-input");
        errorClientSurname.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(clientSurnameInput.value, 2, 30)) {
        valid = false;
        clientSurnameInput.classList.add("error-input");
        errorClientSurname.innerText = "Pole powinno zawierać od 2 do 30 znaków"
    }

    if(!checkRequired(clientPhoneNumberInput.value)) {
        valid = false;
        clientPhoneNumberInput.classList.add("error-input");
        errorClientPhoneNumber.innerText = "Pole jest wymagane";
    } else if (!checkPhoneNumber(clientPhoneNumberInput.value)) {
        valid = false;
        clientPhoneNumberInput.classList.add("error-input");
        errorClientPhoneNumber.innerText = "Pole powinno zawierać prawidłowy numer telefonu";
    }

    if (!valid) {
        errorSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}