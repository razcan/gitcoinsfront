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


export default function Filters() {

  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedContinent, setSelectedContinent] = useState({ name: 'All', code: 'All' });
  const [countriesBE, setCountriesBE] = useState<string[]>([]);
  const [filteredArray, setFilteredArray] = useState<string[]>();

  const fetchCountriesBE = () => {
    fetch("http://localhost:3000/coins/countries")
        .then(response => {
            return response.json()
        })
        .then(country => {
          setCountriesBE(country)
          setFilteredArray(country)
        })
}

useEffect(() => {
  fetchCountriesBE()
}, [])

  const handleInputChangeCountry = (event: any) => {
    const selectedCountry = event;
    console.log(event);
    setSelectedCountry(selectedCountry);
    
    const newFilteredArray = countriesBE
     .filter(item => item.Country.includes(event))
     .filter(item => item.Continent.includes(selectedContinent.name))

     setFilteredArray(newFilteredArray);
     console.log('f tara',filteredArray)
     console.log('f tara',newFilteredArray)
  };


  const continents = [
      { name: 'Europe', code: 'EU' },
      { name: 'Asia', code: 'AS' },
      { name: 'Africa', code: 'AF' },
      { name: 'America', code: 'AM' },
      { name: 'Oceania', code: 'OC' },
      { name: 'All', code: 'All' }
  ];

  const handleInputChangeContinent = async (ContinentSelected) => {
    setSelectedContinent(ContinentSelected);
    console.log(ContinentSelected.name);
     const newFilteredArray =  countriesBE
     .filter(item =>item.Continent.includes(ContinentSelected.name))
     .filter(item =>item.Country.includes(selectedCountry))

     setFilteredArray(newFilteredArray);
     console.log('f cont',filteredArray)
     console.log(newFilteredArray)
  };

// Define filter functions
// const countryFilter = (countryFilter: string) => (item: any) => item.Country === countryFilter;
// const continentFilter = (continentFilter: string) => (item: any) => item.Continent === continentFilter;

// Assume filter criteria come from the UI form
// const formFilters = {
//   countryFilter: 'Romania',
//   continentFilter: 'Europe',
// };

// const filteredItems = countriesBE.filter(item =>item.Continent.includes(ContinentSelected.name));

// Construct filter functions based on form criteria
// const filtersToApply = [];
// if (formFilters.countryFilter) {
//   filtersToApply.push(countryFilter(formFilters.countryFilter));
// }
// if (formFilters.continentFilter) {
//   filtersToApply.push(continentFilter(formFilters.continentFilter));
// }

// console.log(filtersToApply);
// Apply filters
// const filteredItems = filtersToApply.reduce((result:[0], filter) => result.filter(filter), countriesBE);

// console.log(filteredItems);

  const TaraSelectata = (event: any) => {
    console.log(event.target);
  }


   const itemTemplate = (country) => {
    return (
      
        <div className="col-12">
            <div className="flex flex-column xl:flex-row xl:align-items-start p-2 gap-2">
            
                <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-1">
                    <div className="flex flex-column align-items-center sm:align-items-start gap-1">
                      
                      <div className="text-xl font-bold text-900">
                      
                      <Tag className="mr-2 text-md border-indigo-100 bg-indigo-500" 
                      icon="pi pi-tags" value={country.Nr}></Tag>
  
                      {country.Country} 
                      
                      </div>
                      
                        <Button text >
                        <div className={`fi fi-${country.Code}`} style={{ width: "40px", height: '40px' }}> </div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

  return (

    <PrimeReactProvider>
          <Dropdown value={selectedContinent} 
          onChange={(e) => handleInputChangeContinent(e.value)} 
          options={continents} optionLabel="name" 
          placeholder="Select a Continent" className="w-full md:w-16rem" />
          <span className="p-input-icon-left ">
              <i className="pi pi-search" />
              <InputText className="w-full md:w-16rem" placeholder="Search country"   
              onChange={(e) => handleInputChangeCountry(e.target.value)}/>
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
