import { Form, Message, Steps } from '@arco-design/web-react'
import { SelectNFT } from '@/page/bridge/selectNFT'

import { useState } from 'react'
import { useRequest } from 'ahooks'
import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'
import { useCyborgDeposit } from '@/hooks/useCyborgDeposit'
import { useBadgeDeposit } from '@/hooks/useBadgeDeposit'

import { getChain } from '@/lib/chainIds'
import { switchChain } from '@/lib/metamask'

import type { FC } from 'react'

import '@/page/bridge/index.scss'
import TransferTo from '@/page/bridge/TransferTo'

type FormValue = {
  sourceAddress: string;
  sourceChain: number | 'unknown';
  targetAddress: string;
  targetChain: number;
  'nft-select': {
    selected: boolean;
    amount?: number;
    meta: {
      standard: string;
      id?: unknown;
    }
  }[]
}

const { Step } = Steps

const stepTitle = {
  1: {
    title: 'Step 1: Select NFT',
  },
  2: {
    title: 'Step 2: Transfer To',
    disabledText: 'Transfer NFT through Bridge'
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

const Bridge = () => {
  const { network } = useGlobalStateContext()
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState([1])
  const [formInstance] = Form.useForm()
  const cyborgDeposit = useCyborgDeposit()
  const badgeDeposit = useBadgeDeposit()

  const switchStep = (nextStepIndex: number) => () => {
    setCurrentStep(nextStepIndex)
    setCompletedSteps(old => [...old, nextStepIndex - 1])
  }

  const { run: deposit, loading } = useRequest<any, [FormValue]>(value => {
    if (value.sourceChain === 'unknown') {
      return Promise.reject({ message: 'SourceChain cannot be unknown' })
    }

    const _value = {
      ...value,
      sourceChain: getChain(value.sourceChain)?.bridgeId,
      targetChain: getChain(value.targetChain)?.bridgeId,
      selectedNFT: value['nft-select'].find(nft => nft.selected)
    }

    // TODO: change field validate
    if (!_value.selectedNFT) {
      return Promise.reject('Selected NFT not found, Please check.')
    }

    switch (_value.selectedNFT.meta.standard) {
      case 'ERC721':
        return cyborgDeposit(_value.targetChain, _value.targetAddress, _value.selectedNFT.meta.id)
      case 'ERC1155':
        return badgeDeposit(_value.targetChain, _value.targetAddress, _value.selectedNFT.meta.id, _value.selectedNFT.amount || 0)
      default:
        return Promise.reject('Not found match deposit function.')
    }
  }, {
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
        <h1 className="page-primary-title">Cross Chain NFT Bridge</h1>
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
                formInstance.setFieldValue('sourceChain', getChain(network?.chainId)?.chainId|| 'unknown')
              })
          }
        }}
        onSubmit={deposit}
      >
        <Steps className="step__wrapper" current={currentStep} direction="vertical" lineless>
          <Step
            title={stepTitle[1].title}
            description={(
              <StepContent>
                <SelectNFT form={formInstance} switchStep={switchStep(2)} />
              </StepContent>
            )}
          />
          <Step
            title={stepTitle[2].title}
            description={
              <StepContent
                disabled={currentStep !== 2 && !completedSteps.includes(2)}
                disabledText={stepTitle[2].disabledText}
              >
                <TransferTo form={formInstance} loading={loading} />
              </StepContent>
            }
          />
        </Steps>
      </Form>
    </>
  )
}

export default Bridge
