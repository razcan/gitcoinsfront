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

export default function Filters() {
  const continentSelectat = useContext(SelectedContextContinent)
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedContinent, setSelectedContinent] = useState();
  const [countriesBE, setCountriesBE] = useState<string[]>([]);
  const [filteredArray, setFilteredArray] = useState<string[]>(countriesBE);
  const [inputCountry, setInputCountry] = useState();
  const [continentSelectattrans, setContinentSelectattrans] = useState<string>();
  


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

   console.log('vvv',countriesBE)
  // console.log(filteredArray)

  const handleInputChangeCountry = (event: any) => {
    const selectedCountry = event;
    setSelectedCountry(selectedCountry);
    handleFiltering(selectedCountry, selectedContinent)
  };

  const handleInputChangeContinent = (event: any) => {
    const selectedcontinent = event
    console.log(selectedcontinent)
    setSelectedContinent(selectedcontinent);
    handleFiltering(selectedCountry, selectedcontinent)
  };


  useEffect(() => {
    fetchCountriesBE(),
      handleFiltering(selectedCountry, continentSelectat)
  }, [])


  // const handleFiltering = (selectedCountry, selectedContinent) => {
  //   if (selectedContinent && selectedCountry) {
  //     const filteredItems = countriesBE
  //       .filter(item => item.Country.includes(selectedCountry))
  //       .filter(item => item.Continent.includes(selectedContinent.name))
  //     setFilteredArray(filteredItems)
  //     //  console.log(filteredItems)
  //   }
  //   else if (selectedCountry) {
  //     const filteredItems = countriesBE.filter(item => item.Country.includes(selectedCountry));
  //     console.log(filteredItems)
  //     setFilteredArray(filteredItems)
  //     //  console.log(filteredItems)
  //   }
  //   else if (selectedContinent) {
  //     const filteredItems = countriesBE.filter(item => item.Continent.includes(selectedContinent.name));
  //     // console.log(filteredItems)
  //      setFilteredArray(filteredItems)
  //   }
  // }


  const handleFiltering = (selectedCountry, continentSelectat) => {

    switch (continentSelectat) {
      case 'eu':
        setContinentSelectattrans('Europe')
          break;
      case 'sa':
        setContinentSelectattrans('South America')
          break;
      case 'na':
        setContinentSelectattrans('North America')
          break;
      case 'as':
        setContinentSelectattrans('Asia')
          break;
      case 'oc':
        setContinentSelectattrans('Oceania')
          break;
      case 'af':
        setContinentSelectattrans('Africa')
          break;
      default:
          console.log("No continent selected!");
          break;
  }

    console.log('xxx',continentSelectat)
    console.log('yyy',selectedCountry)
    console.log('tot',continentSelectattrans)
    if (continentSelectat && selectedCountry) {
      const filteredItems = countriesBE
        .filter(item => item.Country.includes(selectedCountry))
        .filter(item => item.Continent.includes('Europe'))
      setFilteredArray(filteredItems)
      console.log(filteredItems)
    }
    else if (selectedCountry) {
      const filteredItems = countriesBE.filter(item => item.Country.includes(selectedCountry));
      console.log(filteredItems)
      setFilteredArray(filteredItems)
       console.log(filteredItems)
    }
    else if (continentSelectat) {
      const filteredItems = countriesBE.filter(item => item.Continent.includes('Europe'));
       
       setFilteredArray(filteredItems)
       console.log(filteredItems)
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
    setFilteredArray(countriesBE);
    setSelectedCountry();
    setSelectedContinent();
    setInputCountry('');
  };

  const routeCountry = (props) => {
    const buttonText: string = props.target.innerText;
    console.log(buttonText);
    router.push(`/item/${buttonText}`);
  };

//  value={selectedContinent}
//   options={continents} 
//   {continentSelectat}
  

  const itemTemplate = (country) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-2 gap-2">
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-1">
            <div className="flex flex-column align-items-center sm:align-items-start gap-1">
              <div className="text-xl font-bold text-900">
                <Tag className="mr-2 text-md border-indigo-100 bg-indigo-500"
                  icon="pi pi-tags" value={country.Nr}></Tag>
              </div>
            
                <div className={`fi fi-${country.Code}`} style={{ width: "40px", height: '50px' }}> 
                <Button label={country.Country} link size="large" 
                style={{ paddingLeft: '50px' , height: '40px'}}
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
      <Dropdown value={selectedContinent}
        onChange={(e) => handleInputChangeContinent(e.value)}
        options={continents} optionLabel="name"
        placeholder="Select a Continent" className="w-full md:w-16rem" />
      <span className="p-input-icon-left ">
        <i className="pi pi-search" />
        <InputText className="w-full md:w-16rem" placeholder="Search country"
         value={inputCountry}
          onChange={(e) => handleInputChangeCountry(e.target.value)} />
      </span>
      <ScrollPanel key="sc" style={{ paddingLeft: 5, paddingTop: 5, width: 224, height: '760px' }}>
      <Button label="Clear filters" severity="danger" outlined onClick={clearFilter} />
      <div>a {continentSelectat}</div>


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
