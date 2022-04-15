import { Button, Form, Message, Steps } from '@arco-design/web-react'
import { ChooseAddressForm } from '@/page/cyt/chooseAddressForm'

import { useState } from 'react'
import { useCytDeposit } from '@/hooks/useCytDeposit'

import type { FC } from 'react'

import '@/page/bridge/index.scss'
import { InputNumber } from '@/page/cyt/component/InputNumber'

type FormValue = {
  sourceAddress: string;
  sourceChain: number;
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
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState([1])
  const [ depositLoading, setDepositLoading ] = useState(false)
  const [formInstance] = Form.useForm()
  const cytDeposit = useCytDeposit()

  const switchStep = (nextStepIndex: number) => () => {
    setCurrentStep(nextStepIndex)
    setCompletedSteps(old => [...old, nextStepIndex - 1])
  }

  const deposit = async (values: FormValue) => {
    cytDeposit(values.targetChain, values.targetAddress, values.amount)
      .then(() => {
        Message.success('Contract active')
      })
      .catch(e => {
        Message.error(e)
      })
  }

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
        onSubmit={async  (values: FormValue) => {
          setDepositLoading(true)
          await deposit(values)
          setDepositLoading(false)
        }}
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
                <Form.Item field="amount" wrapperCol={{ span: 24 }}>
                  <InputNumber />
                </Form.Item>
                <Form.Item className="step__item__next-step__wrapper">
                  <Button type="primary" size="large" className="step__item__next-step__button" onClick={switchStep(3)}>Next</Button>
                </Form.Item>
              </StepContent>
            }
          />
          <Step
            title={stepTitle[3].title}
            description={
              <StepContent
                disabled={currentStep !== 3 && !completedSteps.includes(3)}
                disabledText={stepTitle[3].disabledText}
              >
                <div className="flex-center">
                  <Button
                    className="step__item__next-step__button"
                    type="primary"
                    htmlType="submit"
                    loading={depositLoading}
                  >Confirm</Button>
                </div>
              </StepContent>
            }
          />
        </Steps>
      </Form>
    </>
  )
}

export default CYT
