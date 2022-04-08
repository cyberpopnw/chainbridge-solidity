import React, { useContext } from "react"

const AppContext = React.createContext({
    bridge: null,
    selectedAddress: '',
    waitForTx: (tx) => tx,
})

const useAppContext = () => {
    const appContext = useContext(AppContext)
    if (appContext === undefined) {
        throw new Error("useAppContext must be called within a AppContext")
    }
    return appContext
}

export { AppContext, useAppContext }