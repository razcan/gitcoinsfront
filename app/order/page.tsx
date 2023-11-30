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


export default function Order() {
  const [retrievedObject, setRetrievedObject] = useState([]);
  const [itemToBeRemoved, setItemToBeRemoved] = useState([]);
  const [newQtty, setNewQtty] = useState(retrievedObject.Qtty);

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
      <div className="col-12 border-1 border-blue-300">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <img src={`http://localhost:3000/coins/download/${data.Photo1}`} alt={data.Photo1} style={{ width: '10%', padding: '10px' }} />
          <img src={`http://localhost:3000/coins/download/${data.Photo2}`} alt={data.Photo2} style={{ width: '10%', padding: '10px' }} />
          <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
            <div className="flex flex-column align-items-center lg:align-items-start gap-3">
              <div className="flex flex-column gap-1">
              <div className=" text-indigo-600 text-2xl w-16rem h-1rem"> Name: {data.Name}</div>
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
                  onValueChange={(e) => setNewQtty(e.value)} mode="decimal" 
                  showButtons min={0} max={1000} />
                  {newQtty}
                </span>
                
              </div>
            </div>
            <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
              <span className="text-4xl text-orange-500 font-semibold"> Value: {data.Price * data.Qtty}</span>

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
    );
  };

  useEffect(() => {
    setRetrievedObject(JSON.parse(localStorage.getItem('YourOrder')))
  }, [])

  const OrderedItems = () => {

    return (
      <div className="card ">
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