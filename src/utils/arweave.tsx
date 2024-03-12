import Arweave from 'arweave'

const url = new URL(import.meta.env.VITE_ARWEAVE_GATEWAY_URL)

export const arweave = Arweave.init({
  protocol: url.protocol.slice(0, -1), // remove the trailing ':'
  host: url.hostname,
  port: url.port,
})

export { Arweave }
