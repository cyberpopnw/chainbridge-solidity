import { Table, Tooltip, Typography, Tag } from '@arco-design/web-react'

import { useState } from 'react'
import { useRequest } from 'ahooks'
import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'

import { getDepositLog } from '@/page/history/request'

import type { TableProps, TableColumnProps } from '@arco-design/web-react'
import type { DepositsLog } from '@/page/history/type'
import type { Pagination } from '@/types/Pagination'
import { getChain } from '@/lib/chainIds'
import ChainTag from '@/component/ChainTag'

const DepositsLogTable = () => {
  const { selectedAddress } = useGlobalStateContext()
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1, pageSize: 10
  })

  const { data, loading } = useRequest<DepositsLog[], []>(
    () => getDepositLog().then(({ data: response }) => (
      response?.filter(item => item.Sender === selectedAddress || item.Recipient === selectedAddress)
    )),
    {
      refreshDeps: [pagination, selectedAddress]
    }
  )

  const columns: TableColumnProps<DepositsLog>[] = [
    {
      title: 'No',
      width: '70px',
      render: (_, __, index) => index + 1
    },
    {
      title: 'Source Chain',
      dataIndex: 'Source',
      render: (_, { Source }) => (
        <ChainTag chainName={getChain(Source, 'bridgeId')?.chainName} />
      )
    },
    {
      title: 'Destination Chain',
      dataIndex: 'Destination',
      render: (_, { Destination }) => (
        <ChainTag chainName={getChain(Destination, 'bridgeId')?.chainName} />
      )
    },
    {
      title: 'Sender',
      dataIndex: 'Sender',
      render: (_, { Sender }) => (
        <Tooltip content={Sender}>
          <Typography.Text ellipsis copyable className="m-0">{Sender}</Typography.Text>
        </Tooltip>
      )
    },
    {
      title: 'Operation',
      width: '100px',
      render: (_, { Sender }) => {
        const OUT = Sender === selectedAddress
        return (
          <Tag color={OUT ? '#C5EEE9' : '#F8EBCF'} size="small">
            <span style={{ color: OUT ? '#02977e' : '#b47d00', fontWeight: 'bold' }}>{ OUT ? 'OUT' : 'IN' }</span>
          </Tag>
        )
      }
    },
    {
      title: 'Recipient',
      dataIndex: 'Recipient',
      render: (_, { Recipient }) => (
        <Tooltip content={Recipient}>
          <Typography.Text ellipsis copyable className="m-0">{Recipient}</Typography.Text>
        </Tooltip>
      )
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
    data,
    columns,
    border: true,
    scroll: { x: 800 },
    rowKey: record => record.DataHash,
    pagination: {
      current: pagination.currentPage,
      pageSize: pagination.pageSize,
      total: data?.length,
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
