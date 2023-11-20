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
  params: {edit: string},
}

export default  function CoinEdit({params: {edit}}: PageProps) {
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
 
  const fetchCoinData = async() => {
   await fetch(`http://localhost:3000/coins/${edit}`)
        .then(response => {
          // setItems(response.json())
            return response.json()
        })
        .then(coins => {
            setProducts(coins);
            
        })

}


useEffect(() => {
     fetchCoinData()
     //fetchCoinDataIntoForm()
}, [])


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



const onUpload =  ({ files }) => {
  setPicturefiles(files);
 }

 const showSuccess = () => {
  toast.current.show({severity:'success', summary: 'Result', detail:'The coin was saved succesfully', life: 3000});
}

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
  }}

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

const handlerFormData = async () => {
onUpload(picturefiles);
 
var formdata2 = new FormData();

formdata2.append('Continent', Continent);
formdata2.append('Country', selectedCountry.name);
formdata2.append('Code', selectedCountry.code);
formdata2.append('Catalog', Catalog);
formdata2.append('Value', Value);
formdata2.append('Name', Name);
formdata2.append('Year', Year);
formdata2.append('Composition', Composition.name);
formdata2.append('Status', Status.name);
formdata2.append('Price', Price);
formdata2.append('References', 0);
formdata2.append('Stock', Stock);
formdata2.append("files", picturefiles[0]);
formdata2.append("files", picturefiles[1]);
formdata2.append('Photo1', "Photo1");
formdata2.append('Photo2', "Photo2" );


var requestOptions = {
 method: 'POST',
 body: formdata2,
 redirect: 'follow'
};

fetch("http://localhost:3000/coins/uploadm", requestOptions)
 .then(response => response.text())
 .then(result => 
   {
     const obj  = JSON.parse(result);
     if (obj.statusCode = 201){
       showSuccess(); 
     }
   }
   )
 .catch(error => console.log('error', error));
}

  return (
    <PrimeReactProvider>

      <Menu activatedIndex={4} />
      {/* <Toast ref={toast} /> */}
      {/* <div>Id page details Id: {edit}</div> */}
      {products.map(product=> (//product.Continent))}    
      <div  style={{padding:"10px", maxHeight: "100vh"}} className="md:w-28rem">

        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-auto">
            <div className="flex flex-column gap-2">
              {/* <label htmlFor="catalog">Country</label> */}
              <Dropdown value= {selectedCountry} 
              onChange={(e) => {
                      // setSelectedCountry(e.value.name);
                      setSelectedCountry(e.value);
                      setContinent(e.value.continent);
                      setCode(e.value.code)
                      console.log(selectedCountry);
                      console.log('tara : ',e.value.name);
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
            <span className="p-float-label">
              <InputText id="catalog"  placeholder="Enter catalog code" 
              value={product.Catalog} onChange={(e) => setCatalog(e.target.value)} />
              <label htmlFor="catalog">Catalog</label>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-auto">
            <div className="flex flex-column gap-2">
            <span className="p-float-label">             
              <InputText id="value"  placeholder="Enter value"
              value={product.Value} onChange={(e) => setValue(e.target.value)}
              />
               <label htmlFor="value">Value</label>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-auto">
            <div className="flex flex-column gap-2">
            <span className="p-float-label">
              <InputText id="name"  placeholder="Enter name"
              value={product.Name} onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="name">Name</label>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-auto">
            <div className="flex flex-column gap-2">
              <span className="p-float-label">
                <InputNumber useGrouping={false} placeholder="Enter year" value={product.Year} onValueChange={(e) => setYear(e.value)}/>
                <label htmlFor="year">Year</label>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-auto">
            <div className="flex flex-column gap-2">
              {/* <label htmlFor="status">Composition</label> */}
              {/* {product.Composition} */}
              {/* { name: 'Gold', id: 79 } */}
              <Dropdown 
               value={if ({product.Composition}='Gold')
               {
                 `{ name: 'Gold', id: 79 }`    
               } 
              
              options={coin_composition} 
              optionLabel="name" onChange={(e) => setComposition(e.value)} 
                placeholder="Select composition"/>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-auto">
            <div className="flex flex-column gap-2">
              {/* <label htmlFor="price">Price</label> */}
              <InputNumber showButtons mode="currency" currency="RON" value={product.Price} onValueChange={(e) => setPrice(e.value)}/>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-auto">
            <div className="flex flex-column gap-2">
              {/* <label htmlFor="status">Status</label> */}
              <Dropdown value={product.Status} options={coin_status} 
              optionLabel="name" onChange={(e) => setStatus(e.value)} 
                placeholder="Select status"/>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-auto">
            <div className="flex flex-column gap-2">
            <span className="p-float-label">  
              <InputNumber useGrouping={false} placeholder="Enter initial stock" value={product.Stock} onValueChange={(e) => setStock(e.value)}/>
              <label htmlFor="stock">Stock</label>
            </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-auto">
            <div className="flex flex-column gap-2">
              <label htmlFor="value">File Upload</label>
              <FileUpload  
              multiple accept="image/*" 
              // mode="basic"
              maxFileSize={1000000} 
              customUpload={true}
              //uploadHandler={setPicturefiles(files)}
              uploadHandler={onUpload} auto
              chooseLabel="Upload photos"
              />
            </div>
          </div>
        </div>
        <div className="card flex flex-wrap justify-content-left gap-3 mb-4">
        <Button label="Save" icon="pi pi-check" iconPos="right" onClick={() => handlerFormData()} />  
        <Button label="Delete" icon="pi pi-delete-left" iconPos="right" severity="danger"/>
        </div>
  
  </div>
  ))}

    </PrimeReactProvider>


  )
}