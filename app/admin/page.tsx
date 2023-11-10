"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';
import  Menu  from '../../components/menu';

export default function Admin() {

  return (
    <PrimeReactProvider>
     <Menu />
    
    <div>
      Admin Page
    </div>

    </PrimeReactProvider>

  )
}

