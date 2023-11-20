"use client"
import React, { useState, useEffect, useRef } from 'react';
interface PageProps {
    params: {edit: string},
  }
  
  export default  function CoinEdit({params: {edit}}: PageProps) {
    const [products, setProducts] = useState([]);
 
    const fetchCoinData = async() => {
        await fetch(`http://localhost:3000/coins/${edit}`)
             .then(response => {
                
                 return response.json()
                 
             })
             .then(coins => {
                 setProducts(coins);
                 
             })
     
     }

useEffect(() => {
        fetchCoinData()
        //fetchCoinDataIntoForm()
   }, [])

  console.log(products);

  return (
      <div> Detalii {edit}
            
                <li>{
                products.map(product => (product.Continent)
                )
                }</li>
           
      </div>
  )

}