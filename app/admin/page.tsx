"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/menu';
import { FileUpload } from 'primereact/fileupload';
import { Dropdown } from 'primereact/dropdown';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import countries_all from "../../css/country.json";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useMountEffect } from 'primereact/hooks';
import { Messages } from 'primereact/messages';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { OrderList } from 'primereact/orderlist';

export default function Admin() {
  const prefix_api = 'http://localhost:3000/coins/download/';
  const [products, setProducts] = useState([]);
  const countries = countries_all;


  const itemTemplate = (item) => {
    return (
        <div className="flex align-items-center">
        <div className={`fi fi-${item.Code}`} style={{ width: "30px" }}>
          <div style={{ paddingLeft: "40px" }}>
          {item.Country}
          </div>
        </div>
        </div>

    );
};

// type FilterFunction<T> = (element: T) => boolean;

// function filterArray<T>(arr: T[], predicate: FilterFunction<T>): T[] {
//   return arr.filter(predicate);
// }

  const fetchCoinData = () => {
    fetch("http://localhost:3000/coins")
        .then(response => {
            return response.json()
        })
        .then(coins => {
            setProducts(coins)
        })
}

useEffect(() => {
     fetchCoinData()
}, [])
 
  return (
    <PrimeReactProvider>

      <Menu activatedIndex={4} />
      <div>Admin Page</div>

      <div className="card">
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                <Column field="Name" header="Name"></Column>
                <Column field="Continent" header="Continent"></Column>
                <Column field="Country" header="Country"></Column>
                <Column field="Status" header="Status"></Column>
                <Column header="Flag" body={itemTemplate}></Column>
            </DataTable>
        </div>
  
      
    </PrimeReactProvider>

  )
}