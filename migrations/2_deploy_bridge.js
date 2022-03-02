const Bridge = artifacts.require('Bridge');
const ERC20Handler = artifacts.require('ERC20Handler');
const ERC721Handler = artifacts.require('ERC721Handler');
const ERC1155Handler = artifacts.require('ERC1155Handler');

const fs = require('fs')

module.exports = async function (deployer, network, accounts) {
  let chainID = network == 'mumbai' ? 0 : 1;
  await deployer.deploy(Bridge, chainID, [], 1, 0, 10)
  let bridge = await Bridge.deployed()
  //let bridge = '0xFd10eA2a062564f7E2EDb4e39CBCF3C956d29f40';
  //let cyt = await CyberPopToken.deployed();
  let addr = '0x47EA8219Cc2b646AC6a10Ae9E59a82CB2A103Ac9'
  let admin = await bridge.DEFAULT_ADMIN_ROLE()
  await bridge.grantRole(admin, addr)

  await deployer.deploy(ERC20Handler, bridge.address)
  await deployer.deploy(ERC721Handler, bridge.address)
  await deployer.deploy(ERC1155Handler, bridge.address)

  const contractsDir = __dirname + "/../frontend/cyberpop-bridge/src/contract-address";

  fs.writeFileSync(
    contractsDir + `/${network}.json`,
    JSON.stringify({
      network,
      bridge: bridge.address,
      erc20handler: ERC20Handler.address,
      erc721handler: ERC721Handler.address,
      erc1155handler: ERC1155Handler.address,
   }, undefined, 2)
  );
};
