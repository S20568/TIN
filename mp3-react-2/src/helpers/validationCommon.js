export function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    if (value === "") {
        return false;
    }
    return true;
}

export function checkTextLengthRange(value, min, max) {
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

export function checkEmail(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return re.test(value);
}

export function checkPhoneNumber(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /^(\+([0-9]{2})\)?)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})?[-. ]?([0-9]{3})$/;
    return re.test(value);
}

export function checkModelScale(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /1:[0-9]{2}$/;
    return re.test(value);
}

export function checkModelPrice(value) {
    const min = 80;
    const max = 1500;
    if (!value)
        return false;
    if (isNaN(value))
        return false;
    if (value < min)
        return false;
    if (value > max)
        return false;
    return true;
}

export function checkModelQuantity(value) {
    const min = 1;
    const max = 10;
    if (!value)
        return false;
    if (isNaN(value))
        return false;
    if (value < min)
        return false;
    if (value > max)
        return false;
    return true;
}

export function checkOrderAmount(value) {
    if(!value)
        return false;
    if(isNaN(value))
        return false;
    return true;
}

export function checkDate(value) {
    if(!value) {
        return false;
    }
    const re = /(\d{4})-(\d{2})-(\d{2})/;
    return re.test(value);
}

