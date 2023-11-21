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
import { FileUpload } from 'primereact/fileupload';
import { Dropdown } from 'primereact/dropdown';
import "../../../../node_modules/flag-icons/css/flag-icons.min.css";
import countries_all from "../../../../css/country.json";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

interface PageProps {
  params: { edit: string },
}

export default function CoinEdit({ params: { edit } }: PageProps) {
  // const pathname = usePathname()
  // const searchParams = useSearchParams()
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  // const toast = useRef(null);
  const axios = require('axios');
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [Code, setCode] = useState([]);
  const countries = countries_all;
  const [Price, setPrice] = useState([1]);
  const [Continent, setContinent] = useState([]);
  const [Year, setYear] = useState([]);
  const [Catalog, setCatalog] = useState([]);
  const [Value, setValue] = useState([]);
  const [Status, setStatus] = useState([]);
  const [Composition, setComposition] = useState(['Silver']);
  const [Name, setName] = useState([]);
  const [Stock, setStock] = useState([]);
  const [picturefiles, setPicturefiles] = useState([]);
  const [byteArray, setbyteArray] = useState([]);
  const [jsonDataByte, setJsonDataByte] = useState([]);

  const fetchCoinData = async () => {
    await fetch(`http://localhost:3000/coins/${edit}`)
      .then(response => {
        // setItems(response.json())
        console.log(response)
        return response.json()
      })
      .then(coins => {
        setProducts(coins);
        console.log(coins);

        coins.map(product=> (
          setContinent(product.Continent)
          ))

      })
  }


  useEffect(() => {
    fetchCoinData()
  }, [])

  return (
    <PrimeReactProvider>

      <Menu activatedIndex={4} />
     <h4>{Continent}
       </h4> 
       <InputText value={Continent} onChange={(e) => setContinent(e.target.value)} />
                    <span className="p-ml-2">{Continent}</span>
    </PrimeReactProvider>


  )
}