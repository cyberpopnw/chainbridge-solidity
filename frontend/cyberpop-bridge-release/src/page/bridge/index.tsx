import { Form } from '@arco-design/web-react'
import { PrimaryTitle } from '@/component/Title'
import { StepContainer, StepWrapper } from '@/page/bridge/layout/stepContainer'
import { FlexCenter, FlexContainer } from '@/layout/flex'
import ChooseAddressForm from '@/page/bridge/component/stepForm/chooseAddressForm'

import { useState } from 'react'


import type { FC } from 'react'
import { ConfirmButton } from '@/page/bridge/layout/confirmButton'
import { SelectNFT } from '@/page/bridge/component/stepForm/selectNFT'


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
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState([1])

  const switchStep = (nextStepIndex: number) => () => {
    setCurrentStep(nextStepIndex)
    setCompletedSteps(old => [...old, nextStepIndex - 1])
  }

  return (
    <FlexContainer style={{ alignItems: 'center', flexDirection: "column", width: "100%" }}>
      <PrimaryTitle>Cross Chain NFT Bridge</PrimaryTitle>
      <Form layout="vertical">
        <StepContainer current={currentStep} direction="vertical" lineless>
          <Step title={stepTitle[1].title} description={
            <StepContent
              content={<ChooseAddressForm switchStep={switchStep(2)}/>}/>}/>
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
                disabledText={stepTitle[2].disabledText}
                content={<FlexCenter><ConfirmButton size="large" type="primary">Confirm</ConfirmButton></FlexCenter>}
              />
            }
          />
        </StepContainer>
      </Form>
    </FlexContainer>
  )
}

export default Bridge
