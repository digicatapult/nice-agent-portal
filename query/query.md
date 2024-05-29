Queries return all documents that match the user supplied key-pairs. This includes document attestation details (`signers` and `location`). Data is retrieved from the [Chainvine Expanse API](https://hub.docker.com/r/slafazan/chainvine-expanse).

## Example Query 1

- Are there any geopolitical concerns associated with graphite production?
- Does this graphite supplier have all required certifications?
- Do Environmental Impact Assessments (EIAs) exist?

Return all documents of a certain types (`Validation Contract`, `Verification Contract`) that have been signed by certain entities at a certain location:

```json
[
  {
    "attestation": {
      "signers": [
        "0xD8B04Fc7d03B0eFfC080028eEC3A5Ee239714B68",
        "0x1R2S3T4U5V6W7X8Y9Z0A1B2C3D4E5F6G7H8I9J0K1L"
      ],
      "location": {
        "zip": "75002",
        "country": "France"
      }
    },
    "tags": ["Validation Contract"],
    "entities": ["0x1R2S3T4U5V6W7X8Y9Z0A1B2C3D4E5F6G7H8I9J0K1L"]
  },
  {
    "attestation": {
      "signers": [
        "0x7N8O9P0Q1R2S3T4U5V6W7X8Y9Z0A1B2C3D4E5F6G7H",
        "0x3J4K5L6M7N8O9P0Q1R2S3T4U5V6W7X8Y9Z0A1B2C3D"
      ],
      "location": {
        "zip": "01305-000",
        "country": "Brazil"
      }
    },
    "tags": ["Verification Contract"],
    "entities": ["0x7N8O9P0Q1R2S3T4U5V6W7X8Y9Z0A1B2C3D4E5F6G7H"]
  }
]
```

Response:

```json
[
  {
    "id": "0j8e4c3a9f0d1b8a4c7e6d8a1b0f1d2c8d6e1a7b9d6c8e1a0b8e4c3a9f0d1b8a4",
    "createdAt": "1714846701",
    "createdBy": "0xA8E4c3A9F0D1B8a4C7E6D8a1B0F1D2c8D6E1A7B9d6C8e1A0B8E4C3a9F0D1B8a4",
    "attestation": {
      "id": "0xd4e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9",
      "entities": [
        "0x7X8Y9Z0A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R",
        "0x9Z0A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T"
      ],
      "signers": [
        "0xD8B04Fc7d03B0eFfC080028eEC3A5Ee239714B68",
        "0x1R2S3T4U5V6W7X8Y9Z0A1B2C3D4E5F6G7H8I9J0K1L"
      ],
      "timestamp": 1714845415,
      "location": {
        "id": "0x4AbCdEfGhIjKlMnOpQrStUvWxYz0123456789AbCdEfGh",
        "street": ["Rue de la Paix 1"],
        "zip": "75002",
        "city": "Paris",
        "state": "Île-de-France",
        "country": "France"
      }
    },
    "entites": ["Validator Q"],
    "tags": ["Validation Contract", "Validator"],
    "url": "https://storage.expanselaboratories.com/0j8e4c3a9f0d1b8a4c7e6d8a1b0f1d2c8d6e1a7b9d6c8e1a0b8e4c3a9f0d1b8a4",
    "entities": ["0x1R2S3T4U5V6W7X8Y9Z0A1B2C3D4E5F6G7H8I9J0K1L"]
  },
  {
    "id": "8h9d6b8e1a0c7a3e5b6d8a1b0f1d2c9b8e4c3a9d6b1e7a8c0b8e4c6d1a7b9f0d3",
    "createdAt": "1714846699",
    "createdBy": "0xE1A0b8e4C3a9F0D1B8a4C7E6D8a1B0F1D2c8D6E1A7B9d6C8e1A0B8E4C3a9F0d1",
    "attestation": {
      "id": "0xc3d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8",
      "entities": [
        "0x7X8Y9Z0A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R",
        "0x5V6W7X8Y9Z0A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P"
      ],
      "signers": [
        "0x7N8O9P0Q1R2S3T4U5V6W7X8Y9Z0A1B2C3D4E5F6G7H",
        "0x3J4K5L6M7N8O9P0Q1R2S3T4U5V6W7X8Y9Z0A1B2C3D"
      ],
      "timestamp": 1714845414,
      "location": {
        "id": "0x0c5b78E232a56b9E43F86c6c27a292AF1DC4B424",
        "street": ["Rua Augusta 123"],
        "zip": "01305-000",
        "city": "São Paulo",
        "state": "São Paulo",
        "country": "Brazil"
      }
    },
    "entites": ["Verifier O"],
    "tags": ["Verification Contract", "Verifier"],
    "url": "https://storage.expanselaboratories.com/8h9d6b8e1a0c7a3e5b6d8a1b0f1d2c9b8e4c3a9d6b1e7a8c0b8e4c6d1a7b9f0d3",
    "entities": ["0x7N8O9P0Q1R2S3T4U5V6W7X8Y9Z0A1B2C3D4E5F6G7H"]
  }
]
```

## Example Query 2

- What are the current market trends for graphite?
- What is the quantity of graphite being shipped?

Return all documents of a certain type (`Purchase Order`) involving the correct entities.

```json
[
  {
    "tags": ["Purchase Order"],
    "entities": ["0xD8B04Fc7d03B0eFfC080028eEC3A5Ee239714B68"]
  }
]
```

Response:

```json
[
  {
    "id": "24a97c8b56123a44a7a1a4b1a90e5e1e3b9c7d682372b4894c1d7f298b8b4a19",
    "createdAt": "1714846683",
    "createdBy": "0xD6D5Bc7c8A832E0aD8E3d2C30Cb6D5C6a9De3F40",
    "attestation": {
      "id": "0xa1d6e0e7c5a0f8d9e4c6b7d5a3f2c1b0d8e7f6a5c4b3d2e1f0c8a9b8c7d6e5f4",
      "entities": [
        "0xD8B04Fc7d03B0eFfC080028eEC3A5Ee239714B68",
        "0x5C74B1F7eAc0Fb8a4Ce43F0d1202e3C47d71DcA6"
      ],
      "signers": [
        "0xD8B04Fc7d03B0eFfC080028eEC3A5Ee239714B68",
        "0x5C74B1F7eAc0Fb8a4Ce43F0d1202e3C47d71DcA6"
      ],
      "timestamp": 1714845412,
      "location": {
        "id": "0xf80998017Fc980403a89C757da4f6E15D2aE2fa7",
        "street": ["Vika 1"],
        "zip": "0252",
        "city": "Oslo",
        "state": "Oslo Municipality",
        "country": "Norway"
      }
    },
    "entites": ["Supplier Y"],
    "tags": ["Purchase Order", "Supplier"],
    "url": "https://storage.expanselaboratories.com/24a97c8b56123a44a7a1a4b1a90e5e1e3b9c7d682372b4894c1d7f298b8b4a19",
    "entities": ["0xD8B04Fc7d03B0eFfC080028eEC3A5Ee239714B68"]
  }
]
```

## Example Query 3

- Where is graphite sourced form?

Return all documents of a certain type (`Distribution Contract`) that have been signed by the correct entities.

```json
[
  {
    "attestation": {
      "signers": [
        "0x9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7A8B",
        "0xD8F6D7C6E7f5A4c3B2D1E0F9A8B7C6d5E4c3A9F0"
      ]
    },
    "tags": ["Distribution Contract"],
    "entities": ["0x8F12C7E18e1B3F2d0Fd7E89B8F0589c63E19e4A7"]
  }
]
```

Response:

```json
[
  {
    "id": "4b5d7e8a1c6b9d7a8e0c7a1b2c3e4d6b7a8e9d1c4b6e8c1a0b7a9d6e8c1d4b6a",
    "createdAt": "1714846685",
    "createdBy": "0xA8E9C6a8D7E0d1C4b7a8e6d8a1b0f1d2c8d6e1a7b9d6c8e1a0b8e4c3a9f0d1b8",
    "attestation": {
      "id": "0xb9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0",
      "entities": [
        "0x8F12C7E18e1B3F2d0Fd7E89B8F0589c63E19e4A7",
        "0x5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X"
      ],
      "signers": [
        "0x9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7A8B",
        "0xD8F6D7C6E7f5A4c3B2D1E0F9A8B7C6d5E4c3A9F0"
      ],
      "timestamp": 1714845419,
      "location": {
        "id": "0x07de82a161174645186bfc65a0D717F4815F0474",
        "street": ["Via del Corso 1"],
        "zip": "00186",
        "city": "Rome",
        "state": "Lazio",
        "country": "Italy"
      }
    },
    "entites": ["Distributor A"],
    "tags": ["Distribution Contract", "Distributor"],
    "url": "https://storage.expanselaboratories.com/4b5d7e8a1c6b9d7a8e0c7a1b2c3e4d6b7a8e9d1c4b6e8c1a0b7a9d6e8c1d4b6a",
    "entities": [
      "0x8F12C7E18e1B3F2d0Fd7E89B8F0589c63E19e4A7",
      "0xA9B15Bc69Df0bCE084c709e2C4a51770930E8D61"
    ]
  }
]
```
