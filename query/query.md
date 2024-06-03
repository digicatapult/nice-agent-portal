Queries return all documents that match the user supplied key-pairs. This includes document attestation details (`signers` and `location`). Data is retrieved from the [Chainvine Expanse API](https://hub.docker.com/r/slafazan/chainvine-expanse).

## Example Query

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
{
  "data": [
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
      "entities": ["0xD8B04Fc7d03B0eFfC080028eEC3A5Ee239714B68"],
      "fullEntities": [
        {
          "id": "0xD8B04Fc7d03B0eFfC080028eEC3A5Ee239714B68",
          "name": "Tech Innovators",
          "address": {
            "street": ["456 Silicon Ave"],
            "zip": "94043",
            "city": "Mountain View",
            "state": "California",
            "country": "USA"
          },
          "createdAt": 1714848290,
          "updatedAt": null
        }
      ]
    }
  ],
  "metadata": {
    "numberFound": "1/1"
  }
}
```
