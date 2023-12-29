"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import Menu from '../../components/menu_ini'


export default function ClientOrder() {
  const [order, setOrder] = useState<any>();
  const [date, setOrderDate] = useState<any>();
  const uuid = "89a0dd01-c7c6-49e8-a11a-e14ecfff33d7"
  

  const fetchClientOrder = () => {
    fetch(`http://localhost:3000/orders/client/${uuid}`)
        .then(response => {
            return response.json()
        })
        .then(order => {
          setOrder(order)
        })
}

useEffect(() => {
  fetchClientOrder()
}, [])

const itemTemplate = (data:any) => {
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
                  <Divider />
                  <div className=" text-indigo-600 text-2xl w-16rem h-1rem"> Catalog: {data.Code}</div>
                  <Divider />
                  <div className=" text-indigo-600 text-2xl w-16rem h-1rem"> Price: {data.UnitPrice}</div>
                  <Divider />
                  <div className=" text-indigo-600 text-2xl w-16rem h-1rem"> Quantity: {data.Quantity}</div>              
                  <Divider />    
                  <div className=" text-indigo-600 text-2xl w-16rem h-1rem"> Status: {data.Status}</div>
                  <Divider />
                </div>
                <div className="flex flex-column gap-2">
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Card>

  );
};


const OrderedItems = () => {

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <DataScroller value={order} itemTemplate={itemTemplate}
            rows={50} buffer={0.5} />
        </div>
      </div>
    </div>
  )
};

  
  return (
    <PrimeReactProvider>
   <Menu activatedIndex={1} />
      <div>

{order ?
<Card title="Comanda">

<div className="flex flex-column gap-2" style={{width: "30%"}}>
    <label htmlFor="OrderDate">OrderDate</label>
    <InputText id="OrderDate" value={order[0].OrderDate} disabled/>

    <label htmlFor="Customer">Customer</label>
    <InputText id="Customer" value={order[0].Customer} disabled/>

    <label htmlFor="TotalAmount">TotalAmount</label>
    <InputText id="TotalAmount" value={order[0].TotalAmount} disabled/>

    <label htmlFor="OrderStatus">OrderStatus</label>
    <InputText id="OrderStatus" value={order[0].OrderStatus} disabled/>

    <label htmlFor="ShippingAddress">ShippingAddress</label>
    <InputText id="ShippingAddress" value={order[0].ShippingAddress} disabled/>
</div>
 
</Card>
:null}
        <div className="col-8">
            <div className="p-3 border-round-sm ">
           
              <OrderedItems />
            </div>
          </div>
      </div>
    </PrimeReactProvider>
  )
}



