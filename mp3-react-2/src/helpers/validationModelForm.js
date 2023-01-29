function validateForm() {
    const modelNameInput = document.getElementById('modelName')
    const modelManufacturerInput = document.getElementById('modelManufacturer')
    const modelScaleInput = document.getElementById('modelScale')
    const modelPriceInput = document.getElementById('modelPrice')
    const errorModelName = document.getElementById('errorModelName')
    const errorModelManufacturer = document.getElementById('errorModelManufacturer')
    const errorModelScale = document.getElementById('errorModelScale')
    const errorModelPrice = document.getElementById('errorModelPrice')
    const errorsSummary = document.getElementById('errorsSummary')

    resetErrors([modelNameInput, modelManufacturerInput, modelScaleInput, modelPriceInput], [errorModelName, errorModelManufacturer, errorModelScale, errorModelPrice], errorsSummary);

    let valid = true;

    if(!checkRequired(modelNameInput.value)) {
        valid = false;
        modelNameInput.classList.add("error-input");
        errorModelName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(modelNameInput.value, 2, 50)) {
        valid = false;
        modelNameInput.classList.add("error-input");
        errorModelName.innerText = "Pole powinno zawierać od 2 do 50 znaków"
    }

    if(!checkRequired(modelManufacturerInput.value)) {
        valid = false;
        modelManufacturerInput.classList.add("error-input");
        errorModelManufacturer.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(modelManufacturerInput.value, 2, 30)) {
        valid = false;
        modelManufacturerInput.classList.add("error-input");
        errorModelManufacturer.innerText = "Pole powinno zawierać od 2 do 30 znaków"
    }

    if(!checkRequired(modelScaleInput.value)) {
        valid = false;
        modelScaleInput.classList.add("error-input");
        errorModelScale.innerText = "Pole jest wymagane";
    } else if (!checkModelScale(modelScaleInput.value)) {
        valid = false;
        modelScaleInput.classList.add("error-input");
        errorModelScale.innerText = "Pole powinno prawidłową skale";
    }

    if(!checkRequired(modelPriceInput.value)) {
        valid = false;
        modelPriceInput.classList.add("error-input");
        errorModelPrice.innerText = "Pole jest wymagane";
    } else if (!checkModelPrice(modelPriceInput.value)) {
        valid = false;
        modelPriceInput.classList.add("error-input");
        errorModelPrice.innerText = "Pole powinno zawierać prawidłową cene";
    }

    if (!valid) {
        errorSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}