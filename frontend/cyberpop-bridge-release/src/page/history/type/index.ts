export type DepositsLog = {
  Source: number;
  Destination: number;
  Sender: string;
  Recipient: string;
  SourceTokenAddress: string;
  DestinationTokenAddress: string;
  TokenID: number;
  Amount: string;
  Type: string;
  DepositNonce: number;
  DataHash: string;
}
