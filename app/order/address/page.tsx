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
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export default function Address() {

  const [selectedCounty, setCounty] = useState(null);
  const [selectedOras, setOras] = useState('Selectati un oras');
  const [countyIsSelected, setcountyIsSelected] = useState(true);
  const [listajudete, setListajudete] = useState(null);
  const [listaorase, setListaorase] = useState(null);
  const [value, setValue] = useState('');
  const judete = Judete;
  

const getJudete = () => {
const judeteAll = [];
judete.map(localitate => {
  judeteAll.push({judet: `${localitate.nume}`}) 

}) 
setListajudete(judeteAll)
//console.log(judeteAll)
}



const setSelectedCounty = (value) => {
  setCounty(value)
  setcountyIsSelected(false)
  filterbycounty()
}


const filterbycounty = () => {


type MyObject = {
  judet: string;
  localitate: string;
};
const myArray: MyObject[] = []

  judete.map(localitate => {
    for (let i=0 ;  i<localitate.localitati.length ; i++  ){
      //console.log(`"judet": "${localitate.nume}" , "localitate": "${localitate.localitati[i].nume}",`)
      myArray.push({judet: `${localitate.nume}` , localitate: `${localitate.localitati[i].nume}`}) 
    }})

  if(selectedCounty){
    const filteredItems = myArray
    .filter(item => item.judet.includes(selectedCounty.judet))
    setListaorase(filteredItems)
  }
  }

  useEffect(() => {
    getJudete(),
    filterbycounty()
  }, [selectedCounty])

  
  return (
    <PrimeReactProvider>
   <Menu activatedIndex={1} />
   <Card>
      <div>
          Orders address 
<div className="grid">
    <div className="col-2">
        <div className="text-center p-3 border-round-sm  font-bold">

        </div>
    </div>
    <div className="col-6">
        <div className="text-center p-3 border-round-sm  font-bold ">
        <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex-auto">
                    <label htmlFor="alphabetic" className="font-bold block mb-2">
                        Nume
                    </label>
                    <InputText id="alphabetic" keyfilter="alpha" className="w-full" />
                </div>
                <div className="flex-auto">
                    <label htmlFor="email" className="font-bold block mb-2">
                            Email
                    </label>
                    <InputText id="email" keyfilter="email" className="w-full" />
                  </div>
          </div>
        <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex-auto">
                    <label htmlFor="pnum" className="font-bold block mb-2">
                           Judet 
                    </label>
                    <Dropdown
                      value={selectedCounty}
                      onChange={(e) => {
                        
                        setSelectedCounty(e.value)
                      }
                      }
                      options={listajudete}
                      optionLabel="judet"
                      editable 
                      filter
                      placeholder="Select a County"
                      className="w-full md:w-44rem"
                    />
                  </div>
                  <div className="flex-auto">
                    <label htmlFor="pint" className="font-bold block mb-2">
                            Oras
                    </label>
                    <Dropdown 
                      value={selectedOras} 
                      onChange={(e) => setOras(e.value)} 
                      options={listaorase} 
                      optionLabel="localitate" 
                      editable 
                      filter
                      disabled = {countyIsSelected}
                      placeholder="Select a City" 
                      className="w-full md:w-44rem" /> 
                </div>
        </div>  
        <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex-auto">
                    <label htmlFor="alphabetic" className="font-bold block mb-2">
                        Adresa
                    </label>
                    <InputText id="alphabetic" keyfilter="alpha" className="w-full" />
                  </div>
                  <div className="flex-auto">
                    <label htmlFor="number" className="font-bold block mb-2">
                        Numar telefon
                    </label>
                    <InputText id="number" keyfilter="num" className="w-full" />
                  
                </div>

        </div>
        <div className="flex flex-wrap gap-3 mb-4">
       
                  <div className="flex-auto">
                    <label htmlFor="email" className="font-bold block mb-2">
                            Alte observatii
                    </label>
                    <InputTextarea className="w-full" value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} />
                  </div>

        </div>
        </div>
    </div>
    <div className="col-2">
        <div className="text-center p-3 border-round-sm  font-bold "></div>
    </div>
</div>
<Button label="Submit" onClick={filterbycounty}/>

    </div>
    </Card>
    </PrimeReactProvider>
  )
}




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