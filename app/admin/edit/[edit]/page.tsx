"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import { usePathname } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../../../components/menu';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

interface PageProps {
  params: {edit: string},
}

export default function CoinEdit({params: {edit}}: PageProps) {
  // const pathname = usePathname()
  // const searchParams = useSearchParams()
  const [products, setProducts] = useState([]);
 
  const fetchCoinData = () => {
    fetch(`http://localhost:3000/coins/${edit}`)
        .then(response => {
            return response.json()
        })
        .then(coins => {
            setProducts(coins)
        })
}

useEffect(() => {
     fetchCoinData()
}, [])

console.log(products);

  return (
    <PrimeReactProvider>

      <Menu activatedIndex={4} />
      <div>Id page details Id: {edit}</div>

    </PrimeReactProvider>


  )
}