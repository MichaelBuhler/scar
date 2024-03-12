import { Box, Spinner } from 'grommet'
import { useState } from 'react'

export default function DataPreview(props: { id: string; type?: string }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <Box background="light-6" height={{ min: '200px' }}>
      <object
        data={`${import.meta.env.VITE_ARWEAVE_GATEWAY_URL}/${props.id}`}
        type={props.type}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
      {loaded ? null : (
        <Box fill={true} align="center" justify="center">
          <Spinner />
        </Box>
      )}
    </Box>
  )
}
