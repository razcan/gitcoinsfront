"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../../components/menu_ini';
import { FileUpload } from 'primereact/fileupload';
import { Dropdown } from 'primereact/dropdown';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import countries_all from "../../../css/country.json";
import all_currencies from "../../../css/currency_simple.json" ;
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/navigation';
import { Card } from 'primereact/card';
import  '../../../css/style.css' ;

import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { ScrollPanel } from 'primereact/scrollpanel';

export default function Admin() {
  // const toast = useRef(null);
  const toast = useRef<any>(null);

  const [arr, setArr] = useState<any[]>([])
  const router = useRouter();
  const axios = require('axios');
  const [selectedCountry, setSelectedCountry] = useState<any>();
  const [selectedCurrency, setSelectedCurrency] = useState<any>();
  const [Code, setCode] = useState<any>();
  const countries = countries_all;
  const [Price, setPrice] = useState<any>();
  const [Continent, setContinent] =  useState<any>();
  const [Year, setYear] = useState<any>();
  const [Catalog, setCatalog] = useState<any>();
  const [Value, setValue] = useState<any>();
  const [Status, setStatus] = useState<any>();
  const [Composition, setComposition] =useState<any>();;
  const [Name, setName] = useState<any>();
  const [References, setReferences] = useState<any>();
  const [Stock, setStock] = useState<any>();
  const [picturefiles, setPicturefiles] = useState<any>();
  const [byteArray, setbyteArray] = useState<any>();
  const [jsonDataByte, setJsonDataByte] = useState<any>();

  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();

  const showSuccess = () => {
    if (toast.current != null) {
   toast.current.show({severity:'success', summary: 'Result', detail:'The coin was saved succesfully', life: 3000});
    }
}
  

  const selectedCountryTemplate = (option: any, props: any) => {
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

  const selectedCurrencyTemplate = (option: any, props: any) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          
            <div style={{ paddingLeft: "40px" }}>
            {option.NAME}
            </div>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  

  const countryOptionTemplate = (option: { code: any; name: React.ReactNode; }) => {
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

const showErrorAPI = (error:any) => {
  toast.current.show({severity:'error', summary: 'Error', 
  detail:error, life: 3000});
}


  const onUpload =  ({ files }: any) => {
   setPicturefiles(files);
  }

const handlerFormData = async () => {
onUpload(picturefiles);

if (picturefiles.length !=2){
  // console.log('eroare')
  showError()
}
else {
  
var formdata2 = new FormData();

formdata2.append('Continent', Continent);
formdata2.append('Country', selectedCountry.name);
formdata2.append('Code', selectedCountry.code);
formdata2.append('Catalog', Catalog);
formdata2.append('Value', Value);
formdata2.append('Name', Name.NAME);
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
formdata2.append('StartDate', startDate);
formdata2.append('EndDate', endDate);

// Display the key/value pairs
// for (var pair of formdata2.entries()) {
//     console.log(pair[0]+ ', ' + pair[1]); 
// }

const showSuccess = () => {
   toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 6000});
}

var requestOptions: any = {
  method: 'POST',
  body: formdata2,
  redirect: 'follow'
} ;

fetch("http://localhost:3000/coins/uploadm", requestOptions)
  .then(response => response.text())
  .then(result => 
    {
      const obj  = JSON.parse(result);
      if (obj.statusCode == 201){
        // console.log('validare',obj.statusCode)
         showSuccess(); 
         router.push('/admin');
      }
      if ( parseInt(obj.statusCode , 10) >= 400){
        //console.log('validare',obj.statusCode)
        showErrorAPI(obj.message);
      }
   
    }
    )
  .catch(error => 
    { 
      console.log('error', error)
  });
  // 
}
}


  useEffect(() => {}, [picturefiles,jsonDataByte])


  const coin_status = [
    { name: 'UNC/AUNC', id: 1},
    { name: 'VF/F', id: 2 },
    { name: 'VG/G', id: 3 }
];

const coin_composition = [
  { name: 'Nichel', id: 1 },
  { name: 'Nichel placat', id: 2 },
  { name: 'Cupru', id: 3 },
  { name: 'Cupru placat', id: 4 },
  { name: 'Alama', id: 5 },
  { name: 'Zinc', id: 6 },
  { name: 'Fier', id: 7 },
  { name: 'Argint', id: 8 },
  { name: 'Aur', id: 9 }
]

  return (
    <PrimeReactProvider>

      <Card className='container'>
          <div className='content pt-6'>
            <Menu activatedIndex={5} />
            <Toast ref={toast} />
            <ScrollPanel style={{ width: '100%' }}>
      <div className="grid card flex-wrap gap-3 p-fluid pl-0" style={{padding:"20px"}}>
      <div className="col-3 xs:col-2 xl:col-3"></div>
        <div className="col-3 ">
            <div className="flex-auto gap-3 xs:gap-1 p-3 xs:p-1">
                <span className="p-float-label">
                  <InputNumber useGrouping={false} placeholder="Start Date Year" value={startDate} onValueChange={(e:any) => setStartDate(e.value)}/>
                  <label htmlFor="Start Date Year">Start Date Year</label>
                </span>
            </div>
            <div className="flex-auto gap-3 xs:gap-1 p-3 xs:p-1">
               <span className="p-float-label">
                  <InputNumber useGrouping={false} placeholder="End Date Year" value={endDate} onValueChange={(e:any) => setEndDate(e.value)}/>
                  <label htmlFor="End Date Year">End Date Year</label>
                </span>
            </div>

            <div className="flex-auto gap-3 xs:gap-1 p-3 xs:p-1">
              <span className="p-float-label">
                <InputNumber useGrouping={false} placeholder="Enter year" value={Year} onValueChange={(e:any) => setYear(e.value)}/>
                <label htmlFor="year">Year</label>
              </span>
              </div>


            <div className="flex-auto gap-3 xs:gap-1 p-3 xs:p-1">
            <span className="p-float-label">
              <InputText id="catalog"  placeholder="Enter catalog code" value={Catalog} onChange={(e:any) => setCatalog(e.target.value)} />
              <label htmlFor="catalog">Catalog</label>
              </span>
             </div>

             <div className="flex-auto gap-3 xs:gap-1 p-3 xs:p-1">
              <span className="p-float-label">             
              <InputText id="value"  placeholder="Enter value" value={Value} onChange={(e:any) => setValue(e.target.value)}/>
               <label htmlFor="value">Value</label>
              </span>
              </div>




              <div className="flex-auto gap-3 xs:gap-1 p-3 xs:p-1">
              <span className="p-float-label">  
              <InputNumber useGrouping={false} placeholder="Enter initial stock" value={Stock} onValueChange={(e:any) => setStock(e.value)}/>
              <label htmlFor="stock">Stock</label>
             </span>
             </div>

             <div className="flex-auto gap-3 xs:gap-1 p-3 xs:p-1">
                <div className="p-float-label">
                <InputTextarea value={References} onChange={(e:any) => setReferences(e.target.value)} rows={5} cols={30} />
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

        <div className="col-4 xl:col-3">


            <div className="flex-auto p-3">
            <div className="flex flex-column gap-3">
            <Dropdown value={Name} onChange={(e:any) => setName(e.value)} 
              options={all_currencies} optionLabel="NAME" 
              filter valueTemplate={selectedCurrencyTemplate}
                placeholder="Select a Currency" className="w-full" />
              </div>
          </div>

          <div className="flex-auto p-3 ">
                <div className="flex flex-column gap-3">
                  <Dropdown value={Composition} options={coin_composition} 
                  optionLabel="name" onChange={(e:any) => setComposition(e.value)} 
                  className="w-full"
                  placeholder="Select composition"/>
                </div>
            </div>
           

            <div className="flex-auto p-3">
            <div className="flex flex-column gap-3">
              <Dropdown value= {selectedCountry} 
              onChange={(e:any) => {
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
              <Dropdown value={Status} options={coin_status} optionLabel="name" onChange={(e:any) => setStatus(e.value)} 
                placeholder="Select status"/>
            </div>
          </div>


            <div className="flex-auto gap-3 xs:gap-1 p-3 xs:p-1">
              <span className="p-float-label">  
              <InputNumber inputId="price" value={Price} onValueChange={(e:any) => setPrice(e.value)} minFractionDigits={2} maxFractionDigits={2} />
              <label htmlFor="price">Price</label>
             </span>
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
        <div className="col-3 xs:col-1"></div>
    </div>

    </ScrollPanel>
        </div>
        </Card>
    </PrimeReactProvider>

  )
}