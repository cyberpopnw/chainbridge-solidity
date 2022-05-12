import { Button, Form, Message, Steps, InputNumber } from '@arco-design/web-react'
import ChooseAddressForm from '@/component/chooseAddressForm'

import { useState } from 'react'
import { useRequest } from 'ahooks'
import { useCytDeposit } from '@/hooks/useCytDeposit'
import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'

import { BigNumber } from 'ethers'
import { switchChain } from '@/lib/metamask'
import { getChain } from '@/lib/chainIds'

import type { FC } from 'react'

import '@/page/bridge/index.scss'

type FormValue = {
  sourceAddress: string;
  sourceChain: number | 'unknown';
  targetAddress: string;
  targetChain: number;
  amount: number;
}

const { Step } = Steps

const stepTitle = {
  1: {
    title: 'Step 1: Choose Address',
  },
  2: {
    title: 'Step 2: Fill Amount',
    disabledText: 'Fill in the amount of CYT you want to transfer'
  },
  3: {
    title: 'Step 3: Confirm Transfer',
    disabledText: 'Transfer CYT through Bridge'
  }
}

const StepContent: FC<{
  disabled?: boolean,
  disabledText?: string
}> = ({ disabled, disabledText, children }) => {
  return (
    <div className={disabled ? 'step__item step__item--disabled' : 'step__item'}>
      {
        disabled
          ? <div className="step__item__text">{disabledText}</div>
          : children
      }
    </div>
  )
}

const CYT = () => {
  const { network, cyt, selectedAddress } = useGlobalStateContext()

  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState([1])

  const [formInstance] = Form.useForm()

  const cytDeposit = useCytDeposit()

  const switchStep = (nextStepIndex: number) => () => {
    setCurrentStep(nextStepIndex)
    setCompletedSteps(old => [...old, nextStepIndex - 1])
  }

  const { data: cytBalance } = useRequest<number, any[]>(() => (
    cyt?.balanceOf(selectedAddress).then((res: any) => (
      BigNumber.from(res).toNumber()
    ))),
    {
      refreshDeps: [cyt, selectedAddress]
    }
  )

  const { run: deposit, loading: depositLoading } = useRequest<any, [FormValue]>(values => (
    cytDeposit(values.targetChain, values.targetAddress, values.amount)
  ), {
    manual: true,
    onSuccess () {
      Message.success('Contract Active')
    },
    onError (e) {
      Message.error(e.message)
    }
  })

  return (
    <>
      <div className="text-center">
        <h1 className="page-primary-title">Cross Chain CYT Bridge</h1>
      </div>
      <Form
        scrollToFirstError
        form={formInstance}
        labelCol={{ span: 0 }}
        layout="vertical"
        autoComplete="off"
        onValuesChange={value => {
          const chainId = network?.chainId
          const { sourceChain } = value
          if (chainId && sourceChain && chainId !== sourceChain && sourceChain !== 'unknown') {
            switchChain(sourceChain)
              .catch(e => {
                Message.error(e.message)
                formInstance.setFieldValue('sourceChain', getChain(network?.chainId) || 'unknown')
              })
          }
        }}
        onSubmit={deposit}
      >
        <Steps className="step__wrapper" current={currentStep} direction="vertical" lineless>
          <Step
            title={stepTitle[1].title}
            description={
            <StepContent>
              <ChooseAddressForm switchStep={switchStep(2)} form={formInstance} />
            </StepContent>}
          />
          <Step
            title={stepTitle[2].title}
            description={
              <StepContent
                disabled={currentStep !== 2 && !completedSteps.includes(2)}
                disabledText={stepTitle[2].disabledText}
              >
                <Form.Item field="amount">
                  <InputNumber min={1} max={cytBalance || 0} mode="button" placeholder="Amount" />
                </Form.Item>
                <Form.Item className="step__item__next-step__wrapper">
                  <Button
                    className="step__item__next-step__button"
                    type="primary"
                    status="success"
                    htmlType="submit"
                    loading={depositLoading}
                  >Transfer</Button>
                </Form.Item>
              </StepContent>
            }
          />
        </Steps>
      </Form>
    </>
  )
}

export default CYT
