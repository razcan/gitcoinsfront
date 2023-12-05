"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';
import Menu from '../../../components/menu';
import { CascadeSelect } from 'primereact/cascadeselect';
import { Judete } from '../../../public/address/judete'
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { isTypedArray } from 'util/types';

// import nodemailer from 'nodemailer';

//to do - pe butonul de submit trebuie trimis email, stearsa comanda din localstorage si salvata in baza de date - inclusiv datele din formularul de adresa
//salvare comanda in bd si trimitere link catre utilizator -id uuid - 

export default function Address() {


  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sumQttyItem = searchParams.get("sumQttyItem");
  const sumValueItem = searchParams.get("sumValueItem");

  // console.log(sumQttyItem,sumValueItem)
  const router = useRouter();
  // const { sumQttyItem, sumValueItem } = router.query;
  // console.log('xxy',sumQttyItem, sumValueItem)

  const [selectedCounty, setCounty] = useState(null);
  const [selectedOras, setOras] = useState('Selectati un oras');
  const [countyIsSelected, setcountyIsSelected] = useState(true);
  const [listajudete, setListajudete] = useState(null);
  const [listaorase, setListaorase] = useState(null);
  const judete = Judete;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [remarks, setRemarks] = useState('');
  const [retrievedObject, setRetrievedObject] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderHeader, setOrderHeader] = useState([]);

  interface DetailsOrder {
    orderId: any;
    CoinId: any;
    Quantity: any;
    UnitPrice: any;
    Discount: any;
    Total: any;
  }

  useEffect(() => {
    const getValues = () => {
      setRetrievedObject(JSON.parse(localStorage.getItem('YourOrder')))
      setDataFetched(true)
    }
    getValues(),
      detailsOrder()
  }, [dataFetched])

  const detailsOrder = () => {
    if (dataFetched) {
      const details: DetailsOrder = []
      retrievedObject.map(item => {
        details.push({orderId: 0, CoinId: `${item.id}`, Quantity: `${item.Qtty}`, UnitPrice: `${item.Price}`, Discount: 0, Total: `${item.Amount}`})
      })
      setOrderDetails(details)
    }
  }

  // { judet: `${localitate.nume}`, localitate: `${localitate.localitati[i].nume}` }

  interface OrderHeader {
    OrderDate: Date;
    Customer: any;
    Email: any;
    Phone: any;
    Remarks: any;
    TotalAmount: any;
    OrderStatus: any;
    ShippingAddress: any;
    PaymentMethod: any;
    ShippingMethod: any;
  }



  const getJudete = () => {
    const judeteAll = [];
    judete.map(localitate => {
      judeteAll.push({ judet: `${localitate.nume}` })

    })
    setListajudete(judeteAll)

  }

  const sendData2 = () => {
    const header: OrderHeader = {
      OrderDate: new Date,
      Customer: name,
      Email: email,
      Phone: phonenumber,
      Remarks: remarks,
      TotalAmount: sumValueItem,
      OrderStatus: 'Plasata',
      ShippingAddress: (`Judet ${selectedCounty.judet}, Localitate ${selectedOras.localitate}, ${address}`),
      PaymentMethod: 'Ramburs',
      ShippingMethod: 'Curier'
    }

     axios.post('http://localhost:3000/orders', {header, orderDetails});

  }


  const setSelectedCounty = (value) => {
    setCounty(value)
    setcountyIsSelected(false)
    filterbycounty()
  }

  const filterbycounty = () => {

    type MyObject = {
      judet: string;
      localitate: string;
    };
    const myArray: MyObject[] = []

    judete.map(localitate => {
      for (let i = 0; i < localitate.localitati.length; i++) {
        // console.log(`"judet": "${localitate.nume}" , "localitate": "${localitate.localitati[i].nume}",`)
        myArray.push({ judet: `${localitate.nume}`, localitate: `${localitate.localitati[i].nume}` })
      }
      // console.log(myArray)
    })

    if (selectedCounty) {
      const filteredItems = myArray
        .filter(item => item.judet.includes(selectedCounty.judet))
      setListaorase(filteredItems)
    }
  }

  useEffect(() => {
    getJudete(),
      filterbycounty()
  }, [selectedCounty])


  return (
    <PrimeReactProvider>
      <Menu activatedIndex={1} />
      <Card>
        <div>
          Order address
          <div className="grid">
            <div className="col-2">
              <div className="text-center p-3 border-round-sm  font-bold">

              </div>
            </div>
            <div className="col-6">
              <div className="text-center p-3 border-round-sm  font-bold ">
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex-auto">
                    <label htmlFor="alphabetic" className="font-bold block mb-2">
                      Nume
                    </label>
                    <InputText value={name} onChange={(e) => setName(e.target.value)}
                      id="alphabetic" className="w-full" />
                  </div>
                  <div className="flex-auto">
                    <label htmlFor="email" className="font-bold block mb-2">
                      Email
                    </label>
                    <InputText value={email} onChange={(e) => setEmail(e.target.value)}
                      id="email" keyfilter="email" className="w-full" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex-auto">
                    <label htmlFor="pnum" className="font-bold block mb-2">
                      Judet
                    </label>
                    <Dropdown
                      value={selectedCounty}
                      onChange={(e) => {

                        setSelectedCounty(e.value)
                      }
                      }
                      options={listajudete}
                      optionLabel="judet"
                      editable
                      filter
                      placeholder="Select a County"
                      className="w-full md:w-44rem"
                    />
                  </div>
                  <div className="flex-auto">
                    <label htmlFor="pint" className="font-bold block mb-2">
                      Oras
                    </label>
                    <Dropdown
                      value={selectedOras}
                      onChange={(e) => setOras(e.value)}
                      options={listaorase}
                      optionLabel="localitate"
                      editable
                      filter
                      disabled={countyIsSelected}
                      placeholder="Select a City"
                      className="w-full md:w-44rem" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex-auto">
                    <label htmlFor="alphabetic" className="font-bold block mb-2">
                      Adresa
                    </label>
                    <InputText value={address} onChange={(e) => setAddress(e.target.value)}
                      id="alphabetic" className="w-full" />
                  </div>
                  <div className="flex-auto">
                    <label htmlFor="number" className="font-bold block mb-2">
                      Numar telefon
                    </label>
                    <InputText value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)}
                      id="number" keyfilter="num" className="w-full" />

                  </div>

                </div>
                <div className="flex flex-wrap gap-3 mb-4">

                  <div className="flex-auto">
                    <label htmlFor="email" className="font-bold block mb-2">
                      Alte observatii
                    </label>
                    <InputTextarea
                      value={remarks} onChange={(e) => setRemarks(e.target.value)}
                      className="w-full" rows={5} cols={30} />
                  </div>

                </div>
              </div>
            </div>
            <div className="col-2">
              <div className="text-center p-3 border-round-sm  font-bold "></div>
            </div>
          </div>
          <Button label="Submit" onClick={sendData2} />
        </div>
      </Card>
    </PrimeReactProvider>
  )
}

{/* <div className="card flex justify-content-center">
            <CascadeSelect value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={judete} 
                optionLabel="nume" optionGroupLabel="nume" optionGroupChildren={['localitati']}
                className="w-full md:w-14rem" 
                //breakpoint="767px" 
                placeholder="Select a City" style={{ minWidth: '14rem' }}  />
        </div> */}