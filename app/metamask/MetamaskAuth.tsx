'use client';

import { Boundary } from '@/ui/Boundary';
import { useMetamask } from './MetamaskContext'

export default function MetamaskAuth(){
  const {
    walletStatus,
    connectWallet,
    connected,
    address,
    balance
  } = useMetamask()
  return (
    <>
      {walletStatus == 'granted' && !connected ?
        (
          <button
            className="w-full rounded-md bg-white px-2 py-3 text-black"
            onClick={() => connectWallet?.()}
          >
            🦊 承認する
          </button>
        ) : (
          <div className="text-gray-600 font-bold text-md mb-2">
            <div className="w-full border-4 p-2 mb-4 rounded border-gray-400 bg-gray-100">
            {walletStatus == 'not found' ? 'ウォレット拡張機能が見つかりません' : '...保留中'}
            </div>
          </div>
        )
        }

       {connected ? <Boundary
          labels={['Metamask Context [Client Component]']}
          color="blue"
          size="small"
          animateRerendering={false}
        >
       <div>{connected ? '🟢 接続済み' : '🕔🕔🕔'}</div>
       <div>🟣 住所: {address}</div>
       <div>🪙 残高: {balance} ETH</div>
    </Boundary> : null}
    </>
  )
}