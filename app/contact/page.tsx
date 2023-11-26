"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/menu';
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

import ReactDOM from 'react-dom';
import WorldMap from 'react-world-map';
import "./styles_map.css"

function YourMainComponent() {
  const [selected, onSelect] = useState(null);

console.log(selected);
  return (
    <>
      <WorldMap selected={ selected } onSelect={ onSelect } />
    </>
  );
}


export default function Contact() {

    const router = useRouter()

 
  return (
    <PrimeReactProvider>

      <Menu activatedIndex={4} />
      <div>
          Contact page
          <YourMainComponent />
</div>
    </PrimeReactProvider>

  )
}