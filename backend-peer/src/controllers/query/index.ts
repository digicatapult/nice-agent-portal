import { Controller, Post, Route, SuccessResponse, Tags, Body } from 'tsoa'
import { injectable } from 'tsyringe'

import {
  Chainvine,
  Document,
  Entity,
  Attestation,
  Location,
} from '../../lib/services/chainvine.js'

// type DeepPartial<T> = {
//   [P in keyof T]?: DeepPartial<T[P]>
// }

interface FullAttestation extends Omit<Attestation, 'location'> {
  location: Location | undefined
}

interface FullDocument extends Omit<Document, 'entities' | 'attestation'> {
  entities: (Entity | undefined)[]
  attestation: FullAttestation | undefined
}

interface QueryResponse {
  data: FullDocument[]
  errors?: string
  metadata: {
    numberFound: string
  }
}

//type Query = DeepPartial<FullDocument>[]
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
    const attestationsWithLocations = attestations.map((attestation) => ({
      ...attestation,
      location: locations.find(({ id }) => id === attestation.location),
    }))

    const fullDocs = documents.map((document) => ({
      ...document,
      entities: document.entities.map((entityId) =>
        entities.find(({ id }) => id === entityId)
      ),
      attestation: attestationsWithLocations.find(({ signers }) =>
        signers.includes(document.entities[0])
      ),
    }))

    const findDocuments = (query: Query, documents: Document[]): Document[] => {
      return query.reduce((result, q) => {
        const filtered = documents.filter((doc) => {
          for (const key in q) {
            if (Object.prototype.hasOwnProperty.call(q, key)) {
              if (doc[key] !== q[key]) {
                return false
              }
            }
          }
          return true
        })
        return result.concat(filtered)
      }, [])
    }
    const found = query.map((docToFind) =>
      fullDocs.filter((doc) =>
        docToFind.id
          ? doc.id === docToFind.id
          : true && doc.createdAt
            ? doc.createdAt === docToFind.createdAt
            : true
      )
    )

    return {
      data: fullDocs,
      metadata: {
        numberFound: `${documents.length}/${query.length}`,
      },
    }
  }
}
