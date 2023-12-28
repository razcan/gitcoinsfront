"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect,useRef } from 'react';
import Menu from '../../../components/menu_ini';
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
import { Toast } from 'primereact/toast';


export default function Address() {

  const toast = useRef(null);

  const showSuccess = () => {
      // toast.current.show({severity:'success', summary: 'Order saved succesfully', life: 3000});
  }

  const showError = (message) => {
    // toast.current.show({severity:'warn', summary: message, life: 3000});
}

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sumQttyItem = searchParams.get("sumQttyItem");
  const sumValueItem = searchParams.get("sumValueItem");
  const [menuIndex, setMenuIndex] = useState(0);

  // console.log(sumQttyItem,sumValueItem)
  const router = useRouter();
  // const { sumQttyItem, sumValueItem } = router.query;
  // console.log('xxy',sumQttyItem, sumValueItem)

  const [selectedCounty, setCounty] = useState(null);
  const [selectedOras, setOras] = useState('Selectati un oras');
  const [countyIsSelected, setcountyIsSelected] = useState(true);
  const [listajudete, setListajudete] = useState(null);
  const [listaorase, setListaorase] = useState(null);
  const [clasaName, setClasaName] = useState("w-full");
  const [clasaEmail, setClasaEmail] = useState("w-full");
  const [clasaAddress, setClasaAddress] = useState("w-full");
  const [clasaPhone, setClasaPhone] = useState("w-full");
  const [clasaNumeDropD, setNumeDropD] = useState("w-full md:w-44rem");
  const [clasaNumeDropCity, setNumeDropCity] = useState("w-full md:w-44rem");
  

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
  const [message, setMessage] = useState([]);

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
      showError('Please enter name')
      setClasaName( "w-full p-invalid")
     //
    }

    if (!email) {

      showError('Please enter email')
      setClasaEmail( "w-full p-invalid")
     //
    }
    if (!phonenumber) {
   
      showError('Please enter phone')
      setClasaPhone( "w-full p-invalid")
     //
    }
    if (!selectedCounty) {

      showError('Please enter county')
      setNumeDropD("w-full md:w-44rem p-invalid");
     //
    }
    if (selectedOras == 'Selectati un oras') {
      showError('Please enter city')
      setNumeDropCity("w-full md:w-44rem p-invalid");
     //
    }
    if (!address) {
      showError('Please enter address')
      setClasaAddress( "w-full p-invalid")
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
    showSuccess();
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


      <Card className='container' >
      <div className='pt-4'>
                <OrderSteps step={1}/>
            </div>
      <Toast className='pt-8' ref={toast} />
        <div className='content pt-4'>
          <div className="grid">
            <div className="col-2">
              <div className="text-center p-1 border-round-sm  font-bold">
              </div>
            </div>
            <div className="col-8">
              <div className="p-0 border-round-sm  font-bold ">
                <div className="flex flex-wrap gap-3 mb-5">
                  <div className="flex-auto">
                    <label htmlFor="alphabetic" className="font-bold block mb-2 ">
                      Nume
                    </label>
                    <InputText   value={name} onChange={(e) => {setName(e.target.value);  setClasaName( "w-full") }}
                      id="alphabetic" className={clasaName} />
                  </div>
                  <div className="flex-auto">
                    <label htmlFor="email" className="font-bold block mb-2">
                      Email
                    </label>
                    <InputText value={email} onChange={(e) => {setEmail(e.target.value); setClasaEmail( "w-full") }}
                      id="email" keyfilter="email" className={clasaEmail} />
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
                        setNumeDropD("w-full md:w-44rem")
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
                      onChange={(e) => {setOras(e.value); setNumeDropCity("w-full md:w-44rem") }}
                      options={listaorase}
                      optionLabel="localitate"
                      editable
                      filter
                      disabled={countyIsSelected}
                      placeholder="Select a City"
                      className={clasaNumeDropCity} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex-auto">
                    <label htmlFor="alphabetic" className="font-bold block mb-2">
                      Adresa
                    </label>
                    <InputText value={address} onChange={(e) => {setAddress(e.target.value); setClasaAddress( "w-full")}}
                      id="alphabetic" className={clasaAddress} />
                  </div>
                  <div className="flex-auto">
                    <label htmlFor="number" className="font-bold block mb-2">
                      Numar telefon
                    </label>
                    <InputText value={phonenumber} onChange={(e) => {setPhonenumber(e.target.value); setClasaPhone("w-full")}}
                      id="number" keyfilter="num" className={clasaPhone} />

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
          
                </div>
              </div>
            </div>
            <div className=" pt-5 col-2"  >
            <div className=" border-round-sm " >
             
                <Button label="Continue" icon="pi pi-check" onClick={sendData2} />
          
            </div>
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
