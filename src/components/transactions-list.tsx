import { DataTable } from 'grommet'
import prettyBytes from 'pretty-bytes'
import { useNavigate } from 'react-router'
import TimeAgo from 'timeago-react'
import { ListTransactionsQuery } from '../generated/graphql'
import { formatNumber, formatTime } from '../utils/formatter'
import DataTablePlaceholder from './data-table-placeholder'

export default function TransactionsList(props: {
  value?: ListTransactionsQuery['transactions']['edges'][0]['node'][]
  relativeTime?: boolean
}) {
  const { value: transactions } = props
  const navigate = useNavigate()

  return (
    <DataTable
      primaryKey={false}
      columns={[
        {
          property: 'id',
          render: (transaction) =>
            `${transaction.id.substr(0, 8)}...${transaction.id.substr(
              transaction.id.length - 8,
              transaction.id.length,
            )}`,
          header: 'Hash',
        },
        {
          property: 'data.type',
          header: 'Type',
          render: (transaction) => {
            if (isArTransfer(transaction)) return '[AR Transfer]'
            if (isBundle(transaction)) return '[ANS-104 Bundle]'
            return transaction.data.type || <i>unknown</i>
          }
        },
        {
          property: 'data.size',
          render: (transaction) =>
            transaction.recipient
              ? `${formatNumber(parseFloat(transaction.quantity.ar))} AR`
              : prettyBytes(parseInt(transaction.data.size, 10), {
                  locale: true,
                  binary: true,
                }),
          align: 'end',
          header: 'Size / Amount',
        },
        {
          property: 'transaction.block',
          render: (transaction) =>
            transaction.block ? (
              props.relativeTime ? (
                <TimeAgo datetime={transaction.block.timestamp * 1000} />
              ) : (
                formatTime(new Date(transaction.block.timestamp * 1000))
              )
            ) : (
              'Pending'
            ),
          align: 'end',
          header: 'Timestamp',
        },
      ]}
      data={transactions}
      fill="vertical"
      placeholder={
        transactions?.length ? undefined : (
          <DataTablePlaceholder empty={transactions?.length === 0} />
        )
      }
      onClickRow={({ datum: transaction }) => {
        navigate(`/tx/${transaction.id}`)
      }}
    />
  )
}

function isArTransfer (tx: ListTransactionsQuery['transactions']['edges'][0]['node']) : boolean {
  return !!tx.recipient
}

function isBundle (tx: ListTransactionsQuery['transactions']['edges'][0]['node']) : boolean {
  return tx.tags.find(t => t.name === 'Bundle-Format')?.value === 'binary' &&
         tx.tags.find(t => t.name === 'Bundle-Version')?.value === '2.0.0'
}
