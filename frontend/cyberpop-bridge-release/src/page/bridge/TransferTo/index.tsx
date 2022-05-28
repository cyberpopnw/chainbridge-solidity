import { Button, Form, Input, Message, Typography } from '@arco-design/web-react'
import ChainSelect from '@/component/chooseAddressForm/chainSelect'

import { useState } from 'react'
import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'

import formRules from '@/page/bridge/TransferTo/formRules'

import '@/component/chooseAddressForm/index.scss'
import '@/page/bridge/index.scss'
import '@/scss/flex.scss'

import type { FC } from 'react'
import type { StepItemProps } from '@/page/bridge/SelectNFT/type'

type Props = {
  loading?: boolean
} & StepItemProps

const TransferTo: FC<Props> = ({loading }) => {
  const { selectedAddress } = useGlobalStateContext()
  const [formInstance] = Form.useForm()
  const [isValidate, setIsValidate] = useState(true)

  return (
    <Form
      id="transferTo"
      layout="vertical"
      form={formInstance}
      onSubmit={() => {
        setIsValidate(true)
      }}
      onSubmitFailed={errors => {
        setIsValidate(false)
        for (const error in errors) {
          Message.error({
            content: (
              <Typography.Text>
                Field validation exception: <Typography.Text type="error" bold>{ errors[error].message }</Typography.Text>
              </Typography.Text>
            )
          })
        }
      }}
    >
      <div className="choose-address-form">
        <Form.Item label="To" field="targetChain" rules={formRules.targetChain}>
          <ChainSelect placeholder="Select Target Chain"/>
        </Form.Item>
        <Form.Item
          label="Target Address"
          field="targetAddress"
          rules={formRules.targetAddress}
          extra={<span className="target-address__button"
                       onClick={() => formInstance.setFieldValue('targetAddress', selectedAddress)}>Use my wallet address as the target address</span>}
        >
          <Input placeholder="Fill recipient address"/>
        </Form.Item>
      </div>
      <div className="flex-center">
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="next-step-button"
          loading={loading}
          status={isValidate ? 'success' : 'danger'}
        >
          Transfer
        </Button>
      </div>
    </Form>
  )
}

export default TransferTo
