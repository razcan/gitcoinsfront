"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';
import Menu from '../../../components/menu';
import OrderSteps from '../../../components/steps';
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
import '../../../css/style.css'

// import nodemailer from 'nodemailer';

//to do - pe butonul de submit trebuie trimis email, 
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
  const [clasaNume, setClasaNume] = useState("w-full");
  const [clasaNumeDropD, setNumeDropD] = useState("w-full md:w-44rem");

  

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

  const sendData2 = async () => {

    if (!name) {
      console.log('nu ai bagat numele')
      setClasaNume( "w-full p-invalid")
     //
    } else { setClasaNume( "w-full")}
    if (!email) {
      console.log('nu ai bagat email')
      setClasaNume( "w-full p-invalid")
     //
    }
    if (!phonenumber) {
      console.log('nu ai bagat tel')
      setClasaNume( "w-full p-invalid")
     //
    }
    if (!selectedCounty) {
      console.log('nu ai bagat judet')
      setNumeDropD("w-full md:w-44rem p-invalid");
     //
    }
    if (selectedOras == 'Selectati un oras') {
      console.log('nu ai bagat oras')
      setNumeDropD("w-full md:w-44rem p-invalid");
     //
    }
    if (!address) {
      console.log('nu ai bagat adresa')
      setClasaNume( "w-full p-invalid")
     //
    }



if(address && phonenumber && email && selectedCounty && selectedOras && address ) {

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

  try {
    const response =await axios.post('http://localhost:3000/orders', {header, orderDetails});

    // Handle the response as needed
    // console.log(response.data);
    localStorage.removeItem('YourOrder');
  } catch (error) {
    // Handle errors
    console.error('Error submitting :', error);
  }

router.push('/');
}

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
      <Menu activatedIndex={0} />
      <OrderSteps step={1}/>
      <Card className='container'>
        <div className='content'>
          Order address
          <div className="grid">
            <div className="col-2">
              <div className="text-center p-3 border-round-sm  font-bold">

              </div>
            </div>
            <div className="col-8">
              <div className="p-3 border-round-sm  font-bold ">
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex-auto">
                    <label htmlFor="alphabetic" className="font-bold block mb-2 ">
                      Nume
                    </label>
                    <InputText value={name} onChange={(e) => setName(e.target.value)}
                      id="alphabetic" className={clasaNume} />
                  </div>
                  <div className="flex-auto">
                    <label htmlFor="email" className="font-bold block mb-2">
                      Email
                    </label>
                    <InputText value={email} onChange={(e) => setEmail(e.target.value)}
                      id="email" keyfilter="email" className={clasaNume} />
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
                      className={clasaNumeDropD}
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
                      className={clasaNumeDropD} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex-auto">
                    <label htmlFor="alphabetic" className="font-bold block mb-2">
                      Adresa
                    </label>
                    <InputText value={address} onChange={(e) => setAddress(e.target.value)}
                      id="alphabetic" className={clasaNume} />
                  </div>
                  <div className="flex-auto">
                    <label htmlFor="number" className="font-bold block mb-2">
                      Numar telefon
                    </label>
                    <InputText value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)}
                      id="number" keyfilter="num" className={clasaNume} />

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
                <div className="gap-3 mb-4">
                   <div >
                        <Button label="PLACE ORDER" onClick={sendData2} className="w-2 right-0"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2">
              <div className="text-center p-3 border-round-sm  font-bold  "></div>
            </div>
          </div>
          
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
