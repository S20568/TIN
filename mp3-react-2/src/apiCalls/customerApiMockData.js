export const customerList = [
    {
        "_id": 1,
        "customerFirstName": "Jakub",
        "customerLastName": "Slusarski",
        "customerEmail": "kuba@gmail.com",
        "phoneNumber": "+48578964315",
    },
    {
        "_id": 2,
        "customerFirstName": "Jan",
        "customerLastName": "Kowalski",
        "customerEmail": "jan@gmail.com",
        "phoneNumber": "+48123456789",
    },
    {
        "_id": 3,
        "customerFirstName": "Piotr",
        "customerLastName": "Nowak",
        "customerEmail": "piotr@gmail.com",
        "phoneNumber": "+48745896123",
    }
]

export const customerDetailsList = [
    {
        "_id": 1,
        "customerFirstName": "Jakub",
        "customerLastName": "Slusarski",
        "customerEmail": "kuba@gmail.com",
        "phoneNumber": "+48578964315",
        "orders": [
            {
                "_id": 1,
                "customerId": 1,
                "modelId": 1,
                "quantity": 2,
                "date": "2022-11-03T00:00:00.000Z",
                "orderAmount": 680,
                "model": {
                    "_id": 1,
                    "modelName": "Oracle Red Bull Racing RB18",
                    "modelManufacturer": "Bburago",
                    "modelScale": "1:18",
                    "modelPrice": 340,
                }
            },
            {
                "_id": 2,
                "customerId": 1,
                "modelId": 2,
                "quantity": 1,
                "date": "2022-11-03T00:00:00.000Z",
                "orderAmount": 360,
                "model": {
                    "_id": 2,
                    "modelName": "Scuderia Ferrari SF-75",
                    "modelManufacturer": "Bburago",
                    "modelScale": "1:18",
                    "modelPrice": 360,
                }
            }
        ]
    },
    {
        "_id": 2,
        "customerFirstName": "Jan",
        "customerLastName": "Kowalski",
        "customerEmail": "jan@gmail.com",
        "phoneNumber": "+48123456789",
        "orders": [
            {
                "_id": 3,
                "customerId": 2,
                "modelId": 3,
                "quantity": 1,
                "date": "2022-11-04T00:00:00.000Z",
                "orderAmount": 400,
                "model": {
                    "_id": 3,
                    "modelName": "Mercedes-AMG Petronas F1 W13",
                    "modelManufacturer": "Spark",
                    "modelScale": "1:18",
                    "modelPrice": 400,
                }
            }
        ]
    },
    {
        "_id": 3,
        "customerFirstName": "Piotr",
        "customerLastName": "Nowak",
        "customerEmail": "piotr@gmail.com",
        "phoneNumber": "+48745896123",
        "orders": [
            {
                "_id": 4,
                "customerId": 3,
                "modelId": 2,
                "quantity": 2,
                "date": "2022-11-04T00:00:00.000Z",
                "orderAmount": 720,
                "model": {
                    "_id": 2,
                    "modelName": "Scuderia Ferrari SF-75",
                    "modelManufacturer": "Bburago",
                    "modelScale": "1:18",
                    "modelPrice": 360,
                }
            }
        ]
    }
]