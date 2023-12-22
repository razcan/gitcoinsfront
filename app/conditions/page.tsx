"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/menu_ini';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useRouter } from 'next/navigation'

export default function Admin() {

    const router = useRouter()

 
  return (
    <PrimeReactProvider>

      <Menu activatedIndex={3} />
      <div>
          Conditions page
      </div>
      
    </PrimeReactProvider>

  )
}