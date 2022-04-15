import { Button, Form, Input } from '@arco-design/web-react'
import { ChainSelect } from '@/page/cyt/chooseAddressForm/chainSelect'
import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'

import type { FC } from 'react'
import type { StepItemProps } from '@/page/cyt/type'

export const ChooseAddressForm: FC<StepItemProps> = (props) => {
  const { selectedAddress, network } = useGlobalStateContext()

  const nextStep = () => {
    props.form.validate([
      'sourceAddress',
      'sourceChain',
      'targetAddress',
      'targetChain'
    ]).then(() => props.switchStep())
  }

  return (
    <div className="choose-address-form">
      <Form.Item label="From" field="sourceChain" rules={[{ required: true, message: 'Source chain is required' }]}
                 initialValue={network?.chainId}
      >
        <ChainSelect placeholder="Select Source Chain"/>
      </Form.Item>
      <Form.Item label="To" field="targetChain" rules={[{ required: true, message: 'Target chain is required' }]}>
        <ChainSelect placeholder="Select Target Chain"/>
      </Form.Item>
      <Form.Item label="Source Address" field="sourceAddress" initialValue={selectedAddress}>
        {
          selectedAddress
            ? <Input readOnly/>
            : <Button type="primary" className="form-full-button">Connect Wallet</Button>
        }
      </Form.Item>
      <Form.Item
        label="Target Address"
        field="targetAddress"
        rules={[{ required: true, message: 'Target address is required' }]}
        extra={<span className="target-address__button"
                     onClick={() => props.form.setFieldValue('targetAddress', selectedAddress)}>Use my wallet address as the target address</span>}
      >
        <Input placeholder="Fill recipient address"/>
      </Form.Item>
      <Form.Item className="step__item__next-step__wrapper">
        <Button className="step__item__next-step__button" type="primary" onClick={nextStep}>Next</Button>
      </Form.Item>
    </div>
  )
}
