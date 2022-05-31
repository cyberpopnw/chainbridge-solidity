import { Button, Modal, Result } from '@arco-design/web-react'
import { IconSync, IconClose, IconCheck } from '@arco-design/web-react/icon'

import type { FC } from 'react'
import type { ModalProps } from '@arco-design/web-react'

type Props = {
  loading: boolean,
  result: {
    success: boolean;
    transaction?: any;
    errorMessage?: string;
  }
} & ModalProps

const ProgressModal: FC<Props> = ({ loading, result, ...ModalProps }) => {
  const resultProps = {
    title: {
      loading: 'Processing',
      success: 'Successful',
      failed: 'Failed'
    },
    subTitle: {
      loading: 'Is interacting with a smart contract...',
      success: 'Transaction completed'
    },
    icon: {
      loading: <IconSync spin />,
      success: <IconCheck />,
      failed: <IconClose />
    }
  }

  return (
    <Modal
      autoFocus
      focusLock
      footer={null}
      {...ModalProps}
    >
      <Result
        status={'error'}
        title={loading ? resultProps.title.loading : (result.success ? resultProps.title.success : resultProps.title.failed)}
        subTitle={loading ? resultProps.subTitle.loading : (result.success ? resultProps.subTitle.success : result.errorMessage)}
        icon={loading ? resultProps.icon.loading : (result.success ? resultProps.icon.success : resultProps.icon.failed)}
        extra={<Button disabled={loading} type="primary" href='/log'>View Transaction Log</Button> }
      />
    </Modal>
  )
}

export default ProgressModal
