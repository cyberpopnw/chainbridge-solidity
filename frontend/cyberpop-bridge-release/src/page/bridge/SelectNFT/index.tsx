import { Button, Form, Input, Spin, Message, Grid, Radio, Typography } from '@arco-design/web-react'
import ChainSelect from '@/component/chooseAddressForm/chainSelect'
import NFTCard from '@/page/bridge/SelectNFT/component/NFTCard'

import { useState } from 'react'
import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'

import { getChain } from '@/lib/chainIds'
import { switchChain } from '@/lib/metamask'
import selectNFTFormRules from '@/page/bridge/SelectNFT/formRules'

import '@/component/chooseAddressForm/index.scss'
import '@/page/bridge/index.scss'
import '@/scss/flex.scss'

import type { FC } from 'react'
import type { StepItemProps, NFTItem } from '@/page/bridge/SelectNFT/type'

type Props = {
  data?: NFTItem[];
  dataLoading?: boolean;
} & StepItemProps

const SelectNFT: FC<Props> = ({ switchStep, data }) => {
  const { selectedAddress, network } = useGlobalStateContext()
  const [isValidate, setIsValidate] = useState(true)
  const [formInstance] = Form.useForm()

  return (
    <Form
      id="selectNFT"
      form={formInstance}
      layout="vertical"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 24 }}
      onValuesChange={(value) => {
        // Switch the Metamask chain synchronously when switching the source chain using the form
        const chainId = network?.chainId
        const sourceChain = value.sourceChain
        if (chainId && sourceChain && chainId !== sourceChain && sourceChain !== 'unknown') {
          switchChain(sourceChain)
            .catch(e => {
              Message.error(e.message)
              formInstance.setFieldValue('sourceChain', getChain(network?.chainId)?.chainId || 'unknown')
            })
        }

        // selected ERC1155 NFT changes when reset amount field
        if (value.selectedNFTIndex) {
          formInstance.resetFields(['amount'])
        }
      }}
      onSubmit={() => {
        setIsValidate(true)
        switchStep?.()
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
        <Form.Item label="From" field="sourceChain" requiredSymbol={false}
                   rules={selectNFTFormRules.sourceChain}
                   initialValue={getChain(network?.chainId)?.chainId || 'unknown'}
        >
          <ChainSelect placeholder="Select Source Chain"/>
        </Form.Item>
        <Form.Item
          label="Source Address"
          field="sourceAddress"
          requiredSymbol={false}
          rules={selectNFTFormRules.sourceAddress}
          initialValue={selectedAddress}
        >
          {
            selectedAddress
              ? <Input readOnly/>
              : <Button type="primary" className="form-full-button">Connect Wallet</Button>
          }
        </Form.Item>
      </div>
      <div className="nft-select__wrapper">
        <Spin loading={false} size={40}>
          <h3 className="nft-select__title">
            {data?.length ? 'Select NFT' : 'No NFT available'}
          </h3>
          <Form.Item noStyle field="selectedNFTIndex" rules={selectNFTFormRules.selectedNFTIndex}>
            <Radio.Group className="nft-radio-card__wrapper">
              <Grid.Row gutter={[50, 30]} align="center">
                {
                  data?.map((NFTItem, index) => (
                    <Grid.Col span={8} key={NFTItem.standard + NFTItem.id}>
                      <NFTCard index={index} NFTItem={NFTItem} formInstance={formInstance}/>
                    </Grid.Col>
                  ))
                }
              </Grid.Row>
            </Radio.Group>

          </Form.Item>
        </Spin>
      </div>
      <div className="flex-center">
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className="next-step-button"
          status={isValidate ? 'success' : 'danger'}
          disabled={!data?.length}
        >
          NEXT
        </Button>
      </div>
    </Form>
  )
}

export default SelectNFT
