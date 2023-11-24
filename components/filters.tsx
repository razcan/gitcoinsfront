"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';
import { Panel } from 'primereact/panel';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { RadioButton } from 'primereact/radiobutton';
import { Slider } from 'primereact/slider';
import { InputText } from "primereact/inputtext";

import countries_all from "../css/country.json"
import "../node_modules/flag-icons/css/flag-icons.min.css";
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
import { ScrollTop } from 'primereact/scrolltop';
import { ScrollPanel } from 'primereact/scrollpanel';
import { DataView } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';

export default function Filters() {

  const [input, setInput] = useState<string>('');
  const [filteredArray, setFilteredArray] = useState<string[]>(countries_all);


  const handleInputChange = (event: any) => {
    const inputValue = event;
    setInput(inputValue);
    console.log(event);

    // Filter the array based on the input
     const newFilteredArray = countries_all.filter(item =>
       item.name.includes(inputValue)
     );
    //  console.log(newFilteredArray);

     setFilteredArray(newFilteredArray);
  };


  const TaraSelectata = (event: any) => {
    console.log(event.target);
  }


   useEffect(() => {
   }, [])

   const [selectedContinent, setSelectedContinent] = useState({ name: 'Europe', code: 'EU' });
   const continents = [
       { name: 'Europe', code: 'EU' },
       { name: 'Asia', code: 'AS' },
       { name: 'Africa', code: 'AF' },
       { name: 'America', code: 'AM' },
       { name: 'Oceania', code: 'OC' }
   ];

   const itemTemplate = (product) => {
    return (
      
        <div className="col-12">
            <div className="flex flex-column xl:flex-row xl:align-items-start p-2 gap-2">
            
                <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-1">
                    <div className="flex flex-column align-items-center sm:align-items-start gap-1">
                        <div className="text-xl font-bold text-900">{product.name}</div>
                        <Button text >
                        <div className={`fi fi-${product.code}`} style={{ width: "40px", height: '40px' }}> </div>
                        </Button>
                    </div>
                    {/* <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        <span className="text-2xl font-semibold">{product.name}</span>
                        
                    </div> */}
                </div>
            </div>
        </div>
    );
};

  return (

    <PrimeReactProvider>
          <Dropdown value={selectedContinent} 
          onChange={(e) => setSelectedContinent(e.value)} 
          options={continents} optionLabel="name" 
          placeholder="Select a Continent" className="w-full md:w-16rem" />
          <span className="p-input-icon-left ">
              <i className="pi pi-search" />
              <InputText className="w-full md:w-16rem" placeholder="Search country"   
              onChange={(e) => handleInputChange(e.target.value)}/>
          </span>
          <ScrollPanel key="sc" style={{paddingLeft:5, paddingTop:5, width: 224, height: '760px' }}>

          <div className="card">
            <DataView value={filteredArray} itemTemplate={itemTemplate}  />
        </div>

                        {/* {filteredArray.map((item) => (
                          <Button key={item.name} text onClick={TaraSelectata} >
                          <div className="grid flex">
                               <div className="col-6">
                                  <div>
                                  <div className={`fi fi-${item.code}`} 
                                  style={{ width: "50px", height: '30px' }}> 
                                <div className="p-4">
                                {item.code.toUpperCase( ).slice(0, 2)}
                                  </div> 
                                  </div>
                              
                                    </div>
                              </div>
            
                          </div>
                          </Button>
                          ))}   */}
          </ScrollPanel>
    </PrimeReactProvider>
  )
}
