import React, { useState, useEffect } from "react"
import { Link } from "wouter"

export function Collections({ erc20, erc1155, erc721, address, network }) {
    const [cyt, setCYT] = useState(0)
    const [badge, setBadge] = useState(0)
    const [cyborg, setCyborg] = useState(0)

    useEffect(() => {
        const update = async () => {
            let balance = await erc20.balanceOf(address)
            setCYT(balance.toNumber())

            balance = await erc1155.balanceOf(address, 0)
            setBadge(balance.toNumber())
            balance = await erc721.balanceOf(address)
            setCyborg(balance.toNumber())
        }
        update()
    }, [address, erc20, erc1155, erc721])

    return (
        <>
            <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Address</h4>
                <p>{address}</p>
                <hr />
                <p className="mb-0">Network: {network}</p>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Token</th>
                        <th scope="col">Balance</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scpoe="row">CYT [ERC20]</th>
                        <td>{cyt}</td>
                        <td><Link className="btn btn-primary" to="/erc20">Transfer</Link></td>
                    </tr>
                    <tr>
                        <th scpoe="row">Badge [ERC1155]</th>
                        <td>{badge}</td>
                        <td><Link className="btn btn-primary" to="/erc1155">Transfer</Link></td>
                    </tr>
                    <tr>
                        <th scpoe="row">Cyborg [ERC721]</th>
                        <td>{cyborg}</td>
                        <td><Link className="btn btn-primary" to="/erc721">Transfer</Link></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}