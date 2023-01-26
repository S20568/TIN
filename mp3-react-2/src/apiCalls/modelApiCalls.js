import {modelDetailsList, modelList} from "./modelApiMockData";

export function getModelsApiCall() {
    return modelList;
}

export function getModelByIdApiCall(modelId) {
    return modelDetailsList.find(model => model._id === modelId);
}