import React, { useState, useEffect } from "react"

export function Status({ api }) {
    const [deposits, setDeposits] = useState([])
    useEffect(() => {
        async function update() {
            let resp = await fetch(`${api}/deposits`)
            let json = await resp.json()
            setDeposits(json)
        }
        update()
    }, [api])
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Sender</th>
                    <th>Recipient</th>
                    <th>Source Token Address</th>
                    <th>Destination Token Address</th>
                    <th>Token ID</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {deposits.map((deposit, index) => {
                    return (
                        <tr key={index}>
                            <td>{deposit.Type}</td>
                            <td>{deposit.Sender}</td>
                            <td>{deposit.Recipient}</td>
                            <td>{deposit.SourceTokenAddress}</td>
                            <td>{deposit.DestinationTokenAddress}</td>
                            <td>{deposit.Type == "FungibleTransfer" ? "n/a" : deposit.TokenID}</td>
                            <td>{deposit.Type == "NonFungibleTransfer" ? "n/a" : deposit.Amount}</td>
                            <td>{deposit.Status}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
