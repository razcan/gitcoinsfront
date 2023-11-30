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
  const [retrievedObject, setRetrievedObject] = useState([{ "Code": "UN" }]);
  const [newQtty, setNewQtty] = useState(0);

  const header = (
    <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />

  );
  const footer = (
    <>
      <Button label="Edit" icon="pi pi-check" />
      <Button label="Delete" severity="danger" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
    </>
  );


  const router = useRouter()



  // const CardOrderedItems = () => {
  //   return (
  //  <div>
  //               {retrievedObject.map(item => 
  //               <Card key = {item.Code} title={item.Name} subTitle={item.Catalog} footer={footer}  className="md:w-55rem">
  //                 <p className="m-0">
  //                   {/* <img src={`http://localhost:3000/coins/download/${item.Photo1}`} 
  //                     alt={item.Photo1} style={{ width: '5%', padding: '10px' }} />
  //                     <img src={`http://localhost:3000/coins/download/${item.Photo2}`} 
  //                     alt={item.Photo2} style={{ width: '5%', padding: '10px' }} />   */}
  //                     {item.Catalog}
  //                     <Divider />
  //                     {item.Country}
  //                     <Divider />
  //                     {item.Code}
  //                     <Divider />
  //                     {item.Qtty}
  //                     <Divider />
  //                     {item.Price}
  //                     <Divider />
  //                     {item.Status}
  //                     <Divider />
  //                 </p>
  //             </Card>)}
  //             <Button label="Place Order" />
  //       </div>
  // )}

  const itemTemplate = (data) => {
    return (
      <div className="col-12 border-1 border-blue-300">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <img src={`http://localhost:3000/coins/download/${data.Photo1}`} alt={data.Photo1} style={{ width: '8%', padding: '10px' }} />
          <img src={`http://localhost:3000/coins/download/${data.Photo2}`} alt={data.Photo2} style={{ width: '8%', padding: '10px' }} />
          <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
            <div className="flex flex-column align-items-center lg:align-items-start gap-3">
              <div className="flex flex-column gap-1">
                <div className="text-2xl font-bold text-900">Composition: {data.Name}</div>
                <div className="text-2xl font-bold text-900"> Catalog: {data.Catalog}</div>
                <div className="text-2xl font-bold text-900">Composition: {data.Composition}</div>
                <div className="text-2xl font-bold text-900">Composition: {data.Country}</div>
                <div className="text-2xl font-bold text-900">Composition: {data.Price}</div>
                <div className="text-2xl font-bold text-900">Composition: {data.Status}</div>
              </div>
              <div className="flex flex-column gap-2">
                <span className="flex align-items-center gap-2 text-2xl font-bold text-900">
                  Qtty: <InputNumber inputId="minmax-buttons" value={data.Qtty} onValueChange={(e) => setNewQtty(e.value)} mode="decimal" showButtons min={0} max={1000} />
                </span>
              </div>
            </div>
            <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
              <span className="text-4xl font-semibold"> Value: {data.Price * data.Qtty}</span>

              <div className="flex-auto">
                <label htmlFor="minmax-buttons" className="font-bold block mb-2">Year</label>

                {/* <InputNumber value={data.Qtty} onValueChange={(e) => setNewQtty(e.value)} showButtons buttonLayout="vertical" style={{ width: '4rem' }} 
                    decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" /> */}
              </div>

              <Tag value={data.Year}></Tag>
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
        <DataScroller value={retrievedObject} itemTemplate={itemTemplate} rows={5} buffer={0.4} header="List of ordered items" />
      </div>


    )
  };

  return (
    <PrimeReactProvider>
      <Menu activatedIndex={0} />
      <div>

        <OrderedItems />

      </div>
    </PrimeReactProvider>

  )
}