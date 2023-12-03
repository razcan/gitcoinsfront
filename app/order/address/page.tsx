"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';
import  Menu  from '../../../components/menu';
import { CascadeSelect } from 'primereact/cascadeselect';
import {Judete} from '../../../public/address/judete'
import { Dropdown } from 'primereact/dropdown';
import judeteRom from './../../../public/address/_judete.json'
import regionsRom from './../../../public/address/regions.json'
import Orase from './../../../public/address/orasecomplet.json'

export default function Address() {

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedOras, setOras] = useState(null);
  const [localitati, setLocalitati] = useState(null);
  const judete = Judete;
  const regiuni = regionsRom;
  // console.log('reg',judete[0].localitati)


const localitatiAll = () => {
const all_loc = [];
judete.map(localitate => {
  // console.log('marime',localitate.localitati.length)
  for (let i=0 ;  i<localitate.localitati.length ; i++  )
  // console.log(localitate.localitati[i])
   all_loc.push(`"nume":"${localitate.localitati[i].nume}"`) 
}
) 
setLocalitati(all_loc)
  }


  useEffect(() => {
    localitatiAll()
  }, [])


  //  console.log('Orase:',Orase)

  
  return (
    <PrimeReactProvider>
   <Menu activatedIndex={1} />
      <div>
          Orders address 
         {/* <div className="card flex justify-content-center">
            <CascadeSelect value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={judete} 
                optionLabel="nume" optionGroupLabel="nume" optionGroupChildren={['localitati']}
                className="w-full md:w-14rem" 
                //breakpoint="767px" 
                placeholder="Select a City" style={{ minWidth: '14rem' }}  />
        </div> */}
        {/* <Dropdown 
            value={selectedCity} 
            onChange={(e) => selectedAddress(e.value)} 
            options={judeteRom} 
            optionLabel="nume" 
            placeholder="Select a City" 
            className="w-full md:w-14rem" />
      </div> */}

<div className="card flex justify-content-center">
      <Dropdown
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.value)}
        options={judeteRom}
        optionLabel="name"
        placeholder="Select a City"
        className="w-full md:w-14rem"
      />

      <Dropdown 
          value={selectedOras} 
          onChange={(e) => setOras(e.value)} 
          options={Orase} optionLabel="nume" 
          editable 
          filter
          placeholder="Select a City" className="w-full md:w-14rem" /> 
    </div>



    </div>

    </PrimeReactProvider>
  )
}




