"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/menu';
import { FileUpload } from 'primereact/fileupload';
import { Dropdown } from 'primereact/dropdown';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import countries_all from "../../css/country.json";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Splitter, SplitterPanel } from 'primereact/splitter';

export default function Admin() {

  const [selectedCountry, setSelectedCountry] = useState(null);
  const countries = countries_all;

 


  const [Price, setPrice] = useState(1);
  const [Year, setYear] = useState(1900);
  const [Catalog, setCatalog] = useState(null);
  const [Value, setValue] = useState(null);
  const [Status, setStatus] = useState(null);
  const [Composition, setComposition] = useState(null);
  const [Name, setName] = useState(null);
  const [Stock, setStock] = useState(null);

  const selectedCountryTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div className={`fi fi-${option.code}`} style={{ width: "30px" }}>
            <div style={{ paddingLeft: "40px" }}>
              {option.name}
            </div>
          </div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const countryOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">

        <div className={`fi fi-${option.code}`} style={{ width: "30px" }}>
          <div style={{ paddingLeft: "40px" }}>
            {option.name}
          </div>
        </div>
      </div>
    );
  };

  const panelFooterTemplate = () => {
    return (
      <div className="py-2 px-3">
        {selectedCountry ? (
          <span>
            <b>{selectedCountry.name}</b> selected.
          </span>
        ) : (
          'No country selected.'
        )}
      </div>
    );
  };

  const coin_status = [
    { name: 'UNC/AUNC', id: 1},
    { name: 'VF/F', id: 2 },
    { name: 'VG/G', id: 3 }
];

const coin_composition = [
  { name: 'Others', id: 1},
  { name: 'Copper', id: 29 },
  { name: 'Silver', id: 47 },
  { name: 'Gold', id: 79 }
]

interface CoinJson {
  //Continent: string;	
   Country: string;
   Catalog: string;
   Value: string;
   Name: string;
   Year: number
   Composition: string;
   Status: string;
   Price: number;
  // References: string;
   Stock: number;
  // Photo1: string;
  // Photo2: string;	
}

const jsonCoin: CoinJson = {
  // Continent: selectedCountry.continent,
  Country: {selectedCountry},
  Catalog: {Catalog},
  Value: {Value},
  Name: {Name},
  Year: {Year},
  Composition: {Composition},
  Status: {Status},
  Price: {Price},
  // References: 
   Stock: {Stock},
  // Photo1: 
  // Photo2: 	
};

  return (
    <PrimeReactProvider>

      <Menu activatedIndex={4} />

      {/* <div className="card" style={{width:"30%"}}> */}
      <div  style={{padding:"10px", maxHeight: "100vh"}} className="md:w-28rem">
        
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-auto">
            <div className="flex flex-column gap-2">
              {/* <label htmlFor="catalog">Country</label> */}
              <Dropdown value={selectedCountry} onChange={(e) => {
                      setSelectedCountry(e.value);
                      console.log(selectedCountry);
                      console.log(e.value);
                    }}
                      options={countries} optionLabel="name" placeholder="Select a Country"
                      filter valueTemplate={selectedCountryTemplate}
                      itemTemplate={countryOptionTemplate} />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-auto">
            <div className="flex flex-column gap-2">
              {/* <label htmlFor="catalog">Catalog</label> */}
              <InputText id="catalog"  placeholder="Enter catalog code" 
              value={Catalog} onChange={(e) => setCatalog(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-auto">
            <div className="flex flex-column gap-2">
              {/* <label htmlFor="value">Value</label> */}
              <InputText id="value"  placeholder="Enter value"
              value={Value} onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-auto">
            <div className="flex flex-column gap-2">
              {/* <label htmlFor="name">Name</label> */}
              <InputText id="name"  placeholder="Enter name"
              value={Name} onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-auto">
            <div className="flex flex-column gap-2">
              {/* <label htmlFor="year">Year</label> */}
              <InputNumber useGrouping={false} placeholder="Enter year" value={Year} onValueChange={(e) => setYear(e.value)}/>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-auto">
            <div className="flex flex-column gap-2">
              {/* <label htmlFor="status">Composition</label> */}
              <Dropdown value={Composition} options={coin_composition} optionLabel="name" onChange={(e) => setComposition(e.value)} 
                placeholder="Select composition"/>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-auto">
            <div className="flex flex-column gap-2">
              {/* <label htmlFor="price">Price</label> */}
              <InputNumber showButtons mode="currency" currency="RON" value={Price} onValueChange={(e) => setPrice(e.value)}/>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-auto">
            <div className="flex flex-column gap-2">
              {/* <label htmlFor="status">Status</label> */}
              <Dropdown value={Status} options={coin_status} optionLabel="name" onChange={(e) => setStatus(e.value)} 
                placeholder="Select status"/>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-auto">
            <div className="flex flex-column gap-2">
              {/* <label htmlFor="stock">Stock</label> */}
              <InputNumber useGrouping={false} placeholder="Enter initial stock" value={Stock} onValueChange={(e) => setStock(e.value)}/>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-auto">
            <div className="flex flex-column gap-2">
              <label htmlFor="value">File Upload</label>
              <FileUpload name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000}/>
            </div>
          </div>
        </div>
        <div className="card flex flex-wrap justify-content-left gap-3 mb-4">
        <Button label="Save" icon="pi pi-check" iconPos="right" onClick={() => console.log(jsonCoin)} />
        <Button label="Delete" icon="pi pi-delete-left" iconPos="right" severity="danger"/>
        </div></div>
    </PrimeReactProvider>

  )
}

// Continent: string;	
// Country: string;
// Catalog: string;
// Value: string;
// Name: string;
// Year: number
// Composition: string;
// Status: string;
// Price: number;
// References: string;
// Stock: number;
// Photo1: string;
// Photo2: string;	 