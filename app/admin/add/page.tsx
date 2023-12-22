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
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { ScrollPanel } from 'primereact/scrollpanel';

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
  const [References, setReferences] = useState([]);
  const [Stock, setStock] = useState([]);
  const [picturefiles, setPicturefiles] = useState([]);
  const [byteArray, setbyteArray] = useState([]);
  const [jsonDataByte, setJsonDataByte] = useState([]);

  const [startDate, setStartDate] = useState(new Date);
  const [endDate, setEndDate] = useState(new Date);

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

  const showError = () => {
    toast.current.show({severity:'error', summary: 'Error', 
    detail:'You must upload two pictures', life: 3000});
}


  const onUpload =  ({ files }) => {
   setPicturefiles(files);
  }

const handlerFormData = async () => {
onUpload(picturefiles);

if (picturefiles.length !=2){
  console.log('eroare')
  showError()
}
else {
  
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
formdata2.append('References', References);
formdata2.append('Stock', Stock);
formdata2.append("files", picturefiles[0]);
formdata2.append("files", picturefiles[1]);
formdata2.append('Photo1', "Photo1");
formdata2.append('Photo2', "Photo2" );
formdata2.append('StartDate', endDate);
formdata2.append('EndDate', endDate );

// Display the key/value pairs
// for (var pair of formdata2.entries()) {
//     console.log(pair[0]+ ', ' + pair[1]); 
// }

const showSuccess = () => {
  toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 6000});
}

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
            <ScrollPanel style={{ width: '100%' }}>
      <div className="grid card flex-wrap gap-3 p-fluid pl-0" style={{padding:"20px"}}>
      <div className="col-3"></div>
        <div className="col-3">
            <div className="flex-auto gap-3 p-3">
                <span className="p-float-label">
                <Calendar inputId="start_date" value={startDate} showIcon showWeek onChange={(e) => setStartDate(e.value)} dateFormat="dd/mm/yy"/>
                <label htmlFor="start_date">Start Date Period</label>
                </span>
            </div>
            <div className="flex-auto gap-3 p-3">
               <span className="p-float-label">
                <Calendar inputId="end_date" value={endDate} showIcon showWeek onChange={(e) => setEndDate(e.value)} dateFormat="dd/mm/yy"/>
                <label htmlFor="end_date">End Date Period</label>
                </span>
            </div>
            <div className="flex-auto gap-3 p-3">
            <span className="p-float-label">
              <InputText id="catalog"  placeholder="Enter catalog code" value={Catalog} onChange={(e) => setCatalog(e.target.value)} />
              <label htmlFor="catalog">Catalog</label>
              </span>
             </div>

             <div className="flex-auto gap-3 p-3">
              <span className="p-float-label">             
              <InputText id="value"  placeholder="Enter value" value={Value} onChange={(e) => setValue(e.target.value)}/>
               <label htmlFor="value">Value</label>
              </span>
              </div>

              <div className="flex-auto gap-3 p-3">
              <span className="p-float-label">
              <InputText id="name"  placeholder="Enter name" value={Name} onChange={(e) => setName(e.target.value)}/>
              <label htmlFor="name">Name</label>
              </span>
              </div>

              <div className="flex-auto gap-3 p-3">
              <span className="p-float-label">
                <InputNumber useGrouping={false} placeholder="Enter year" value={Year} onValueChange={(e) => setYear(e.value)}/>
                <label htmlFor="year">Year</label>
              </span>
              </div>

              <div className="flex-auto gap-3 p-3">
              <span className="p-float-label">  
              <InputNumber useGrouping={false} placeholder="Enter initial stock" value={Stock} onValueChange={(e) => setStock(e.value)}/>
              <label htmlFor="stock">Stock</label>
             </span>
             </div>

             <div className="flex-auto gap-3 p-3">
                <div className="p-float-label">
                <InputTextarea value={References} onChange={(e) => setReferences(e.target.value)} rows={5} cols={30} />
                <label htmlFor="References">References</label>
                </div>
              </div>
              <div className="gap-3 pt-3 pl-2">
              <div style={{width: '140px'}}>
                <Button className='m-1' label="Save" icon="pi pi-check" iconPos="right" onClick={() => handlerFormData()} />  
                <Button className='m-1' label="Delete" icon="pi pi-delete-left" iconPos="right" severity="danger"/>  
             </div>          
      </div>

        </div>
        {/* <div className="col-1"></div> */}

        <div className="col-3">
            <div className="flex-auto gap-3 p-3">
                <div className="flex flex-column gap-3">
                  <Dropdown value={Composition} options={coin_composition} optionLabel="name" onChange={(e) => setComposition(e.value)} 
                    placeholder="Select composition"/>
                </div>
            </div>
            <div className="flex-auto p-3">
            <div className="flex flex-column gap-3">
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
          <div className="flex-auto p-3">
            <div className="flex flex-column gap-3">
              <Dropdown value={Status} options={coin_status} optionLabel="name" onChange={(e) => setStatus(e.value)} 
                placeholder="Select status"/>
            </div>
          </div>
          <div className="flex-auto p-3">
            <div className="flex flex-column gap-3">
              <InputNumber showButtons mode="currency" currency="RON" value={Price} onValueChange={(e) => setPrice(e.value)}/>
            </div>
          </div>
          <div className="flex-auto p-3">
            <div className="flex flex-column gap-3">
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
        <div className="col-3"></div>
    </div>

      {/* <div  style={{padding:"5px", maxHeight: "90vh"}} className="md:w-28rem"> */}


    </ScrollPanel>
        </div>
        </Card>
    </PrimeReactProvider>

  )
}