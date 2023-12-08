"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';
import Menu from '../../../components/menu';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { usePathname, useSearchParams } from 'next/navigation'
import '../../../css/style.css'

export default function ClientOrder() {
  const [order, setOrder] = useState([]);
  const [date, setOrderDate] = useState([]);
  const searchParams = useSearchParams()
  const uuid2 = searchParams.get("uuid");

  const fetchClientOrder = () => {
    fetch(`http://localhost:3000/orders/client/${uuid2}`)
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

  const itemTemplate = (data) => {
    return (
      <Card >
        <div className="grid ">
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
                    <div className="field col text-indigo-600 text-2xl w-16rem h-1rem"> Catalog: {data.Code}</div>
                    <Divider />
                    <div className="field col text-indigo-600 text-2xl w-16rem h-1rem"> Price: {data.UnitPrice}</div>
                    <Divider />
                    <div className="field col text-indigo-600 text-2xl w-16rem h-1rem"> Quantity: {data.Quantity}</div>
                    <Divider />
                    <div className="field col text-indigo-600 text-2xl w-16rem h-1rem"> Status: {data.Status}</div>
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
              rows={200} buffer={0.5} />
          </div>
        </div>
      </div>
    )
  };


  return (
    <PrimeReactProvider>
<div className="container">
      <div className="overflow-scroll surface-overlay">
        <Menu activatedIndex={1} />
        <div>

          {order.length > 0 ?
            <Card title="Comanda" className="sticky  border-primary-500 border-1 border-round">
              <div className="formgrid grid " >
                <div className="field col">
                  <label htmlFor="OrderDate">OrderDate</label>
                  <InputText id="OrderDate" value={order[0].OrderDate} disabled />
                </div>
                <div className="field col">
                  <label htmlFor="Customer">Customer</label>
                  <InputText id="Customer" value={order[0].Customer} disabled />
                </div>
                <div className="field col">
                  <label htmlFor="TotalAmount">TotalAmount</label>
                  <InputText id="TotalAmount" value={order[0].TotalAmount} disabled />
                </div>
                <div className="field col">
                  <label htmlFor="OrderStatus">OrderStatus</label>
                  <InputText id="OrderStatus" value={order[0].OrderStatus} disabled />
                </div>
                <div className="field col">
                  <label htmlFor="ShippingAddress">ShippingAddress</label>
                  <InputText id="ShippingAddress" value={order[0].ShippingAddress} disabled />
                </div>
              </div>

            </Card>
            : null}

          <OrderedItems />
        </div>
        </div>
      </div>
    </PrimeReactProvider>
  )
}



