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
  bridge: "0xb978636d2611fC7dCf9B24FfC17E11AFB37D42D1",
  erc20handler: "0x1F805fCEB8E812CA599996777493e565bEddB584",
  erc721handler: "0x2ed6573D746F6879EE50767AB0B8ad79B733d357",
  erc1155handler: "0x8325ee9436De9d269C4a049e2a0c260197D5E877",
  cyt: "0x8b9A1f343A2664483be2987aEA50147249B0F5A3",
  cyborg: "0x93444791DfBe44B7aa25c7f864fBBc73ED432703",
  badge: "0x6714D43c34D06EA4896724379795Ce7DA9b7c88f"
}
