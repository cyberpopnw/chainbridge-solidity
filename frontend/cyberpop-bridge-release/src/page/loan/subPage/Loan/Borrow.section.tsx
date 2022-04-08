import { Form, Checkbox, Input, Select, FormProps } from '@arco-design/web-react'

const options = [
  {
    label: 'SuperRare',
    value: 'SuperRare'
  },
  {
    label: 'Somnium Space Items',
    value: 'SomniumSpaceItems'
  },
  {
    label: 'Wrapped Cyrptopunks',
    value: 'WrappedCyrptopunks'
  },
  {
    label: 'cyberpop',
    value: 'cyberpop'
  },
]

const BorrowSection = () => {
  const formProps: FormProps = {
    size: 'large',
    labelCol: {
      span: 2
    }
  }

  return (
    <Form {...formProps}>
      <Form.Item label="Available">
        <Checkbox.Group direction="horizontal" options={options} />
      </Form.Item>
      <Form.Item label="I want">
        <Input
          style={{ width: '60rem' }}
          addAfter={
            <Select defaultValue='ETH' style={{ width: '10rem' }}>
              <Select.Option value='ETH'>ETH</Select.Option>
              <Select.Option value='USDT'>USDT</Select.Option>
            </Select>
          }
          allowClear
        />
      </Form.Item>
      <Form.Item label="I want">
        <Select defaultValue='1 Day' style={{ width: 100 }}>
          <Select.Option value='1'>1 Day</Select.Option>
          <Select.Option value='2'>2 Day</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  )
}

export default BorrowSection
