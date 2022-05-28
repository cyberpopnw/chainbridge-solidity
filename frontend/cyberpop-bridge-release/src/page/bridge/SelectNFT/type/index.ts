export type StepItemProps = {
  switchStep?: () => void;
}

export type NFTItem = {
  id: number;
  standard: 'ERC721' | 'ERC1155';
  address?: string;
  amount?: number;
  name?: string;
  image?: string;
}

export type FormValues = {
  sourceChain: number | 'unknown';
  sourceAddress: string;
  selectedNFTIndex: number;
  amount?: number;
}
