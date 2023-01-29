const modelsBaseUrl = 'http://localhost:3000/api/models'

export function getModelsApiCall() {
    return fetch(modelsBaseUrl);
}

export function getModelByIdApiCall(modelId) {
    const url = `${modelsBaseUrl}/${modelId}`;
    return fetch(url);
}

export function addModelApiCall(model) {
    const modelString = JSON.stringify(model)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: modelString
    }
    return fetch(modelsBaseUrl, options);
}

export function updateModelApiCall(modelId, model) {
    const url = `${modelsBaseUrl}/${modelId}`
    const empString = JSON.stringify(model)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: empString
    }
    return fetch(url, options);
}