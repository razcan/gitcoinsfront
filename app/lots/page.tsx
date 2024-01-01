"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';
import  Menu  from '../../components/menu_ini';
import { Galleria } from 'primereact/galleria';
import  '../../css/style.css';
import { Card } from 'primereact/card';

export default function Order() {
  const [images, setImages] = useState(null);
  const [products, setProducts] = useState<any>([]);
  const responsiveOptions = [
      {
          breakpoint: '991px',
          numVisible: 4
      },
      {
          breakpoint: '767px',
          numVisible: 3
      },
      {
          breakpoint: '575px',
          numVisible: 1
      }
  ];

const itemTemplate = (item:any) => {
    return <img src={`http://localhost:3000/coins/download/${item.Photo1}`} alt={products.Photo1}
    style={{ width: '100%' }} />
    
}

const thumbnailTemplate = (item:any) => {
    return <img src={`http://localhost:3000/coins/download/${item.Photo2}`} alt={products.Photo2}
    style={{ width: '100%' }} />
  }

    const fetchCoinData = () => {
      fetch("http://localhost:3000/coins")
        .then(response => {
          return response.json()
        })
        .then(coins => {
          setProducts(coins)
          console.log(coins);
        })
    }
  
    useEffect(() => {
      fetchCoinData()
    }, [])

  
  return (
    <PrimeReactProvider>
   <Menu activatedIndex={2} />
   <Card>
      <div className="card pt-8">
          Lots page
          
        {products ?
          <div className="card pt-8">
            <Galleria 
            value={products} 
            responsiveOptions={responsiveOptions} 
            numVisible={4} 
            style={{ maxWidth: '340px' }} 
            item={itemTemplate} thumbnail={thumbnailTemplate} />
        </div> : null}

      </div>
    
      </Card>

    </PrimeReactProvider>

  )
}




