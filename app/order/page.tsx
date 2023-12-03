"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/menu';
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


export default function Order() {
  const [retrievedObject, setRetrievedObject] = useState([]);
  const [itemToBeRemoved, setItemToBeRemoved] = useState([]);


const setNewQtty = (e,data) => {

  const elementToUpdate = data;
  elementToUpdate.Qtty =e;
  elementToUpdate.Amount =elementToUpdate.Qtty * elementToUpdate.Price;
  // console.log('q modif',elementToUpdate)
  const indexToUpdate = retrievedObject.indexOf(data);

    if (indexToUpdate !== -1) {
    // retrievedObject.splice(indexToUpdate, 1);
    retrievedObject[indexToUpdate]= elementToUpdate;
      // Convert the updated array to a string and store it back in localStorage
    localStorage.setItem("YourOrder", JSON.stringify(retrievedObject));
    console.log('obj',retrievedObject)
    setRetrievedObject(JSON.parse(localStorage.getItem('YourOrder')))
}

}

var elementToRemove = itemToBeRemoved;
var indexToRemove = retrievedObject.indexOf(elementToRemove);
if (indexToRemove !== -1) {
  retrievedObject.splice(indexToRemove, 1);
   // Convert the updated array to a string and store it back in localStorage
  localStorage.setItem("YourOrder", JSON.stringify(retrievedObject));
}


  const router = useRouter()


  const itemTemplate = (data) => {
    return (
      <div className="grid">
            <div className="col-2">
        <div className="text-center p-3 border-round-sm "></div>
    </div>
      <div className="col-8 border-1 border-blue-300 overflow-auto surface-overlay ">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4 ">
          <img src={`http://localhost:3000/coins/download/${data.Photo1}`} alt={data.Photo1} style={{ width: '100px', padding: '10px' }} />
          <img src={`http://localhost:3000/coins/download/${data.Photo2}`} alt={data.Photo2} style={{ width: '100px', padding: '10px' }} />
          <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
            <div className="flex flex-column align-items-center lg:align-items-start gap-3 ">
              <div className="flex flex-column gap-1">
              <div className=" text-indigo-600 text-2xl w-16rem h-1rem"> Name: 
                   <span className="text-xl text-orange-500 font-semibold"> {data.Name}</span>
              </div>
              <div className=" text-indigo-600 text-2xl w-16rem h-1rem"> Catalog: {data.Catalog}</div>
              <div className=" text-indigo-600 text-2xl w-16rem h-1rem"> Composition: {data.Composition}</div>
              <div className=" text-indigo-600 text-2xl w-16rem h-1rem"> Country: {data.Country}</div>
              <div className=" text-indigo-600 text-2xl w-16rem h-1rem"> Price: {data.Price}</div>              
              <div className=" text-indigo-600 text-2xl w-16rem h-1rem"> Status: {data.Status}</div>
              <div className=" text-indigo-600 text-2xl w-16rem h-1rem"> Name: {data.Name}</div>
              <div className=" text-indigo-600 text-2xl w-16rem h-1rem"> Id: {data.Id}</div>
              </div>
              <div className="flex flex-column gap-2">
                <span className="flex align-items-center gap-2 text-indigo-600 text-2xl ">
                  Qtty: <InputNumber inputId="minmax-buttons" value={data.Qtty} 
                  onValueChange={(e) => setNewQtty(e.value,data)} mode="decimal" 
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
    );
  };

  useEffect(() => {
    setRetrievedObject(JSON.parse(localStorage.getItem('YourOrder')))

  }, [])

  const OrderedItems = () => {

    return (
      <div className="card max-h-full">
        <DataScroller value={retrievedObject} itemTemplate={itemTemplate} 
        rows={4} buffer={0.4} />
      </div>


    )
  };

  return (
    <PrimeReactProvider>
      <Menu activatedIndex={0} />
      <div>
        
        <OrderedItems />
        <Button label="Place order" icon="pi pi-check"   />
     

      </div>
    </PrimeReactProvider>

  )
}