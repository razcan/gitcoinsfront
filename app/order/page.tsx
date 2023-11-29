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

export default function Order() {
    const [retrievedObject, setRetrievedObject] = useState([{"Code": "UN"}]);
    

    const router = useRouter()

    useEffect(() => {
        setRetrievedObject(JSON.parse(localStorage.getItem('YourOrder')))
      }, [])


    const OrderedItems = () => {

        return (
            <div>
                    <DataTable value={retrievedObject} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="Catalog" header="Catalog"></Column>
                        <Column field="Code" header="Code"></Column>
                        <Column field="Composition" header="Composition"></Column>
                        <Column field="Country" header="Country"></Column>
                        <Column field="Name" header="Name"></Column>
                        <Column field="Price" header="Price"></Column>
                        <Column field="Qtty" header="Qtty"></Column>
                        <Column field="Status" header="Status"></Column>
                        <Column field="Photo1" header="Photo1"></Column>
                        <Column field="Photo2" header="Photo2"></Column>
                    </DataTable>
                    <Button label="Place Order" />
            </div>
        
        )
    };

  return (
    <PrimeReactProvider>

      <Menu activatedIndex={0} />
      <div>
          Order page
    <OrderedItems />
  
</div>
    </PrimeReactProvider>

  )
}