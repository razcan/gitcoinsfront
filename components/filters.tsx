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

export default function Filters() {

  const [value, setValue] = useState([0, 100]);
  const [type, setType] = useState('');
  const [continent, setContinent] = useState('');

  return (

    <PrimeReactProvider>
          <Panel header="Delete all filters:" style={{paddingTop:15}}>
            <Accordion activeIndex={0} multiple >
              <AccordionTab header="Type">
                <div className="flex align-items-center">
                  <RadioButton inputId="Coins" name="Coins" value="Coins" p-radiobutton-icon="pi-folder-open" onChange={(e) => setType(e.value)} checked={type === 'Coins'} />
                  <label htmlFor="Coins" className="ml-2">Coins</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton inputId="Banknotes" name="Banknotes" value="Banknotes" onChange={(e) => setType(e.value)} checked={type === 'Banknotes'}  />
                  <label htmlFor="Banknotes" className="ml-2">Banknotes</label>
                </div>
              </AccordionTab>
              <AccordionTab header="Value">
                <div className="card flex justify-content-center">
                  <div className="w-14rem">
                    <InputText value={value} onChange={(e) => setValue(e.target.value)} className="w-full" />
                    <Slider value={value} onChange={(e) => setValue(e.value)} className="w-14rem" range />
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab header="Continents">
                <div className="flex align-items-center">
                  <RadioButton inputId="Asia" name="Asia" value="Asia"  onChange={(e) => setContinent(e.value)} checked={continent === 'Asia'} />
                  <label htmlFor="Asia" className="ml-2">Asia</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton inputId="Africa" name="Africa" value="Africa" onChange={(e) => setContinent(e.value)} checked={continent === 'Africa'}/>
                  <label htmlFor="Africa" className="ml-2">Africa</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton inputId="North America" name="North America" value="North America" onChange={(e) => setContinent(e.value)} checked={continent === 'North America'}/>
                  <label htmlFor="North America" className="ml-2">North America</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton inputId="South America" name="South America" value="South America" onChange={(e) => setContinent(e.value)} checked={continent === 'South America'}/>
                  <label htmlFor="South America" className="ml-2">South America</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton inputId="Antarctica" name="Antarctica" value="Antarctica" onChange={(e) => setContinent(e.value)} checked={continent === 'Antarctica'}/>
                  <label htmlFor="Antarctica" className="ml-2">Antarctica</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton inputId="Europe" name="Europe" value="Europe" onChange={(e) => setContinent(e.value)} checked={continent === 'Europe'}/>
                  <label htmlFor="Europe" className="ml-2">Europe</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton inputId="Australia" name="Australia" value="Australia" onChange={(e) => setContinent(e.value)} checked={continent === 'Australia'}/>
                  <label htmlFor="Australia" className="ml-2">Australia</label>
                </div>
              </AccordionTab>
            </Accordion>
          </Panel>
    </PrimeReactProvider>
  )
}

