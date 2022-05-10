import React, { useState, useEffect } from "react";
import { ethers } from "ethers"
import { useAppContext } from "../hooks/AppContext";
import { useLocation } from "wouter";

export function Staking({ cyt, easyStaking }) {
    const { selectedAddress } = useAppContext()
    return (
        <>
            <h1>Total Staked</h1>
            <h1>Staked Amount</h1>
            <h1>APY</h1>
        </>
    )
}