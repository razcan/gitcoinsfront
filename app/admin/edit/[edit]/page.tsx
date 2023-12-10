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
import { useRouter } from 'next/navigation';
import { Tag } from 'primereact/tag';
import  '../../../../css/style.css' 
import { Card } from 'primereact/card';

interface PageProps {
  params: { edit: string },
}

export default function CoinEdit({ params: { edit } }: PageProps) {
  // const pathname = usePathname()
  // const searchParams = useSearchParams()
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const toast = useRef(null);
  const axios = require('axios');
  const [selectedCountry, setSelectedCountry] = useState([]);
 
  const countries = countries_all;
  const [Price, setPrice] = useState([1]);

  const [Code, setCode] = useState([]);
  const [Continent, setContinent] = useState([]);
  const [Country, setCountry] = useState([]);
  
  const [Year, setYear] = useState([]);
  const [Catalog, setCatalog] = useState([]);
  const [Value, setValue] = useState([]);
  const [Status, setStatus] = useState([]);
  const [Composition, setComposition] = useState(['Silver']);
  const [Name, setName] = useState([]);
  const [Stock, setStock] = useState([]);
  const [Photo1, setPhoto1] = useState([]);
  const [Photo2, setPhoto2] = useState([]);
  const [picturefiles, setPicturefiles] = useState([]);
  const [Id, setId] = useState([]);



  const deleteItem = async () => {
    // const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOlt7InVzZXJJZCI6MCwiY3JlYXRlZGF0IjoiMjAyMy0xMi0xMFQwNjoyODo1Mi4wMDBaIiwidXNlcm5hbWUiOiJyYXp2YW4iLCJwYXNzd29yZCI6InZhc2lsaWNhIiwicm9sZSI6ImFkbWluIiwibmFtZSI6InJhenZhbiBtdXN0YXRhIiwiYXZhdGFyIjoibmEifV0sInVzZXJuYW1lIjpbeyJ1c2VySWQiOjAsImNyZWF0ZWRhdCI6IjIwMjMtMTItMTBUMDY6Mjg6NTIuMDAwWiIsInVzZXJuYW1lIjoicmF6dmFuIiwicGFzc3dvcmQiOiJ2YXNpbGljYSIsInJvbGUiOiJhZG1pbiIsIm5hbWUiOiJyYXp2YW4gbXVzdGF0YSIsImF2YXRhciI6Im5hIn1dLCJpYXQiOjE3MDIyMTg4MzMsImV4cCI6MTcwMjIxOTQzM30.XjR-UvBQkQzp-ovmlsJ-WTHcxgCvHC3ZRa8JoHLi-SM'
    const jwtToken = JSON.parse(localStorage.getItem('token'))
    const jwtTokenf=jwtToken.access_token;
    // console.log(jwtToken.access_token)
    fetch(`http://localhost:3000/coins/${edit}`, { 
      method: 'DELETE' ,
      headers: {
        'Authorization': `Bearer ${jwtTokenf}`,
        'Content-Type': 'application/json', // Adjust content type if needed
      },
    
    })
      .then(() => console.log({ status: 'Delete successful' }));
      router.push('/admin');
  }

  useEffect(() => {
    fetchCoinData()
  }, [])

  const coin_status = [
    { name: 'UNC/AUNC', id: 1 },
    { name: 'VF/F', id: 2 },
    { name: 'VG/G', id: 3 }
  ];

  const getStatus = (status) => {
    return coin_status.find((obj) => obj.name === status)
  };

  const coin_composition = [
    { name: 'Others', id: 1 },
    { name: 'Copper', id: 29 },
    { name: 'Silver', id: 47 },
    { name: 'Gold', id: 79 }
  ]

  const getCompositionJson = (status: string) => {
    return coin_composition.find((obj) => obj.name === status);
  };

  const getCountry = (countryToFind: string) => {
    return countries.find((obj) => obj.name === countryToFind);
  };

  const onUpload = ({ files }) => {
    setPicturefiles(files);
  }

  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Result', detail: 'The coin was updated succesfully', life: 3000 });
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
  }

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

  const fetchCoinData = async () => {
    await fetch(`http://localhost:3000/coins/${edit}`)
      .then(response => {
        // setItems(response.json())
        return response.json()
      })
      .then(coins => {
        setProducts(coins);
        coins.map(product=> (      
          setId(product.id),             
          setPrice(product.Price),
         
          setContinent(product.Continent),
          setCountry(product.Country),
          setCode(product.Code),

          setYear(product.Year),
          setCatalog(product.Catalog),
          setValue(product.Value),
          setStatus(product.Status),
          setComposition(product.Composition),
          setName(product.Name),
          setStock(product.Stock),
          setPhoto1(product.Photo1),
          setPhoto2(product.Photo2)
          
          ))
      })
  }

  const handlerFormData = async () => {
    onUpload(picturefiles);


    var formdata2 = new FormData();

    // formdata2.append('id', Id);
    formdata2.append('Continent', Continent);
    formdata2.append('Country', Country);
    formdata2.append('Code', Code);
    formdata2.append('Catalog', Catalog);
    formdata2.append('Value', Value);
    formdata2.append('Name', Name);
    formdata2.append('Year', Year);
    formdata2.append('Composition', Composition);
    formdata2.append('Status', Status);
    formdata2.append('Price', Price);
    formdata2.append('References', 0);
    formdata2.append('Stock', Stock);
    if (picturefiles.length == 2)
    {
      formdata2.append("files", picturefiles[0]);
      formdata2.append("files", picturefiles[1]);
    }
   
    formdata2.append('Photo1', Photo1);
    formdata2.append('Photo2', Photo2);

    //to be implemented
    //console.log('marime:', picturefiles.length)

    var requestOptions = {
      method: 'PATCH',
      body: formdata2,
      redirect: 'follow'
    };

    fetch(`http://localhost:3000/coins/${edit}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const obj = JSON.parse(result);
        if (obj.statusCode = 201) {
          showSuccess();
        }
      }
      )
      .catch(error => console.log('error', error));
      router.push('/admin');
  }

  return (
    <PrimeReactProvider>      
      <Card className='container'>
          <div className='content'>
           

      <Menu activatedIndex={5} />
      <Toast ref={toast} />

        <div style={{ padding: "10px", maxHeight: "90vh" }} className="md:w-28rem">

          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-auto">
              <div className="flex flex-column gap-2">
                {/* <label htmlFor="catalog">Country</label> */}
               
                <Dropdown 
                 value={getCountry(Country)}
                  onChange={(e) => {
                    setContinent(e.value.continent),
                    setCountry(e.value.name),
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
                  <InputText id="catalog" placeholder="Enter catalog code"
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
                  <InputText id="value" placeholder="Enter value"
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
                  <InputText id="name" placeholder="Enter name"
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
                  <InputNumber useGrouping={false} placeholder="Enter year" 
                  value={Year} onValueChange={(e) => setYear(e.value)} />
                  <label htmlFor="year">Year</label>
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-auto">
              <div className="flex flex-column gap-2">
                <Dropdown
                  value={getCompositionJson(Composition)}
                  options={coin_composition}
                  optionLabel="name" onChange={(e) => setComposition(e.value)}
                  placeholder="Select composition" />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-auto">
              <div className="flex flex-column gap-2">
                {/* <label htmlFor="price">Price</label> */}
                <InputNumber showButtons mode="currency" currency="RON" 
                value={Price} onValueChange={(e) => setPrice(e.value)} />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-auto">
              <div className="flex flex-column gap-2">
                {/* <label htmlFor="status">Status</label> */}
                <Dropdown value={getStatus(Status)} options={coin_status}
                  optionLabel="name" onChange={(e) => setStatus(e.value)}
                  placeholder="Select status" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-auto">
              <div className="flex flex-column gap-2">
                <span className="p-float-label">
                  <InputNumber useGrouping={false} placeholder="Enter initial stock" 
                  value={Stock} onValueChange={(e) => setStock(e.value)} />
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
                  chooseLabel="Change photos"
                />
                    <div className="flex flex-column gap-2">
                <label>Actual photos</label>
                <img src={`http://localhost:3000/coins/download/${Photo1}`} alt={Photo1} style={{ width: '30%', padding: '10px' }} />
                <img src={`http://localhost:3000/coins/download/${Photo2}`} alt={Photo2} style={{ width: '30%', padding: '10px' }} />
            </div>
              </div>
          

            </div>
       
          </div>
          <div className="card flex flex-wrap gap-1 mb-1" style ={{paddingLeft : "0"}}>
            <Button label="Save" icon="pi pi-check" iconPos="right" onClick={() => handlerFormData()} />
            <Button label="Delete" icon="pi pi-delete-left"
              iconPos="right" severity="danger" onClick={() => deleteItem()} />
          </div>

        </div>
        </div>
        </Card>

      {/* ))} */}

    </PrimeReactProvider>


  )
}