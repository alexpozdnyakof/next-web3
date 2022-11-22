'use client';

import { providers, utils as ethersUtils } from 'ethers';
import { createContext, useContext, useEffect, useState } from 'react';

type WalletStatus = 'pending' | 'granted' | 'not found'

const MetamaskContext = createContext<{
  walletStatus: WalletStatus,
  connectWallet: null | (() => Promise<void>),
  address: string
  connected: boolean
  balance: string
}>({
    walletStatus: 'pending',
    connectWallet: null,
    address: '',
    connected: false,
    balance: ''
  })


export default function MetamaskProvider({ children }: { children: React.ReactNode }){

  const [walletStatus, setWalletStatus] = useState<WalletStatus>('pending')
  const [address, setAddress] = useState<string>('')
  const [connected, setIsConnected] = useState<boolean>(false)
  const [balance, setBalance] = useState<string>('')
  const provider = new providers.Web3Provider(window.ethereum);

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
      const account = accounts[0]
      const balance = await provider.getBalance(account)
      setAddress(accounts[0])
      setIsConnected(true)
      setBalance(ethersUtils.formatEther(balance))
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
      address,
      balance
    }}>
      {children}
    </MetamaskContext.Provider>
  )
}

export const useMetamask = () => useContext(MetamaskContext)

