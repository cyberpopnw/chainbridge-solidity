const Bridge = artifacts.require('Bridge');
const ERC20Handler = artifacts.require('ERC20Handler');
const ERC721Handler = artifacts.require('ERC721Handler');
const ERC1155Handler = artifacts.require('ERC1155Handler');

// Demo contracts
const CYT = artifacts.require('CYT')
const Cyborg = artifacts.require('Cyborg')
const Badge = artifacts.require('Badge')

const fs = require('fs')

module.exports = async function (deployer, network, accounts) {
  let relayer1 = '0x47EA8219Cc2b646AC6a10Ae9E59a82CB2A103Ac9'
  let relayer2 = '0xB03C52C465F0Fb2A7229A70C5a1D79d6c30162B0'

  let chainID = network == 'geth' ? 1 : 0; // {0: development, 1: geth}
  await deployer.deploy(Bridge, chainID, [], 1, 0, 10)
  let bridge = await Bridge.deployed()

  await bridge.adminAddRelayer(relayer1)
  await bridge.adminAddRelayer(relayer2)

  let addr = '0x47EA8219Cc2b646AC6a10Ae9E59a82CB2A103Ac9'
  let admin = await bridge.DEFAULT_ADMIN_ROLE()

  await bridge.grantRole(admin, addr)

  await deployer.deploy(ERC20Handler, bridge.address)
  await deployer.deploy(ERC721Handler, bridge.address)
  await deployer.deploy(ERC1155Handler, bridge.address)

  await deployer.deploy(CYT)
  await deployer.deploy(Cyborg)
  await deployer.deploy(Badge)

  let cyt = await CYT.deployed()
  let cyborg = await Cyborg.deployed()
  let badge = await Badge.deployed()

  await cyt.mint(addr, 100000000)
  await cyborg.safeMint(addr, 0)
  await badge.mint(addr, 0, 100, '0x')

  let resourceId = '0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce0'

  let assets = [cyt, cyborg, badge]
  let handlers = [ERC20Handler, ERC721Handler, ERC1155Handler]
  for (let i = 0; i < 3; i++) {
    let asset = assets[i]
    let handler = handlers[i]
    let minter = await asset.MINTER_ROLE()
    await asset.grantRole(minter, handler.address)
    await bridge.adminSetResource(handler.address, resourceId + i, asset.address)
    await bridge.adminSetBurnable(handler.address, asset.address)
  }

  const contractsDir = __dirname + "/../frontend/cyberpop-bridge/src/contract-address";

  fs.writeFileSync(
    contractsDir + `/${network}.json`,
    JSON.stringify({
      network,
      bridge: bridge.address,
      erc20handler: ERC20Handler.address,
      erc721handler: ERC721Handler.address,
      erc1155handler: ERC1155Handler.address,
      cyt: cyt.address,
      cyborg: cyborg.address,
      badge: badge.address,
    }, undefined, 2)
  );
};
