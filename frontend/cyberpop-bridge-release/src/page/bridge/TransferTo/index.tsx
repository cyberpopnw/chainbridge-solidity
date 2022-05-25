import { Button, Form, Input } from '@arco-design/web-react'
import ChainSelect from '@/component/chooseAddressForm/chainSelect'

import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'

import '@/component/chooseAddressForm/index.scss'
import '@/page/bridge/index.scss'
import '@/scss/flex.scss'

import type { FC } from 'react'
import type { StepItemProps } from '@/page/bridge/selectNFT/type'

type Props = {
  loading?: boolean
} & StepItemProps

const TransferTo: FC<Props> = ({  form, loading }) => {
  const { selectedAddress } = useGlobalStateContext()

  return (
    <>
      <div className="choose-address-form">
        <Form.Item label="To" field="targetChain" rules={[{ required: true, message: 'Target chain is required' }]}>
          <ChainSelect placeholder="Select Target Chain"/>
        </Form.Item>
        <Form.Item
          label="Target Address"
          field="targetAddress"
          rules={[{ required: true, message: 'Target address is required' }]}
          extra={<span className="target-address__button"
                       onClick={() => form.setFieldValue('targetAddress', selectedAddress)}>Use my wallet address as the target address</span>}
        >
          <Input placeholder="Fill recipient address"/>
        </Form.Item>
      </div>
      <div className="flex-center">
        <Button type="primary" htmlType="submit" className="next-step-button" loading={loading}>Transfer</Button>
      </div>
    </>
  )
}

export default TransferTo
