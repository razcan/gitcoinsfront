"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import { usePathname } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../../../components/menu_ini';
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
import '../../../../css/style.css'
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import axios from 'axios';

interface PageProps {
  params: { edit: string },
}

export default function CoinEdit({ params: { edit } }: PageProps) {
  // const pathname = usePathname()
  // const searchParams = useSearchParams()
  const router = useRouter();
  const [products, setProducts] =  useState<any>();
  const [items, setItems] =  useState<any>();
  const toast = useRef(null);
  const axios = require('axios');
  const [visible, setVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] =  useState<any>();
  const [username, setUserName] = useState<any>();
  const [password, setPassword] = useState<any>();
  const [visibleStock, setVisibleStock] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(false);
  const [operationDate, setOperationDate] = useState<any>();
  const [operationRemarks, setOperationRemarks] = useState<any>();
  const [operationQtty, setOperationQtty] =  useState<any>();
  const [operations, setOperations] =  useState<any>();
  const countries = countries_all;
  const [Price, setPrice] =  useState<any>();
  const [Code, setCode] =  useState<any>();
  const [Continent, setContinent] =  useState<any>();
  const [Country, setCountry] =  useState<any>();
  const [Year, setYear] =  useState<any>();
  const [Catalog, setCatalog] =  useState<any>();
  const [Value, setValue] =  useState<any>();
  const [Status, setStatus] =  useState<any>();
  const [Composition, setComposition] = useState<any>();
  const [Name, setName] =  useState<any>();
  const [Stock, setStock] =  useState<any>();
  const [Photo1, setPhoto1] =  useState<any>();
  const [Photo2, setPhoto2] =  useState<any>();
  const [picturefiles, setPicturefiles] =  useState<any>([]);
  const [Id, setId] =  useState<any>();

  const showError = (message:any) => {
    // toast.current.show({ severity: 'error', summary: 'Saving error!', detail: message, life: 3000 });
  }

  const showErrorLogin = () => {
    // toast.current.show({ severity: 'error', summary: 'You are not logged in!', detail:  'You are not logged in!', life: 3000 });
  }

  const deleteItem = async () => {
    const session: any = sessionStorage.getItem('token');
    const jwtToken = JSON.parse(session);
   
  
    if(jwtToken){
    const jwtTokenf = jwtToken.access_token;
    const response = await fetch(`http://localhost:3000/coins/${edit}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${jwtTokenf}`,
        'Content-Type': 'application/json',
      },

    })

    if (!response.ok) {
      const res = `HTTP error! Status: ${response.status}`
      // const x = response.status
      //  showError(res)
      if (response.status == 401) {
        // setVisible(true)
        router.push('/login')
      }
      //  throw new Error(`HTTP error! Status: ${response.status}`);
    }
    if (response.ok) {
      // console.log('Delete successful');
      router.push('/admin');
    }
  }
  else {
    showErrorLogin()
    setTimeout(() => {
      setVisible(false)
      router.push('/login')
 
    }, 1000);

    
  }
  }




  const coin_status = [
    { name: 'UNC/AUNC', id: 1 },
    { name: 'VF/F', id: 2 },
    { name: 'VG/G', id: 3 }
  ];



  const getStatus = (status:any) => {
    return coin_status.find((obj) => obj.name === status)
  };

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

  const stock_operation = [
    { name: 'Load(+)', id: 1 },
    { name: 'Deacrease(-)', id: 2 },
  ]


  const getCompositionJson = (status: string) => {
    return coin_composition.find((obj) => obj.name === status);
  };

  const getCountry = (countryToFind: string) => {
    return countries.find((obj: { name: string; }) => obj.name === countryToFind);
  };

  const onUpload = ({ files }: any) => {
    setPicturefiles(files);
  }

  const showSuccess = () => {
    // toast.current.show({ severity: 'success', summary: 'Result', detail: 'The coin was updated succesfully', life: 3000 });
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
  }

  const countryOptionTemplate = (option:any) => {
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

  const fetchStockOperations = async () => {
    await fetch(`http://localhost:3000/stocks/${edit}`)
      .then(response => {
        return response.json()
      }).then(stock => {
        setOperations(stock)
      }
      )
  }

  const saveOperationStock = async () => {


    if (operationQtty >= 0) { var typeOp = 'Load' }
    else { var typeOp = 'Decrease' }

    try {
      const response = await axios.post(`http://localhost:3000/stocks`, {
        TransactionDate: operationDate,
        Type: typeOp,
        Qtty: operationQtty,
        CoinId: Id,
        Remarks: operationRemarks
      });
      fetchCoinData()
      showSuccess();
    } catch (error) {
      console.error('Error submitting :', error);
    }
    setVisibleStock(false);
     //router.push('/admin');

  }

  const fetchCoinData = async () => {
    await fetch(`http://localhost:3000/coins/${edit}`)
      .then(response => {
        // setItems(response.json())
        return response.json()
      })
      .then(coins => {
        setProducts(coins);
        coins.map((product: { id: any; Price: any; Continent: any; Country: any; Code: any; Year: any; Catalog: any; Value: any; Status: any; Composition: React.SetStateAction<string[]>; Name: any; Stock: any; Photo1: any; Photo2: any; }) => (
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
  
  useEffect(() => {
    fetchCoinData(),
      fetchStockOperations()
     
  }, [])

  const stockOperations = () => {
    console.log('stock')
    setVisibleStock(true);
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
    formdata2.append('References', '');
    formdata2.append('Stock', Stock);
    if (picturefiles.length == 2) {
      formdata2.append("files", picturefiles[0]);
      formdata2.append("files", picturefiles[1]);
    }

    formdata2.append('Photo1', Photo1);
    formdata2.append('Photo2', Photo2);

    //to be implemented
    //console.log('marime:', picturefiles.length)

    var requestOptions: any = {
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


      <Menu activatedIndex={5} />
      <Toast ref={toast} />

      <Card className='container'>
        <div className='content'>
          {Photo1? 

          <div style={{ padding: "2px", maxHeight: "90vh" }} className="md:w-28rem">

            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex-auto">
                <div className="flex flex-column gap-2">
                  {/* <label htmlFor="catalog">Country</label> */}

                  <Dropdown
                    value={getCountry(Country)}
                    onChange={(e: { value: { continent: any; name: any; code: any; }; }) => {
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
                      value={Catalog} onChange={(e: { target: { value: any; }; }) => setCatalog(e.target.value)} />
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
                      value={Value} onChange={(e: { target: { value: any; }; }) => setValue(e.target.value)}
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
                      value={Name} onChange={(e: { target: { value: any; }; }) => setName(e.target.value)}
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
                      value={Year} onValueChange={(e: { value: any; }) => setYear(e.value)} />
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
                    optionLabel="name" onChange={(e:any) => setComposition(e.value)}
                    placeholder="Select composition" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex-auto">
                <div className="flex flex-column gap-2">
                  {/* <label htmlFor="price">Price</label> */}
                  {/* <InputNumber showButtons mode="currency" currency="RON"
                    value={Price} onValueChange={(e) => setPrice(e.value)} /> */}
                    <InputNumber value={Price} onValueChange={(e: { value: any; }) => setPrice(e.value)} minFractionDigits={2} maxFractionDigits={5} />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex-auto">
                <div className="flex flex-column gap-2">
                  {/* <label htmlFor="status">Status</label> */}
                  <Dropdown value={getStatus(Status)} options={coin_status}
                    optionLabel="name" onChange={(e: { value: any; }) => setStatus(e.value)}
                    placeholder="Select status" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex-auto">
                <div className="flex flex-column gap-2">
                  <span className="p-float-label">
                    <InputNumber useGrouping={false} placeholder="Enter initial stock"
                      value={Stock} onValueChange={(e: { value: any; }) => setStock(e.value)} />
                    <label htmlFor="stock">Stock</label>
                    <div className=' pt-2 pl-2'>
                      <Button label="Stock Operations" icon="pi pi-check" iconPos="right" onClick={() => stockOperations()} />
                    </div>
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
                  <div className="flex flex-column gap-1">
                    <label>Actual photos</label>
                    <Toast ref={toast} />
                    <span>
                      <img src={`http://localhost:3000/coins/download/${Photo1}`} alt={Photo1} style={{ width: '30%', paddingLeft: '6px' }} />
                      <img src={`http://localhost:3000/coins/download/${Photo2}`} alt={Photo2} style={{ width: '30%', paddingLeft: '6px' }} />
                    </span>
                  </div>
                </div>


              </div>

            </div>
            <div className="card flex flex-wrap gap-2 mb-1" style={{ paddingLeft: "0" }}>
              <Button label="Save" icon="pi pi-check" iconPos="right" onClick={() => handlerFormData()} />
              <Button label="Delete" icon="pi pi-delete-left"
                iconPos="right" severity="danger" onClick={() => deleteItem()} />
            </div>

          </div>
:null}
        </div>

        <Dialog header="Header" visible={visibleStock} style={{ width: '60vw' }} onHide={() => setVisibleStock(false)}>
          <Accordion activeIndex={1}>
            <AccordionTab header="Stock Operations">

              <div className="formgrid grid">

                {/* <div className="field col">
                <div className="flex flex-column">
                    <label htmlFor="Operation">Operation</label>
                    <Dropdown value={selectedOperation} onChange={(e) => setSelectedOperation(e.value)} options={stock_operation} optionLabel="name" 
                    placeholder="Select a Operation" className="w-full md:w-22rem" />
                </div>
               </div> */}

                <div className="field col">
                  <div className="flex flex-column">
                    <label htmlFor="qtty">Qtty</label>
                    <InputNumber inputId="integeronly" value={operationQtty} onValueChange={(e: { value: any; }) => setOperationQtty(e.value)} />
                  </div>
                </div>

                <div className="field col">
                  <div className="flex flex-column">
                    <label htmlFor="Date">Date</label>
                    <Calendar value={operationDate} onChange={(e: { value: any; }) => setOperationDate(e.value)} />
                  </div>
                </div>

                <div className="field col">
                  <div className="flex flex-column">
                    <label htmlFor="Remarks">Remarks{operationRemarks}</label>
                    <InputText value={operationRemarks} onChange={(e: { target: { value: any; }; }) => setOperationRemarks(e.target.value)} />
                  </div>
                </div>

              </div>
              <Button label="Save" icon="pi pi-check" iconPos="right" onClick={() => saveOperationStock()} />
            </AccordionTab>
            <AccordionTab header="Stock Transactions">
              <div className="card">
                {operations ?
                  <DataTable value={operations} scrollHeight='50rem' tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="Number"></Column>
                    <Column field="Type" header="Type"></Column>
                    <Column field="TransactionDate" header="TransactionDate"></Column>
                    <Column field="Qtty" header="Qtty"></Column>
                    <Column field="CreatedAt" header="CreatedAt"></Column>
                    <Column field="Remarks" header="Remarks"></Column>
                    
                  </DataTable>
                  : null}
              </div>
            </AccordionTab>
          </Accordion>

        </Dialog>

      </Card>

    </PrimeReactProvider>


  )
}