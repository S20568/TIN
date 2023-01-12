function resetErrors(inputs, errorTexts, errorInfo) {
    for (let i=0; i<inputs.length; i++) {
        inputs[i].classList.remove("error-input");
    }
    for (let i=0; i<errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}

function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    if (value === "") {
        return false;
    }
    return true;
}

function checkTextLengthRange(value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const lenght = value.length;
    if (max && lenght > max) {
        return false;
    }
    if (min & lenght < min) {
        return false;
    }
    return true;
}

function checkPhoneNumber(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})?[-. ]?([0-9]{3})$/;
    return re.test(value);
}

function checkModelScale(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /1:[0-9]+/;
    return re.test(value);
}

function checkModelPrice(value) {
    if (!value) {
        return false;
    }
    value = value
}

