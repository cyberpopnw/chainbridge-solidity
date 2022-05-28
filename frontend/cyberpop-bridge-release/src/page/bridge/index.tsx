import { Form, Message, Steps } from '@arco-design/web-react'
import SelectNFT from '@/page/bridge/SelectNFT'
import TransferTo from '@/page/bridge/TransferTo'


import { useState } from 'react'
import { useRequest } from 'ahooks'
import { useGlobalStateContext } from '@/hooks/useGlobalStateContext'
import { useCyborgDeposit } from '@/hooks/useCyborgDeposit'
import { useBadgeDeposit } from '@/hooks/useBadgeDeposit'

import { getTokenURIs } from '@/page/bridge/SelectNFT/request'
import { getChain } from '@/lib/chainIds'

import type { FC } from 'react'
import type { NFTItem } from '@/page/bridge/SelectNFT/type'
import type { FormValues as SelectNFTFormValues } from '@/page/bridge/SelectNFT/type'
import type { FormValues as TransferToFormValues } from '@/page/bridge/TransferTo/type'

import '@/page/bridge/index.scss'
import ProgressModal from '@/page/bridge/ProgressModal'


type DepositValues = {
  targetChain: TransferToFormValues['targetChain'],
  targetAddress: TransferToFormValues['targetAddress'],
  standard: NFTItem['standard'],
  id: NFTItem['id'],
  amount: SelectNFTFormValues['amount']
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
  const { cyborg, badge, selectedAddress } = useGlobalStateContext()
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState([1])
  const [progressModalVisible, setProgressModalVisible] = useState(false)

  const cyborgDeposit = useCyborgDeposit()
  const badgeDeposit = useBadgeDeposit()

  const switchStep = (nextStepIndex: number) => () => {
    setCurrentStep(nextStepIndex)
    setCompletedSteps(old => [...old, nextStepIndex - 1])
  }

  const { data, loading: requestDataLoading } = useRequest<NFTItem[], any>(
    async () => getTokenURIs([cyborg, badge], selectedAddress || '')
  )

  const { run: deposit, loading: depositLoading, error } = useRequest<any, [DepositValues]>(value => {
    setProgressModalVisible(true)
    switch (value.standard) {
      case 'ERC721':
        return cyborgDeposit(value.targetChain, value.targetAddress, value.id)
      case 'ERC1155':
        return badgeDeposit(value.targetChain, value.targetAddress, value.id, value.amount as number)
      default:
        return Promise.reject('Not found match deposit function.')
    }
  }, {
    manual: true,
    onSuccess (res) {
      console.log('transaction result -->', res)
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
      <Form.Provider
        onFormSubmit={(formId, __ , { forms, }) => {
          if (!data?.length) {
            Message.error('No NFT available')
            return
          }
          if (formId === 'transferTo') {
            return Promise.all([
              forms['selectNFT']?.validate(),
              forms['transferTo']?.validate()
            ]).then(() => {
              const value = {
                ...forms['selectNFT']?.getFieldsValue(),
                ...forms['transferTo']?.getFieldsValue()
              } as SelectNFTFormValues & TransferToFormValues

              const selectedNFT = data[value.selectedNFTIndex]

              return deposit({
                targetChain: getChain(value.targetChain)?.bridgeId as number,
                targetAddress: value.targetAddress,
                standard: selectedNFT.standard,
                id: selectedNFT.id,
                amount: value.amount
              })
            }).catch(() => { Message.error('Field validation exception') })
          }
        }}
      >
        <Steps className="step__wrapper" current={currentStep} direction="vertical" lineless>
          <Step
            title={stepTitle[1].title}
            description={(
              <StepContent>
                <SelectNFT switchStep={switchStep(2)} data={data} dataLoading={requestDataLoading} />
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
                <TransferTo loading={depositLoading} />
              </StepContent>
            }
          />
        </Steps>
      </Form.Provider>
      <ProgressModal
        loading={depositLoading}
        result={{
          success: !error,
          errorMessage: error?.message
        }}
        visible={progressModalVisible}
        onCancel={() => setProgressModalVisible(false)}
      />
    </>
  )
}

export default Bridge
