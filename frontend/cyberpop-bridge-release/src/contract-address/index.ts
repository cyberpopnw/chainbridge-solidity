export type Network = {
  network: string;
  bridge: string;
  erc20handler: string;
  erc721handler: string;
  erc1155handler: string;
  cyt: string;
  cyborg: string;
  badge: string;
}

export const fuji = {
  network: "fuji",
  bridge: "0x1BBC757562162e6BC04c9122095289BDB140B735",
  erc20handler: "0x5C22443fC337e825665eF829a16cF533cd115011",
  erc721handler: "0xaBa66752f7e1Af494d43f0664eb993E24464712C",
  erc1155handler: "0xA3434094B78C3f5136b93d584Ab8B36385eBbEc8",
  cyt: "0x85300E1Cf898170320E84a2DCC5C3560432c4c27",
  cyborg: "0xf6E62079E027aAf771727f05B290b7785267DE3E",
  badge: "0x8F3c19D2180f196656006D90557dC25ce7d5cbeC"
}

export const mumbai = {
  network: "mumbai",
  bridge: "0x96C1B07b8E826F5087CAB82fC34c505eeDB0D727",
  erc20handler: "0x5D4B9d2fB8B331f1F3c3930d34157e64B46895Ea",
  erc721handler: "0x00C54b178bfc49F7cEc22e0a37109F557eff2674",
  erc1155handler: "0x7A71be7b6Dc6D7F9796b95236005B5dDED64C46E",
  cyt: "0x6854B87a59Ad50119bFaBcBa5e61B42b964dD25C",
  cyborg: "0x091D93510D1A6Fc6f151C34fD4746fAe80bA06C6",
  badge: "0x88e693fBbc3aa4B8133CA053d5f6f5F7aa72Df1C"
}
