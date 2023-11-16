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

  const axios = require('axios');
  const [selectedCountry, setSelectedCountry] = useState([]);
  const countries = countries_all;
  const [Price, setPrice] = useState([10]);
  const [Continent, setContinent] = useState([]);
  const [Year, setYear] = useState([1900]);
  const [Catalog, setCatalog] = useState([1]);
  const [Value, setValue] = useState([10]);
  const [Status, setStatus] = useState([]);
  const [Composition, setComposition] = useState(['Silver']);
  const [Name, setName] = useState(['10 bani']);
  const [Stock, setStock] = useState([1]);
  const [picturefiles, setPicturefiles] = useState([]);
  const [byteArray, setbyteArray] = useState([]);
  const [jsonDataByte, setJsonDataByte] = useState([]);
  

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
  console.log('files:',files[0]);
   setPicturefiles(files);

   var filesArray = Array.from(files);
   console.log('fff1',filesArray)
   console.log('fff2',files)
   console.log('jsss',JSON.stringify({ files: filesArray }));
   setJsonDataByte(JSON.stringify({ files: filesArray }));
   console.log('sssssss',jsonDataByte);
  }

const handlerFormData = async () => {
var formdata2 = new FormData();
// console.log('p0',picturefiles[0])
// console.log('p1',picturefiles[1])

formdata2.append('Continent', Continent);
formdata2.append('Country', selectedCountry.name);
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
for (var pair of formdata2.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
}


var requestOptions = {
  method: 'POST',
  body: formdata2,
  redirect: 'follow'
};

fetch("http://localhost:3000/coins/uploadm", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}


  useEffect(() => {
  // console.log('xx',{picturefiles});
  console.log('sssssss',jsonDataByte);
    picturefiles.forEach(element => {
      console.log('eee',element);
    });
}, [picturefiles,jsonDataByte])


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

interface CoinInterface {
  Continent: string;	
   Country: string;
   Catalog: string;
   Value: string;
   Name: string;
   Year: number
   Composition: string;
   Status: string;
   Price: number;
   References: string;
   Stock: number;
   files: string;
   Photo1: string;
   Photo2: string;	
}


const jsonCoinRezult: CoinInterface = ({
  Continent: Continent,
  Country: selectedCountry.name,
  Catalog: Catalog,
  Value: Value,
  Name: Name,
  Year: Year,
  Composition: Composition.name,
  Status: Status.name,
  Price: Price,
  References: 0,
  Stock: Stock,
  files: picturefiles, 
  Photo1: "poza1.jpg",
  Photo2: "poza2.jpg"	
});


const jsonData = JSON.stringify(jsonCoinRezult);


var formData = new FormData();
formData.append('Continent', Continent);
formData.append('Country', selectedCountry.name);
formData.append('Catalog', Catalog);
formData.append('Value', Value);
formData.append('Name', Name);
formData.append('Year', Year);
formData.append('Composition', Composition.name);
formData.append('Status', Status.name);
formData.append('Price', Price);
formData.append('References', 0);
formData.append('Stock', Stock);
formData.append('files', jsonDataByte );
formData.append('Photo1', "Photo1");
formData.append('Photo2', "Photo2" );

const handleUploadV1 = () => {
  console.log('xxx',jsonDataByte);
  console.log('date:', formData)
//   axios.post('http://localhost:3000/coins/uploadm', formData),
// {
//   headers: {
//     'Content-Type': //'multipart/form-data'
//     'application/json'
//   }
// }
} 


// Display the key/value pairs
// for (var pair of formData.entries()) {
//     console.log(pair[0]+ ', ' + pair[1]); 
// }


const handlerAxios = async () => {
console.log('din post',jsonDataByte, Continent, Catalog);


// picturefiles.forEach(element => {
//   console.log('post',element);}
// )
{
  await axios.post('http://localhost:3000/coins/uploadm', {
    Continent: Continent,
    Country: selectedCountry.name,
    Catalog: Catalog,
    Value: Value,
    Name: Name,
    Year: Year,
    Composition: Composition.name,
    Status: Status.name,
    Price: Price,
    References: 0,
    Stock: Stock,
    files: jsonDataByte, //picturefiles[0], 
    Photo1: "poza1.jpg",
    Photo2: "poza2.jpg"	
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
 }
)
}
}


// Send jsonData to the backend
const handleSubmit = async () => {
  for (var pair of formData.entries()) {
       console.log(pair[0]+ ', ' + pair[1]); }

 await axios.post('http://localhost:3000/coins/uploadm', formData),
{
  headers: {
    'Content-Type': 'multipart/form-data'
  }

}}


  return (
    <PrimeReactProvider>

      <Menu activatedIndex={4} />

      {/* <div className="card" style={{width:"30%"}}> */}
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
              <FileUpload  
              multiple accept="image/*" 
              // mode="basic"
              maxFileSize={1000000} 
              customUpload={true}
              //onValueChange={(e) => setPicturefiles(files)}
              //uploadHandler={setPicturefiles(files)}
              uploadHandler={onUpload}
              chooseLabel="Upload photos"
              />
            </div>
          </div>
        </div>
        <div className="card flex flex-wrap justify-content-left gap-3 mb-4">
        <Button label="Save" icon="pi pi-check" iconPos="right" onClick={() => handlerFormData()} />  
        <Button label="Delete" icon="pi pi-delete-left" iconPos="right" severity="danger"/>
        </div></div>
    </PrimeReactProvider>

  )
}