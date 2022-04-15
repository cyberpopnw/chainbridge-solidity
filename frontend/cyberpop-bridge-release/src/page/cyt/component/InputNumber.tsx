import { Button, Input } from '@arco-design/web-react';
import { IconPlus, IconMinus } from '@arco-design/web-react/icon'

import type { FC } from 'react';

type Props = {
  value?: string;
  onChange?: (value: string) => void
}

export const InputNumber: FC<Props> = ({ value, onChange }) => {
  return (
    <div className="input-number">
      <Button icon={<IconMinus />} shape="circle" onClick={() => onChange?.((parseInt(value || '1') - 1).toString())} />
      <Input className="input-number__input" value={value} onChange={onChange} placeholder="CYT" />
      <Button icon={<IconPlus />} shape="circle" onClick={() => onChange?.((parseInt(value || '-1') + 1).toString())} />
    </div>
  )
}
