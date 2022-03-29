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
  // 中继器投票签名地址
  let relayer1 = '0x47EA8219Cc2b646AC6a10Ae9E59a82CB2A103Ac9'
  let relayer2 = '0xB03C52C465F0Fb2A7229A70C5a1D79d6c30162B0'


  // chainID 公链序号，不是network_id，由桥部署者指定，用于路由跨链请求 如：
  // mumbai: 0, rinkeby: 1, fuji: 2
  let chainID = network == 'geth' ? 1 : 0; // {0: development, 1: geth}
  await deployer.deploy(Bridge, chainID, [], 1, 0, 10)
  let bridge = await Bridge.deployed()

  // 给中继器授权
  await bridge.adminAddRelayer(relayer1)
  await bridge.adminAddRelayer(relayer2)

  // 非部署角色的管理员，用于前端进行一些维护操作,非必须
  let addr = '0x47EA8219Cc2b646AC6a10Ae9E59a82CB2A103Ac9'
  let admin = await bridge.DEFAULT_ADMIN_ROLE()

  await bridge.grantRole(admin, addr)

  // 部署资产处理器
  await deployer.deploy(ERC20Handler, bridge.address)
  await deployer.deploy(ERC721Handler, bridge.address)
  await deployer.deploy(ERC1155Handler, bridge.address)

  // 示例资产合约
  await deployer.deploy(CYT) // ERC20
  await deployer.deploy(Cyborg) // ERC721
  await deployer.deploy(Badge) // ERC1155

  let cyt = await CYT.deployed()
  let cyborg = await Cyborg.deployed()
  let badge = await Badge.deployed()

  await cyt.mint(addr, 100000000)
  await cyborg.safeMint(addr, 0)
  await badge.mint(addr, 0, 100, '0x')

  // ResourceID是同一资产在不同链上的统一标识
  let resourceId = '0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce0'

  let assets = [cyt, cyborg, badge]
  let handlers = [ERC20Handler, ERC721Handler, ERC1155Handler]
  for (let i = 0; i < 3; i++) {
    let asset = assets[i]
    let handler = handlers[i]
    let minter = await asset.MINTER_ROLE()
    // 给资产处理器添加MINTER角色
    await asset.grantRole(minter, handler.address)
    // 指定ResourceID对应的合约地址及处理器合约
    await bridge.adminSetResource(handler.address, resourceId + i, asset.address)
    await bridge.adminSetBurnable(handler.address, asset.address)
  }

  const contractsDir = __dirname + "/../frontend/cyberpop-bridge/src/contract-address";

  // 保存合约地址，用于 UI 读取
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
