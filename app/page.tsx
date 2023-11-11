"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';
import Menu from '../components/menu'
import Item from '../components/item'
import Filters from '../components/filters'
import Exchange from '../components/exchange'
import { Paginator } from 'primereact/paginator';

export default function Home() {

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event) => {
      setFirst(event.first);
      setRows(event.rows);
  };

  return (

    <PrimeReactProvider>
   
      <Menu />
      <Exchange />
      <div className="grid">
        <div className="col-12 lg:col-3 px-2 lg:px-5">
        <Filters />
        </div>
        <div className="col-12 lg:col-6 px-2 lg:px-5" style={{height:'80vh'}}>
          <Item />
          <Paginator className="flex align-items-center justify-content-center" style={{paddingTop:'3px', width: '157%',backgroundColor: '#FAFAFA'}}   
          first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
          {/* <div  className="flex align-items-right justify-content-right">
            <Paginator first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
        </div> */}
        </div>
        <div className="col-12 lg:col-3 px-2 lg:px-5">

        </div>

      </div>

    </PrimeReactProvider>
  )
}

