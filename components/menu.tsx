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

export default function Menu() {

  const router = useRouter();
  const [activeMenuIndex, setMenuIndex] = useState(0);
  const items = [
    { label: 'Home', icon: 'pi pi-fw pi-home' },
    { label: 'Coins', icon: 'pi pi-fw pi-bitcoin' },
    { label: 'Order', icon: 'pi pi-fw pi-list' },
    { label: 'About', icon: 'pi pi-fw pi-user' },
    { label: 'Admin', icon: 'pi pi-fw pi-cog' }
  ];
 
 return (
    <PrimeReactProvider >

      <div className="sticky">
        <TabMenu model={items} activeIndex={activeMenuIndex} 
        onTabChange={(e) => {
          setMenuIndex(e.index)
          switch(e.index){
            case 4: 
              router.push('/admin');
              break;
            case 2: 
              router.push('/order');
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
