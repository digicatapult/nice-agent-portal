import { Controller, Post, Route, SuccessResponse, Tags, Body } from 'tsoa'
import { injectable } from 'tsyringe'

import {
  Chainvine,
  Document,
  Entity,
  Attestation,
  Location,
} from '../../lib/services/chainvine.js'

interface FullAttestation extends Omit<Attestation, 'location'> {
  location: Location
}

interface FullDocument extends Omit<Document, 'attestation'> {
  fullEntities: Entity[]
  attestation?: FullAttestation
}

interface QueryResponse {
  data: (FullDocument | undefined)[]
  errors?: string
  metadata: {
    numberFound: string
  }
}

type Query = Partial<Document>[]

@Route('api/query')
@Tags('query')
@injectable()
export class QueryController extends Controller {
  constructor(private chainvine: Chainvine) {
    super()
  }

  /**
   * @summary Receive a query to fetch documents from the chainvine expanse API
   */
  @SuccessResponse(200)
  @Post('/receive')
  public async post(@Body() query: Query): Promise<QueryResponse> {
    console.log(query)
    const documents = await this.chainvine.getDocuments()

    const entities = await this.chainvine.getEntities()
    const attestations = await this.chainvine.getAttestations()
    const locations = await this.chainvine.getLocations()
    const attestationsWithLocations = attestations.reduce(
      (acc: FullAttestation[], attestation) => {
        const location = locations.find(({ id }) => id === attestation.location)
        return location ? [...acc, { ...attestation, location }] : acc
      },
      []
    )

    const fullDocs = documents.map((document) => ({
      ...document,
      fullEntities: document.entities.reduce((acc: Entity[], entityId) => {
        const found = entities.find(({ id }) => id === entityId)
        return found ? [...acc, found] : acc
      }, []),
      attestation: attestationsWithLocations.find(({ signers }) =>
        signers.includes(document.entities[0])
      ),
    }))

    const matchingDocs = query
      .map((queryDoc) =>
        fullDocs.find((doc) =>
          Object.keys(queryDoc).every((key) => {
            const queryValue = queryDoc[key as keyof Document]
            const docValue = doc[key as keyof Document]

            if (Array.isArray(queryValue) && Array.isArray(docValue)) {
              return queryValue.every((value) => docValue.includes(value))
            }

            return docValue === queryValue
          })
        )
      )
      .filter((doc) => doc !== undefined)

    return {
      data: matchingDocs,
      metadata: {
        numberFound: `${matchingDocs.length}/${query.length}`,
      },
    }
  }
}
