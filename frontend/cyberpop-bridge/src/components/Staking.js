import React, { useState, useEffect } from "react";
import { ethers } from "ethers"
import { useAppContext } from "../hooks/AppContext";
import { useLocation } from "wouter";

export function Staking({ cyt, easyStaking }) {
    const { waitForTx, selectedAddress } = useAppContext()
    const [totalStaked, setTotalStaked] = useState('0')
    const [stakedAmount, setStakedAmount] = useState('0')
    const [depositIds, setDepositIds] = useState(0)
    const [balance, setBalance] = useState(0)
    useEffect(() => {
        async function update() {
            if (easyStaking == null)
                return;
            let staked = await easyStaking.totalStaked()
            setTotalStaked(staked.toString())
            let ids = await easyStaking.lastDepositIds(selectedAddress)
            setDepositIds(ids)
            staked = await easyStaking.balances(selectedAddress, 1)
            setStakedAmount(staked.toString())

            if (cyt != null) {
                let b = await cyt.balanceOf(selectedAddress)
                setBalance(b)
            }
        }
        update()
    }, [selectedAddress, easyStaking])

    const deposit = async function () {
        let tx = await cyt.transfer(easyStaking.address, 1e7)
        waitForTx(tx)
    }

    const withdraw = async function () {
        let tx = await easyStaking.requestWithdrawal(depositIds)
        waitForTx(tx)
    }

    const forceWithdraw = async function () {
        let tx = await easyStaking.makeForcedWithdrawal(depositIds, 0)
        waitForTx(tx)
    }


    return (
        <>
            <h1>CYT balance: {balance.toString()}</h1>
            <h1>Total Staked: {totalStaked.toString()}</h1>
            <h1>Staked Amount: {stakedAmount.toString()}</h1>
            <h1>Deposits: {depositIds.toString()}</h1>
            <button className="btn btn-primary" onClick={deposit}>Stake</button>
            <button className="btn btn-danger" onClick={forceWithdraw}>Force Withdrawl</button>
            <button className="btn btn-success" onClick={withdraw}>Withdrawl</button>
        </>
    )
}