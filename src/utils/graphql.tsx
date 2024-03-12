import { GraphQLClient } from 'graphql-request'
import { getSdk } from '../generated/graphql'

const client = new GraphQLClient(`${import.meta.env.VITE_ARWEAVE_GATEWAY_URL}/graphql`)

export const sdk = getSdk(client)
