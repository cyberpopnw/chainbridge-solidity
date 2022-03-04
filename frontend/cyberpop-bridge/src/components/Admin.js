import React, { useEffect, useState } from "react"

export function Admin({ bridge, contractAddress }) {
    const [relayer, setRelayer] = useState('')

    const [handler, setHandler] = useState('')
    const [token, setToken] = useState('')

    const adminAddRelayer = async () => {
        if (relayer) {
            await bridge.adminAddRelayer(relayer)
            setRelayer('')
        }
    }

    const adminSetBurnable = async () => {
        if (token) {
            await bridge.adminSetBurnable(handler, token)
        }
    }

    return (
        <>
            <div>
                <h4>Add Relayer</h4>
                <div className="form-group">
                    <label>Relayer</label>
                    <input className="form-control" type="text" name="relayer" value={relayer} required onChange={(e) => setRelayer(e.target.value)} />
                </div>
                <div className="form-group">
                    <input className="btn btn-primary" type="button" value="Submit" onClick={adminAddRelayer} />
                </div>
            </div>
            <div>
                <h4>Set Burnable</h4>
                <div className="form-group">
                    <label>Token</label>
                    <input className="form-control" type="text" name="relayer" value={token} required onChange={(e) => setToken(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Handler</label>
                    <select className="form-control" type="text" name="handler" value={handler} required onChange={(e) => setHandler(e.target.value)}>
                        <option value=""></option>
                        <option value={contractAddress.erc20handler}>ERC20</option>
                        <option value={contractAddress.erc721handler}>ERC721</option>
                        <option value={contractAddress.erc1155handler}>ERC1155</option>
                    </select>
                </div>

                <div className="form-group">
                    <input className="btn btn-primary" type="button" value="Submit" onClick={adminSetBurnable} />
                </div>
            </div>
        </>
    )
}