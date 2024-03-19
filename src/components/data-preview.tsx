import { useEffect, useState } from 'react'

interface Props {
  id: string
  type: string
}

export default function DataPreview (props: Props) {
  const { id: txId, type } = props

  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<string>()

  useEffect(() => {
    setLoading(true)
    fetch(new URL(txId, import.meta.env.VITE_ARWEAVE_GATEWAY_URL)).then(async response => {
      const data = await response.text()
      if (type === 'application/json') {
        try {
          const obj = JSON.parse(data)
          const formatted = JSON.stringify(obj, null, 2)
          setData(formatted)
        } catch (e) {
          setData(data)
        }
      } else {
        setData(data)
      }
      setLoading(false)
    })
  }, [txId])

  return (loading ? (
    <>Loading...</>
  ) : (
    <pre>{data}</pre>
  ))
}
