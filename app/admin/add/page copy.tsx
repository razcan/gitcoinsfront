"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../../components/menu';
import { FileUpload } from 'primereact/fileupload';
import { Dropdown } from 'primereact/dropdown';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import countries_all from "../../../css/country.json";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/navigation';
import { Card } from 'primereact/card';
import  '../../../css/style.css' 

export default function Admin() {
  const toast = useRef(null);
  const router = useRouter();
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


  const onUpload =  ({ files }) => {
   setPicturefiles(files);
  }

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

// Display the key/value pairs
// for (var pair of formdata2.entries()) {
//     console.log(pair[0]+ ', ' + pair[1]); 
// }

// const showSuccess = () => {
//   toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
// }

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
  router.push('/admin');
}


  useEffect(() => {}, [picturefiles,jsonDataByte])


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


  return (
    <PrimeReactProvider>

<Card className='container'>
    <div className='content'>
      <Menu activatedIndex={5} />
      <Toast ref={toast} />

      {/* <div className="card" style={{width:"30%"}}> */}
      <div  style={{padding:"10px", maxHeight: "90vh"}} className="md:w-28rem">
        
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
              value={Catalog} onChange={(e) => setCatalog(e.target.value)} />
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
              value={Value} onChange={(e) => setValue(e.target.value)}
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
              value={Name} onChange={(e) => setName(e.target.value)}
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
                <InputNumber useGrouping={false} placeholder="Enter year" value={Year} onValueChange={(e) => setYear(e.value)}/>
                <label htmlFor="year">Year</label>
              </span>
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
            <span className="p-float-label">  
              <InputNumber useGrouping={false} placeholder="Enter initial stock" value={Stock} onValueChange={(e) => setStock(e.value)}/>
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
        </div></div>
        </div>
        </Card>
    </PrimeReactProvider>

  )
}