"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/menu_ini';
import { useRouter } from 'next/navigation'
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { DataScroller } from 'primereact/datascroller';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { InputNumber } from 'primereact/inputnumber';
import { number } from 'prop-types';
import '../../css/style.css'
import { usePathname, useSearchParams } from 'next/navigation'
import OrderSteps from  '../../components/steps'

export default function Order() {

  const pathname = usePathname()
  const searchParams = useSearchParams()


  const [retrievedObject, setRetrievedObject] = useState<any>([]);
  const [itemToBeRemoved, setItemToBeRemoved] = useState<any>([]);
  const [menuIndex, setMenuIndex] = useState<any>(0);

  const [sumQttyItem, setSumQttyItem] = useState<any>(0);
  const [sumValueItem, setValueItem] = useState<any>(0);

  const [dataFetched, setDataFetched] = useState<any>(false);


  useEffect(() => {
    const getValues =  () => {
      const localstorage:any = localStorage.getItem('YourOrder')
      setRetrievedObject(JSON.parse(localstorage))
      setDataFetched(true)
    }

    getValues();
    summaryOrder();
      
  }, [dataFetched])

  const summaryOrder =  () => {
    if (dataFetched) {
      const initialValue = 0;
      const sumQttyWithInitial =  retrievedObject.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue.Qtty,
        initialValue,
      )
  
      const sumValueWithInitial =  retrievedObject.reduce(
        (accumulator: any, currentValue:any) => accumulator + (currentValue.Qtty * currentValue.Price),
        initialValue,
      )
  
      setSumQttyItem(sumQttyWithInitial)
      setValueItem(sumValueWithInitial)

    }
  };
  
  const setNewQtty = (e:any, data:any) => {

    const elementToUpdate = data;
    elementToUpdate.Qtty = e;
    elementToUpdate.Amount = elementToUpdate.Qtty * elementToUpdate.Price;
    // console.log('q modif',elementToUpdate)
    const indexToUpdate = retrievedObject.indexOf(data);

    if (indexToUpdate !== -1) {
      // retrievedObject.splice(indexToUpdate, 1);
      retrievedObject[indexToUpdate] = elementToUpdate;
      // Convert the updated array to a string and store it back in localStorage
      localStorage.setItem("YourOrder", JSON.stringify(retrievedObject));
      const loco: any = localStorage.getItem('YourOrder');
      const localstorage: any = JSON.parse(loco)
      setRetrievedObject(localstorage)
      summaryOrder()
    }

  }

  const elementToRemove = itemToBeRemoved;
  const indexToRemove = retrievedObject.indexOf(elementToRemove);
  if (indexToRemove !== -1) {
    retrievedObject.splice(indexToRemove, 1);
    // Convert the updated array to a string and store it back in localStorage
    localStorage.setItem("YourOrder", JSON.stringify(retrievedObject));
    summaryOrder()
    setMenuIndex((prevKey: any) => prevKey + 1);
  }


  const router = useRouter()


  const itemTemplate = (data: any) => {
    return (
      <Card >
        <div className=" grid">
          <div className="col-12  ">
            <div className="flex flex-column xl:flex-row xl:align-items-start gap-4 ">
              <img src={`http://localhost:3000/coins/download/${data.Photo1}`} alt={data.Photo1} style={{ width: '140px', padding: '10px' }} />
              <img src={`http://localhost:3000/coins/download/${data.Photo2}`} alt={data.Photo2} style={{ width: '140px', padding: '10px' }} />
              <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                <div className="flex flex-column align-items-center lg:align-items-start gap-3 ">
                  <div className="flex flex-column gap-1">
                    <div className=" text-indigo-600 text-2xl w-16rem h-1rem font-bold" > Name
                      <span className="text-xl text-orange-500 font-semibold"> {data.Name}</span>
                    </div>
                    <div className=" text-indigo-600 text-2xl w-16rem h-1rem"> Catalog: {data.Catalog}</div>
                    <div className=" text-indigo-600 text-2xl w-16rem h-1rem"> Composition: {data.Composition}</div>
                    <div className=" text-indigo-600 text-2xl w-16rem h-1rem"> Country: {data.Country}</div>
                    <div className=" text-indigo-600 text-2xl w-16rem h-1rem"> Price: {data.Price}</div>
                    <div className=" text-indigo-600 text-2xl w-16rem h-1rem"> Status: {data.Status}</div>
                    <div className=" text-indigo-600 text-2xl w-16rem h-1rem"> Name: {data.Name}</div>
                    <div className=" text-indigo-600 text-2xl w-16rem h-1rem"> Id: {data.id}</div>
                  </div>
                  <div className="flex flex-column gap-2">
                    <span className="flex align-items-center gap-2 text-indigo-600 text-2xl ">
                      Qtty: <InputNumber inputId="minmax-buttons" value={data.Qtty}
                        onValueChange={(e:any) => setNewQtty(e.value, data)} mode="decimal"
                        min={0} max={1000} />

                    </span>

                  </div>
                </div>
                <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
                  <span className="text-4xl text-orange-500 font-semibold">
                    Value:
                    {/* {data.Amount ===null ? (data.Price * data.Qtty) : data.Amount} */}
                    {data.Price * data.Qtty}
                  </span>

                  <div className="flex-auto">
                    <label htmlFor="minmax-buttons" className="font-bold block mb-2">Year</label>
                  </div>

                  <Tag value={data.Year}></Tag>
                  <Button icon="pi pi-times" rounded text raised severity="danger"
                    aria-label="Cancel"
                    onClick={() => setItemToBeRemoved(data)}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </Card>

    );
  };



  const goToAddress = () => {
    router.push('/order/address' + '?' + `sumQttyItem=${sumQttyItem}`+'&'+`sumValueItem=${sumValueItem}`)
  }


  const OrderedItems = () => {

    return (
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <DataScroller value={retrievedObject} itemTemplate={itemTemplate}
              rows={50} buffer={0.5} />
          </div>
        </div>


      </div>


    )
  };

  return (
    <PrimeReactProvider>
      <div className="container ">
      <div key={menuIndex} >
             <Menu activatedIndex={0} />
            
            </div>
            <div className='pt-8'>
                <OrderSteps step={0}/>
            </div>
            
         <div className="content grid ">

          <div className="col-2">
            <div className="p-3 border-round-sm "></div>
          </div>

          <div className="col-8">
            <div className="p-3 border-round-sm ">
              <OrderedItems />
            </div>
          </div>

          <div className=" pt-5 col-2"  >
            <div className=" top-8  border-round-sm " >
              <div className="sticky-down" >
                {/* <div>Summary </div>
                <div>Sum of QTTY  {sumQttyItem}</div>
                <div>Sum of Value {sumValueItem}</div> */}
                <Button label="Continue" icon="pi pi-check" onClick={goToAddress} />
              </div>
            </div>
          </div>

          </div>
      </div>
    </PrimeReactProvider>

  )
}