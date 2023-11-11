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

export default function Home() {

  return (

    <PrimeReactProvider>
   
      <Menu />
      <Exchange />
      <div className="grid">
        <div className="col-12 lg:col-3 px-2 lg:px-5">
        <Filters />
        </div>
        <div className="col-12 lg:col-6 px-2 lg:px-5">
          <Item />
        </div>
        <div className="col-12 lg:col-3 px-2 lg:px-5">

        </div>
      </div>

    </PrimeReactProvider>
  )
}

