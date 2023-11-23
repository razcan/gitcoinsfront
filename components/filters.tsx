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


  return (

    <PrimeReactProvider>
          <ScrollPanel key="sc" style={{paddingLeft:5, paddingTop:5, width: 250, height: '800px' }}>
          <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText placeholder="Search country"   
              onChange={(e) => handleInputChange(e.target.value)}/>
          </span>

                        {filteredArray.map((item) => (
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
                          ))}  
          </ScrollPanel>
    </PrimeReactProvider>
  )
}
