import { Form } from '@arco-design/web-react'
import { PrimaryTitle } from '@/layout/title'
import { StepContainer, StepWrapper } from '@/page/bridge/layout/stepContainer'
import { FlexCenter, FlexContainer } from '@/layout/flex'
import ChooseAddressForm from '@/page/bridge/component/stepForm/chooseAddressForm'
import { ConfirmButton } from '@/page/bridge/layout/confirmButton'
import { SelectNFT } from '@/page/bridge/component/stepForm/selectNFT'

import { useState } from 'react'

import type { FC } from 'react'
import type { FormProps } from '@arco-design/web-react'

type FormValue = {
  NFTItem: {
    selected: boolean | undefined,
    name: string;
    action: 'transfer' | 'sell'
  }[],
  sourceAddress: string;
  sourceChain: string;
  targetAddress: string;
  targetChain: string;
}

const { Step } = StepContainer

const stepTitle = {
  1: {
    title: 'Step 1: Choose Address',
  },
  2: {
    title: 'Step 2: Select NFT',
    disabledText: 'Select an NFT to transfer through NFT Bridge'
  },
  3: {
    title: 'Step 3: Transfer NFT',
    disabledText: 'Transfer NFT through Bridge'
  }
}

const StepContent: FC<{
  disabled?: boolean,
  disabledText?: string,
  content: JSX.Element
}> = ({ disabled, disabledText, content }) => {
  return (
    <StepWrapper>
      {
        disabled
          ? <div className="step-disabled-text">{disabledText}</div> : content
      }
    </StepWrapper>
  )
}

const Bridge = () => {
  const { useForm } = Form
  const [ formInstance ] = useForm()

  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState([1])

  const switchStep = (nextStepIndex: number) => () => {
    setCurrentStep(nextStepIndex)
    setCompletedSteps(old => [...old, nextStepIndex - 1])
  }

  const formProps: FormProps = {
    form: formInstance,
    layout: 'vertical',
    labelCol: { span: 4 },
    autoComplete: 'off',
    onSubmit (value: FormValue) {
      console.log({...value, NFTItem: value.NFTItem.filter(item => item.selected)})
    }
  }

  return (
    <FlexContainer style={{ alignItems: 'center', flexDirection: "column", width: "100%" }}>
      <PrimaryTitle>Cross Chain NFT Bridge</PrimaryTitle>
      <Form {...formProps}>
        <StepContainer current={currentStep} direction="vertical" lineless>
          <Step
            title={stepTitle[1].title}
            description={<StepContent content={<ChooseAddressForm switchStep={switchStep(2)}/>}/>}
          />
          <Step
            title={stepTitle[2].title}
            description={
              <StepContent
                disabled={currentStep !== 2 && !completedSteps.includes(2)}
                disabledText={stepTitle[2].disabledText}
                content={<SelectNFT switchStep={switchStep(3)}/>}
              />}
          />
          <Step
            title={stepTitle[3].title}
            description={
              <StepContent
                disabled={currentStep !== 3 && !completedSteps.includes(3)}
                disabledText={stepTitle[3].disabledText}
                content={<FlexCenter><ConfirmButton size="large" type="primary" htmlType="submit">Confirm</ConfirmButton></FlexCenter>}
              />
            }
          />
        </StepContainer>
      </Form>
    </FlexContainer>
  )
}

export default Bridge
