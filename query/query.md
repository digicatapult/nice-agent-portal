Queries return all documents that match, including their attestation details (`signers` and `location`)

Return all documents of a certain type (`Certificate of Origin`) that have been signed by certain entities at a certain location:

// Do Environmental Impact Assessments (EIAs) exist ('Certificate of Origin' and 'Certificate of Analysis')

```json
[
  {
    "attestation": {
      "signers": [
        "0xD8B04Fc7d03B0eFfC080028eEC3A5Ee239714B68",
        "0x5C74B1F7eAc0Fb8a4Ce43F0d1202e3C47d71DcA6"
      ],
      "location": {
        "street": ["Vika 1"],
        "zip": "0252",
        "city": "Oslo",
        "state": "Oslo Municipality",
        "country": "Norway"
      }
    },
    "tags": ["Certificate of Origin"],
    "entities": ["0xD8B04Fc7d03B0eFfC080028eEC3A5Ee239714B68"]
  },
  {
    "attestation": {
      "signers": [
        "0xD8B04Fc7d03B0eFfC080028eEC3A5Ee239714B68",
        "0x5C74B1F7eAc0Fb8a4Ce43F0d1202e3C47d71DcA6"
      ],
      "location": {
        "street": ["Vika 1"],
        "zip": "0252",
        "city": "Oslo",
        "state": "Oslo Municipality",
        "country": "Norway"
      }
    },
    "tags": ["Certificate of Analysis"],
    "entities": ["0xD8B04Fc7d03B0eFfC080028eEC3A5Ee239714B68"]
  }
]
```

Return all documents of a certain type (`Shipping Document`) involving the correct entities.

// What is the quantity of graphite being shipped?

```json
[
  {
    "tags": ["Shipping Document"],
    "entities": ["0xD8B04Fc7d03B0eFfC080028eEC3A5Ee239714B68"]
  }
]
```

Return all documents of a certain type (`Purchase Order`) that have been signed by the correct entities.

// Where is graphite sourced form?

```json
[
  {
    "attestation": {
      "signers": [
        "0xD8B04Fc7d03B0eFfC080028eEC3A5Ee239714B68",
        "0x5C74B1F7eAc0Fb8a4Ce43F0d1202e3C47d71DcA6"
      ]
    },
    "tags": ["Purchase Order"],
    "entities": ["0xD8B04Fc7d03B0eFfC080028eEC3A5Ee239714B68"]
  }
]
```
