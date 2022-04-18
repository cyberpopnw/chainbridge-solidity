import type { FormInstance } from '@arco-design/web-react'

export type StepItemProps = {
  switchStep: () => void;
  form: FormInstance
}

export type NFTItem = {
  id: number;
  standard: string;
  amount?: number;
  name?: string;
  image?: string;
}
