import { Button, Form, Input, Select } from '@arco-design/web-react'
import { FormContainer } from '@/page/bridge/layout/formContainer'

import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'

import type { FC } from 'react'
import type { SelectProps } from '@arco-design/web-react'

const SourceChainSelect: FC<SelectProps> = (props) => {
  const options = [
    // { icon: <EthereumIcon />, text: 'Ethereum' },
    { text: 'Ethereum' },
    { text: 'HECO' },
    { text: 'flow' },
    { text: 'polygon' },
  ]

  return (
    <Select {...props}>
      {
        options.map(option => (
          <Select.Option key={option.text} value={option.text}>
            {option.text}
          </Select.Option>
        ))
      }
    </Select>
  )
}

const ChooseAddressForm: FC<{
  switchStep: () => void
}> = ({ switchStep }) => {
  const { selectedAddress } = useGlobalStateContext()

  return (
    <>
      <FormContainer>
        <Form.Item label="From" field="sourceChain">
          <SourceChainSelect placeholder="Select Source Chain"/>
        </Form.Item>
        <Form.Item label="To" field="targetChain">
          <SourceChainSelect placeholder="Select Target Chain"/>
        </Form.Item>
        <Form.Item label="Source Address" field="sourceAddress">
          {
            selectedAddress
              ? <Input disabled />
              : <Button type="primary" className="form-full-button">Connect Wallet</Button>
          }
        </Form.Item>
        <Form.Item label="Target Address" field="targetAddress">
          <Input placeholder="Fill recipient address"/>
        </Form.Item>
      </FormContainer>
      <div className="next-step-button-wrapper">
          <Button type="primary" size="large" onClick={switchStep}>Next</Button>
      </div>
    </>
  )
}

export default ChooseAddressForm
