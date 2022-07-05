import { Table, Tag } from '@arco-design/web-react'
import TypographyAddress from '@/page/history/component/TypographyAddress'
import ChainTag from '@/component/ChainTag'

import { useState } from 'react'
import { useRequest } from 'ahooks'
import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'

import { getChain } from '@/lib/chainIds'
import { getDepositHistory } from '@/page/history/request'

import type { TableProps, TableColumnProps } from '@arco-design/web-react'
import type { DepositsHistory } from '@/page/history/type'
import type { Pagination } from '@/types/Pagination'

type DepositsHistoryData = {
  list?: DepositsHistory[];
  total?: number;
}

const DepositsLogTable = () => {
  const { selectedAddress } = useGlobalStateContext()
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1, pageSize: 10
  })

  const { data, loading } = useRequest<DepositsHistoryData, []>(
    () => getDepositHistory().then(data => ({
      list: data
        // ?.filter(record => record.Sender === selectedAddress || record.Recipient === selectedAddress)
        ?.slice((pagination.currentPage - 1) * pagination.pageSize, pagination.currentPage * pagination.pageSize),
      total: data?.length
    })),
    {
      refreshDeps: [pagination, selectedAddress]
    }
  )

  const columns: TableColumnProps<DepositsHistory>[] = [
    {
      title: 'No',
      width: '70px',
      render: (_, __, index) => index + 1
    },
    {
      title: 'Source Chain',
      dataIndex: 'Source',
      render: (_, { Source }) => {
        const chain = getChain(Source, 'bridgeId')

        return (
          <ChainTag color={chain?.color}>
            {chain?.chainName}
          </ChainTag>
        )
      }
    },
    {
      title: 'Destination Chain',
      dataIndex: 'Destination',
      render: (_, { Destination }) => {
        const chain = getChain(Destination, 'bridgeId')

        return (
          <ChainTag color={chain?.color}>
            {chain?.chainName}
          </ChainTag>
        )
      }
    },
    {
      title: 'Sender',
      dataIndex: 'Sender',
      render: (_, { Source, Sender }) => <TypographyAddress address={Sender} chain={getChain(Source, 'bridgeId')} />
    },
    {
      title: 'Operation',
      width: '100px',
      align: 'center',
      render: (_, { Sender }) => {
        const isOUT = Sender === selectedAddress
        return (
          <Tag color={isOUT ? '#C5EEE9' : '#F8EBCF'} size="small">
            <span style={{ color: isOUT ? '#02977e' : '#b47d00', fontWeight: 'bold' }}>{isOUT ? 'OUT' : 'IN'}</span>
          </Tag>
        )
      }
    },
    {
      title: 'Recipient',
      dataIndex: 'Recipient',
      render: (_, { Destination, Recipient }) => <TypographyAddress address={Recipient} chain={getChain(Destination, 'bridgeId')} />
    },
    {
      title: "Token ID",
      dataIndex: 'TokenID',
    },
    {
      title: 'Amount',
      dataIndex: 'Amount'
    }
  ]

  const tableProps: TableProps = {
    loading,
    columns,
    data: data?.list,
    border: true,
    scroll: { x: '100%' },
    rowKey: record => record.DataHash,
    pagination: {
      current: pagination.currentPage,
      pageSize: pagination.pageSize,
      total: data?.total,
      sizeCanChange: true,
      showTotal: true,
      showJumper: true,
      showMore: true,
      onChange: (pageNumber, pageSize) => setPagination({
        currentPage: pageNumber,
        pageSize
      })
    }
  }

  return (
    <Table {...tableProps} />
  )
}

export default DepositsLogTable
