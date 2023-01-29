const FormMode = {
    NEW: 'NEW',
    EDIT: 'EDIT'
}

export const formValidationKeys = {
    notEmpty: 'notEmpty',
    len_2_20: 'len_2_20',
    len_2_30: 'len_2_30',
    len_2_50: 'len_2_50',
    len_2_60: 'len_2_60',
    len_5_60: 'len_5_60',
    isEmail: 'isEmail',
    isNumeric: 'isNumeric',
    isDate: 'isDate',
    min_80: 'min_80',
    max_1500: 'max_1500',
    quantityError: 'quantityError',
    inputError: 'inputError',
}

export function getValidationErrorKey(error) {
    return `form.validation.messages.${error}`
}

export default FormMode