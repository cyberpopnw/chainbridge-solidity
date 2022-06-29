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

export const fuji: Network = {
  network: "fuji",
  bridge: "0x158A9b46eD1D49eeECf688fD84e354804d4fC948",
  erc20handler: "0x45A0964978c18D9AC4a0ec97357B3DB346Cb088B",
  erc721handler: "0x765C6773d1641Bb5d5661711b7e0a3E0DA238875",
  erc1155handler: "0xD9D79EADCAc53A2d1d0edb4EB5fC200BA07f52Bc",
  cyt: "0x6fdd82628a7A298f05f0731167800AB40f204670",
  cyborg: "0x78F66E37e9fE077d2F0126E3a26e6FB0D14F2BB0",
  badge: "0x586eba6be3ffc2499df154aef81b6d3a342c8e34"
}

export const mumbai: Network = {
  network: "mumbai",
  bridge: "0x8c909a2271dA2Ea7FaF3ffC2C48899bc41b1A771",
  erc20handler: "0xcDBD08292960dFe402968dd28A2DD1E3edd05CE9",
  erc721handler: "0xE289fDb8cd1F42b0cE926043395eDc3B7790e22b",
  erc1155handler: "0xEbB3Bd1CB05222D69D93AE68214C97b6baB7f38F",
  cyt: "0x2ae8B27d2cdd30ac49ecea7bDeb9132CaFb6CF2E",
  cyborg: "0x5D20dDE7824E877eEBC20278dbeA933DbAf234Df",
  badge: "0x11B79f28B9EEED3cdF2a1A6e6264356F2f70f66A"
}

export const bscTestNet: Network = {
  network: 'bsc',
  bridge: '0xC44885950D90F0446F891aa30156588F6DB15fEE',
  cyborg: '0x1D2F66E7E2eCCEC8F532Ac995664d1d0EB6Fc420',
  cyt: '0x85610a423Ada9aC018b86105d3A4919D954bDEaE',
  badge: '0xa223ad6F35afa4712af824C924e7bAcA8342239E',
  erc20handler: '0x802FeD2eB528A7F9Cd17B1ca4174D88e4C31c850',
  erc721handler: '0x83721E07e6fF00aB64C3F30B6D687693d507F536',
  erc1155handler: '0x2E5856d83C8A4BC4908DD3169E6dEeaEEc5a4234'
}
