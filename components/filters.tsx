"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';
import { InputText } from "primereact/inputtext";
import countries_all from "../css/country.json"
import "../node_modules/flag-icons/css/flag-icons.min.css";
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import { DataView } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { useRouter } from 'next/navigation'
import {useContext} from 'react'
import {SelectedContextContinent} from './context';
// import * as dotenv from 'dotenv';
// dotenv.config();
import config from '../config.json';

export default function Filters() {
  //import config from '../config.json'
  const IP: string = config.IP;

  const continentSelectat = useContext(SelectedContextContinent)
  const router = useRouter();
  // const [selectedCountry, setSelectedCountry] = useState<string>('');
  // const [selectedContinent, setSelectedContinent] = useState();

  const [selectedCountry, setSelectedCountry] = useState<any>('');
  const [selectedContinent, setSelectedContinent] = useState<any>();

  const [countriesBE, setCountriesBE] = useState<any[]>([]);
  const [filteredArray, setFilteredArray] = useState<any[]>(countriesBE);
  const [inputCountry, setInputCountry] = useState<any>();
  const [continentSelectattrans, setContinentSelectattrans] = useState<any>();
  
  function capitalizeFirstLetter(str: string): string {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }


  const fetchCountriesBE = () => {
    fetch(`http://${IP}:3000/coins/countries`)
      .then(response => {
        return response.json()
      })
      .then(country => {
        setCountriesBE(country)
        // setFilteredArray(country)
      })
  }


  const handleInputChangeCountry = (event: any) => {
    const selectedCountry = event;
    setSelectedCountry(capitalizeFirstLetter(selectedCountry));
    handleFiltering(capitalizeFirstLetter(selectedCountry), continentSelectat)
  };

  const handleInputChangeContinent = (event: any) => {
    const selectedcontinent = event
    // console.log(selectedcontinent)
    setSelectedContinent(selectedcontinent);
    handleFiltering(selectedCountry, continentSelectat)
  };


  useEffect(() => {
      fetchCountriesBE(),
      handleFiltering( selectedCountry, continentSelectat)
  }, [continentSelectat])




  const handleFiltering = (selectedCountry: string,continentSelectat: string) => {

        if (selectedContinent && selectedCountry) {

         interface Country {
            "Continent": string;
            "Country": string;
            "Code": string;
            "Nr": number
        }

            const filteredItems = countriesBE
              .filter(item => item.Country.includes(selectedCountry))
              .filter(item => item.Continent.includes(continentSelectat))
            setFilteredArray(filteredItems)
              console.log(filteredItems)
          }

    else if (selectedCountry) {
          const filteredItems = countriesBE.filter(item => item.Country.includes(selectedCountry));
          setFilteredArray(filteredItems)
          //  console.log(filteredItems)
        }

     else if (continentSelectat) {
      const filteredItems = countriesBE.filter(item => item.Continent.includes(continentSelectat));
       
       setFilteredArray(filteredItems)
      //  console.log('2',filteredItems)
    }
  }

  const continents = [
    { name: 'Europe', code: 'EU' },
    { name: 'Asia', code: 'AS' },
    { name: 'Africa', code: 'AF' },
    { name: 'North America', code: 'NA' },
    { name: 'South America', code: 'SA' },
    { name: 'Oceania', code: 'OC' }
  ];

  const clearFilter = () => {
    setSelectedCountry('');
    setSelectedContinent('');
    setInputCountry([]);
  };

  const routeCountry = (props: any) => {
    const buttonText: string = props.target.innerText;
    // console.log(buttonText);
    router.push(`/item/${buttonText}`);
  };


  const itemTemplate = (country: { Nr: any; Code: any; Country: any; }) => {
    return (
      <div className="col-12">
        {/* <div className="flex flex-column xl:flex-row xl:align-items-start p-2 gap-2"> */}
        <div className="
         sm:w-min lg:w-6rem xl:w-10rem
         p-2 gap-1">
        
          <div className=" 
           sm:w-min  gap-1">
            <div className=" gap-2">
              <div className="text-xl font-bold text-900">
                <Tag className="mr-2 text-base border-indigo-100 bg-indigo-500"
                  icon="pi pi-tags" value={country.Nr}></Tag>
              </div>
            
                <div className={`fi fi-${country.Code}`} 
                 style={{ width: "30px", height: '40px' }}
                > 
                <Button label={country.Country} link 
                // size="large" 
                 style={{ 
                  textAlign: 'start',
                  paddingLeft: '0rem',
                  paddingTop: '1rem',
                  height: '5rem', width: "100px"}}
                onClick={routeCountry}
                />
                </div>
             
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (

<PrimeReactProvider>

<div className="grid pr-6">
    
<div className='sm:col-3 xl:col-8 md:col-6'>
<InputText placeholder="Country" 
className='xl: w-6rem sm: w-2rem'
      //  className="sm:p-inputtext-sm md:p-inputtext-sm xl:p-inputtext-lg"
         value={inputCountry}
          onChange={(e:any) => handleInputChangeCountry(e.target.value)} /> 

<ScrollPanel  key="sc" style={{ height: "auto"}}>
<DataView value={filteredArray} itemTemplate={itemTemplate}  />
</ScrollPanel>
</div>

</div>



    

      {/* <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText placeholder="Country"
       className="sm:p-inputtext-sm md:p-inputtext-sm xl:p-inputtext-lg"
         value={inputCountry}
          onChange={(e) => handleInputChangeCountry(e.target.value)} /> 
      </span> */}
      {/* </div> */}

      {/* <ScrollPanel className="sm:w-8 lg:w-10 xl:w-12" key="sc" style={{ height: "auto"}}>
      <DataView value={filteredArray} itemTemplate={itemTemplate}  />
      </ScrollPanel> */}
    </PrimeReactProvider>
  )
}