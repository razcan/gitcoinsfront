"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';
import  Menu  from '../../components/menu';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';




export default function Order() {



  
  return (
    <PrimeReactProvider>
   <Menu activatedIndex={1} />
      <div className="card flex flex-wrap gap-3 p-fluid">
        <div className="flex-auto">
        News page
</div>
</div>
   
    </PrimeReactProvider>
  )
}




