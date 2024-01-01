"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';
import Menu from '../components/menu_ini'
import Item from '../components/item'
import Filters from '../components/filters'
import Exchange from '../components/exchange'
import MapWorld from '../components/worldmap'
import { Card } from 'primereact/card';
import  '../css/style.css'
import Footer from '@/components/footer';

export default function Home() {

  return (
<PrimeReactProvider 
// style={{height: "90%"}}
>
<Menu activatedIndex={0} />
<Card className='container' >

    {/* <Exchange />  */}
   <div className="content grid pt-6">
   <div className="lg:col-1  xs:col-0">
     {/* <Filters /> */}
   </div>
       <div className="lg:col-10 xs: col-12">
         <MapWorld />
       </div>   
       <div className="lg:col-2  xs:col-1"></div>   
   </div>
 </Card>
<Footer />
 </PrimeReactProvider> 

  )
}