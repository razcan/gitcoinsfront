"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'
import ReactDOM from 'react-dom';
import WorldMap from 'react-world-map';
import "./styles_map.css"

//https://github.com/heatherbooker/react-world-map/blob/main/docs/index.jsx


function MapWorldContinent() {
  const [selected, onSelect] = useState(null);
  return (
    
      <WorldMap
                multiple={ true }
                selected={ selected } onSelect={ onSelect } />
    
  );
}

export default function MapWorld() {

    const router = useRouter()

 
  return (
    
    <div className="min-h-full">
            <MapWorldContinent />
    </div>
        

    
  )
}

// style= {{
//     min-height:100%
//     float:left
//     width:100px
//     padding-bottom:10000px
//     margin-bottom:-10000px
// }}