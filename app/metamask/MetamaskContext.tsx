'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type WalletStatus = 'pending' | 'granted' | 'not found'

const MetamaskContext = createContext<{
  walletStatus: WalletStatus,
  connectWallet: null | (() => Promise<void>),
  address: string
  connected: boolean
}>({
    walletStatus: 'pending',
    connectWallet: null,
    address: '',
    connected: false
  })


export default function MetamaskProvider({ children }: { children: React.ReactNode }){

  const [walletStatus, setWalletStatus] = useState<WalletStatus>('pending')
  const [address, setAddress] = useState<string>('')
  const [connected, setIsConnected] = useState<boolean>(false)
  const connectWallet = async () => {
    const ethereum = window['ethereum']
    try {
      if(!ethereum) {
        setWalletStatus('not found')
      }
      setWalletStatus('granted')
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      })
      setAddress(accounts[0])
      setIsConnected(true)
    } catch(error) {
      setIsConnected(false)
    }
  }

  useEffect(() => {
    const ethereum = window['ethereum']
    const checkWallet = async () => {
      if(!ethereum) {
        setWalletStatus('not found')
      }
      setWalletStatus('granted')
    }

    checkWallet()
  }, [])

  return (
    <MetamaskContext.Provider value={{
      walletStatus,
      connected,
      connectWallet,
      address
    }}>
      {children}
    </MetamaskContext.Provider>
  )
}

export const useMetamask = () => useContext(MetamaskContext)

