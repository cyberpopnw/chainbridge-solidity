import React from "react";
import { ethers } from "ethers"

export function TransferCyborg({ bridge, erc721 }) {
    const resourceId = '0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce01'
    const deposit = async (chainId, to, tokenId) => {
        let handler = await bridge._resourceIDToHandlerAddress(resourceId)
        await erc721.approve(handler, tokenId)
        const data = '0x' +
            ethers.utils.hexZeroPad(ethers.BigNumber.from(tokenId).toHexString(), 32).substr(2) +
            ethers.utils.hexZeroPad(ethers.utils.hexlify((to.length - 2) / 2), 32).substr(2) +
            to.substr(2);
        await bridge.deposit(chainId, resourceId, data)
    }
    return (
        <div>
            <h4>Transfer ERC721</h4>
            <form
                onSubmit={(event) => {
                    // This function just calls the transferTokens callback with the
                    // form's data.
                    event.preventDefault();

                    const formData = new FormData(event.target);
                    const to = formData.get("to");
                    const tokenId = formData.get("token_id");
                    const chainId = formData.get("chain_id");

                    if (to && tokenId) {
                        deposit(chainId, to, tokenId);
                    }
                }}
            >
                <div className="form-group">
                    <label>Token ID</label>
                    <input
                        className="form-control"
                        type="number"
                        step="1"
                        min="0"
                        name="token_id"
                        placeholder="0"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Recipient address</label>
                    <input className="form-control" type="text" name="to" required />
                </div>
                <div className="form-group">
                    <label>Chain</label>
                    <select className="form-control" name="chain_id" required>
                        <option value="0">Mumbai</option>
                        <option value="1">Rinkeby</option>
                    </select>
                </div>
                <div className="form-group">
                    <input className="btn btn-primary" type="submit" value="Transfer" />
                </div>
            </form>
        </div>
    );
}
