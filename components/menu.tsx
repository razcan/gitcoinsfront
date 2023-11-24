"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { useRouter } from 'next/navigation'
import '../css/style.css';

export default function Menu(props) {
  const router = useRouter();
  const [activeMenuIndex, setMenuIndex] = useState(props.activatedIndex);
  const items = [
    { label: 'Home', icon: 'pi pi-fw pi-home' },
    { label: 'News', icon: 'pi pi-fw pi-bitcoin' },
    { label: 'Lots', icon: 'pi pi-fw pi-list' },
    { label: 'Conditions', icon: 'pi pi-fw pi-list' },
    { label: 'Contact', icon: 'pi pi-fw pi-user' },
    { label: 'Admin', icon: 'pi pi-fw pi-cog' },
  ];

// setMenuIndex(activeIndex); 
 return (
    <PrimeReactProvider >

      <div className="sticky min-w-full border-round bg-white font-bold flex align-items-start "
      // className="sticky"
      >
        <TabMenu 
        className ="text-3xl w-12"
        model={items} activeIndex={activeMenuIndex} 
        onTabChange={(e) => {
          setMenuIndex(activeMenuIndex)
          switch(e.index){
            case 5: 
              router.push('/admin');
              
              break;
            case 4: 
              router.push('/contact');
              
              break;
            case 3: 
              router.push('/conditions');
             
              break;
            case 2: 
              router.push('/lots');
              
              break;
            case 1: 
              router.push('/news');
              
              break;
            case 0: 
              router.push('/');
              
              break;           
          }
        }
          } />
      </div>
    </PrimeReactProvider>
  )
}
