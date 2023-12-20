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
import MapWorld from '../components/worldmap'
import { Card } from 'primereact/card';
import  '../css/style.css'
import Footer from '@/components/footer';

export default function Home() {

  return (
<PrimeReactProvider style={{height: "80%"}}>
<Menu activatedIndex={0} />
<Card className='container'>
   {/* <Exchange /> */}
   <div className="content grid pt-8">
   <div className="col-12 lg:col-2  ">
     {/* <Filters /> */}
     </div>
       <div className="col-12 lg:col-12">
         <MapWorld />
       </div>      
   </div>
 </Card>
<Footer />
 </PrimeReactProvider> 

  )
}


