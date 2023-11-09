"use client";
import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import axios, {isCancel, AxiosError} from 'axios';


export default   function Home() {

  const prefix_api = 'http://localhost:3000/coins/download/';

  const [coins, setCoins] = useState([])
  const fetchCoinData = () => {
    fetch("http://localhost:3000/coins")
      .then(response => {
        return response.json()
      })
      .then(coins => {
        setCoins(coins)
      })
  }

  useEffect(() => {
    fetchCoinData()
  }, [])


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     
<div>
    {/* <div>
      {coins.length > 0 && (
        <ul>
          {coins.map(coin => (
            <li key={coin.id}>{coin.id} 
            {coin.fileinfos.path} {coin.fileinfos.filename} </li>
          ))}
        </ul>
      )}
    </div> */}

<div>
      {coins.length > 0 && (
        <ul>
          {coins.map(
            nested => nested.fileinfos.map(element =>
            <div>
              <li key={nested.id}>
                {nested.CreatedAt}, {nested.id}, {nested.Stock}, {nested.Price}    
              </li>
              <li key={element.filename}>
                {prefix_api+ element.filename} 
                <img src={prefix_api+ element.filename}  />
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>

    {/* data.map(nested => nested.fileinfos.map(element => console.log('http://localhost:3000/coins/download/'+element.filename))) */}

              <p className="ml-4 decoration-slate-600	">Code completion with instant preview</p>
              <text className="ml-60 text-lg text-slate-500"> KKT</text>
              <p className="text-sky-400">The quick brown fox...</p>     
</div>
    </main>
  )
}

