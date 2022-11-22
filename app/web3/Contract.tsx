'use client';

import {ethers} from 'ethers'
import Greeter from '../../artifacts/contracts/Greeter.sol/Greeter.json'
import React, {useState} from 'react';

const greeterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'



export default function Contract(){
  async function requestAccount(){
    await window.ethereum.request({method: 'eth_requestAccounts'})
  }

  const [greeting, setGreetingValue] = useState<string>('🍎')
  async function fetchGreeting(){
    console.log({ethereum: window['ethereum']})
    if(typeof window['ethereum'] !=='undefined'){
      const provider = new ethers.providers.Web3Provider(window['ethereum'])
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)

      try{
        const data = await contract.greet()
        setGreetingValue(data)
      } catch(error){
        console.error({error})
      }
    }
  }

  async function setGreeting(value: string){
    if(!value) return
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window['ethereum'])
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(value)
      await transaction.wait()
      await fetchGreeting()
    }
  }
  async function handleSubmit(event: any){
    event.preventDefault()
    if(event.target && 'greetingInput' in event.target) {
      const input = event.target['greetingInput'] as HTMLInputElement
      await setGreeting(input.value)
      setGreetingValue(input.value)
      input.value = ''
    }
  }

  return(
    <>
      <div className="text-xl font-medium text-zinc-500">
        クリプトアプリケーション
      </div>

      <button className="w-full rounded-md bg-white px-2 py-3 text-black" onClick={fetchGreeting}>
        あいさつをフェッチ
      </button>
      <div className="text-xl font-medium text-zinc-500">
        スマート コントラクトにグリーティング メッセージを設定する
      </div>
      <form onSubmit={event=>handleSubmit(event)}>
        <input
          className="shadow w-full block appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="greetingInput"
          placeholder="新しい挨拶を入力"
        />
        <br/>
        <button className="w-full rounded-md bg-white px-2 py-3 text-black block" type="submit">
          あいさつを設定する
        </button>
      </form>
      <div className="text-gray-600 font-bold text-md mb-2">
        <div className="w-full border-4 p-2 mb-4 rounded border-gray-400 bg-gray-100">
          ごあいさつ: [{greeting}]
        </div>
    </div>
    </>
  )
}