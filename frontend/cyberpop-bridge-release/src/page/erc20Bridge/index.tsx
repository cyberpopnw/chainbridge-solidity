import { Message, Form, Typography, InputNumber, Input, Button, Space, Divider } from '@arco-design/web-react'
import { FaArrowCircleDown, FaWallet } from 'react-icons/fa'
import ChainSelect from '@/page/bridge/SelectNFT/component/ChainSelect'
import ProgressModal from '@/component/ProgressModal'

import { useState } from 'react'
import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'
import { useCytDeposit } from '@/hooks/useCytDeposit'
import { useRequest } from 'ahooks'

import { getChain } from '@/lib/chainIds'
import { switchChain } from '@/lib/metamask'
import { BigNumber } from 'ethers'
import isValidWalletAddress from '@/utils/isValidWalletAddress'

import { ReactComponent as CYT } from '@/assets/illustrations/CYT.svg'

import '@/scss/flex.scss'
import '@/page/erc20Bridge/index.scss'

import type { ERC20DepositFormValue } from '@/page/erc20Bridge/type'
import type { FormProps } from '@arco-design/web-react'
import { Main } from '@/layout/main'
import Content from '@/layout/Content'
import Nav from '@/component/Nav'


const ERC20Bridge = () => {
  const { contracts, selectedAddress, network } = useGlobalStateContext()
  const [progressModalVisible, setProgressModalVisible] = useState(false)
  const [formInstance] = Form.useForm()

  const cytDeposit = useCytDeposit()

  const { data: cytBalance } = useRequest<number, any[]>(() => (
      contracts?.CYT?.balanceOf(selectedAddress).then((res: any) => (
        BigNumber.from(res).toNumber()
      ))),
    {
      refreshDeps: [contracts, selectedAddress],
    }
  )

  const { run: deposit, loading: depositLoading, error } = useRequest<any, [ERC20DepositFormValue]>(values => {
    const destinationChainBridgeID = getChain(values.destinationChain)?.bridgeId
    if (destinationChainBridgeID == null) {
      return Promise.reject({ message: `Unknown Destination Chain ${values.destinationChain}` })
    }
    setProgressModalVisible(true)
    return cytDeposit(destinationChainBridgeID, values.receivedAddress, values.amount)
  }, {
    manual: true,
    onSuccess () {
      Message.success('Contract Active')
    },
    onError (e) {
      Message.error(e.message)
    }
  })

  const formProps: FormProps = {
    size: 'large',
    form: formInstance,
    onSubmit: deposit,
    validateTrigger: 'onBlur',
    autoComplete: 'off',
    onValuesChange: (value) => {
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
    }
  }

  return (
    <Main>
      <Nav/>
      <Content justifyCenter alignCenter>
        <div className="text-center">
          <h1 className="page-primary-title">
            Cross Chain ERC-20 Token
          </h1>
        </div>
        <Form {...formProps} style={{ marginTop: '5rem' }}>
          <div id="source">
            <Space direction="horizontal">
              <span className="description" style={{ lineHeight: '5rem' }}>Source Chain</span>
              <Form.Item layout="inline" field="sourceChain" initialValue={network?.chainId} noStyle>
                <ChainSelect className="select" style={{ height: '5rem' }}/>
              </Form.Item>
            </Space>
            <div className="divide"/>
            <div className="input-wrapper">
              <div className="d-flex justify-between align-center">
                <Typography.Text className="label">Sending Amount</Typography.Text>
                <Typography.Text className="balance">
                  Balance：{cytBalance || 0} CYT
                </Typography.Text>
              </div>
              <Form.Item field="amount" className="m-0" initialValue={cytBalance && 1} rules={[
                { required: true, message: 'Sending Amount is required.' },
                {
                  min: 1,
                  message: cytBalance ? 'Sending Amount must be greater than 1' : 'Available balance is insufficient.'
                },
                { max: cytBalance, message: `Max available balance is ${cytBalance}` }
              ]}>
                <InputNumber
                  autoFocus
                  disabled={!cytBalance}
                  min={1}
                  max={cytBalance}
                  placeholder="Sending Amount"
                  prefix={<CYT className="cyt-icon"/>}
                  suffix="CYT"
                  className="input"
                />
              </Form.Item>
              <Button type="outline" className="auto-complete" disabled={!cytBalance} onClick={
                () => formInstance.setFieldValue('amount', cytBalance)
              }>MAX</Button>
            </div>
          </div>
          <div className="divide"/>
          <Divider orientation="center">
            <FaArrowCircleDown style={{ width: '5rem', height: '5rem' }}/>
          </Divider>
          <div className="divide"/>
          <div id="destination">
            <Space direction="horizontal">
              <span className="description" style={{ lineHeight: '5rem' }}>Destination Chain</span>
              <Form.Item layout="inline" field="destinationChain" initialValue={network?.chainId} noStyle>
                <ChainSelect className="select" style={{ height: '5rem' }}/>
              </Form.Item>
            </Space>
            <div className="divide"/>
            <div className="input-wrapper">
              <Typography.Text className="label">Received Address</Typography.Text>
              <Form.Item field="receivedAddress" className="m-0" rules={[
                { required: true, message: 'Received Address is required.' },
                { validator: (value, callback) => callback(!isValidWalletAddress(value) && 'The address is not a valid Ethereum wallet address') }
              ]}>
                <Input
                  allowClear
                  prefix={<FaWallet className="wallet-icon"/>}
                  placeholder="Received Address"
                  className="input"
                />
              </Form.Item>
              <Button type="outline" className="auto-complete" onClick={
                () => formInstance.setFieldValue('receivedAddress', selectedAddress)
              }>Use my wallet address</Button>
            </div>
          </div>
          <Button
            long
            type="primary"
            htmlType="submit"
            loading={depositLoading}
            style={{ marginTop: '5rem' }}
          >
            Transfer
          </Button>
        </Form>
      </Content>
      <ProgressModal
        loading={depositLoading}
        result={{
          success: !error,
          errorMessage: error?.message
        }}
        visible={progressModalVisible}
        onCancel={() => setProgressModalVisible(false)}
      />
    </Main>
  )
}

export default ERC20Bridge
