import type { FormInstance } from '@arco-design/web-react'

export type StepItemProps = {
  switchStep?: () => void;
  form: FormInstance
}

export type NFTItem = {
  id: number;
  standard: 'ERC721' | 'ERC1155';
  address?: string;
  amount?: number;
  name?: string;
  image?: string;
}
