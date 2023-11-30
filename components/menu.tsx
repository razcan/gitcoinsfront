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
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';

export default function Menu(props) {
  const router = useRouter();
  const [activeMenuIndex, setMenuIndex] = useState(props.activatedIndex);
  const [itemCount, setItemCount] = useState(0);

  const items = [
    { label: 'Home', icon: 'pi pi-fw pi-home' },
    { label: 'News', icon: 'pi pi-fw pi-bitcoin' },
    { label: 'Lots', icon: 'pi pi-fw pi-list' },
    { label: 'Conditions', icon: 'pi pi-fw pi-list' },
    { label: 'Contact', icon: 'pi pi-fw pi-user' },
    { label: 'Admin', icon: 'pi pi-fw pi-cog' },
  ];

  const checkOrderedItem = () => {

    var existingData = localStorage.getItem("YourOrder");

    // Parse existing data (if any)
    var existingArray = existingData ? JSON.parse(existingData) : [];

    const itemCount = existingArray.length;
    setItemCount(itemCount);

  }

 const goToOrder = () => {
  router.push('/order');
 }

  useEffect(() => {
    checkOrderedItem()
}, [])

// const start = <Avatar alt="logo" image="./logo.png" size="xlarge" shape="circle" height="30" className="mr-2"/>
// const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
// const end = (        
// <i className="pi pi-shopping-cart p-overlay-badge" style={{ fontSize: '2rem' }}>
// <Badge value={itemCount} severity="danger"></Badge>
// </i>);


  // setMenuIndex(activeIndex); 
  return (
    <PrimeReactProvider >

      <div className="sticky min-w-full border-round bg-white font-bold flex align-items-start "
      // className="sticky"
      >
            {/* <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div> */}

        <TabMenu
          className="text-2xl w-12"
          model={items} activeIndex={activeMenuIndex}
          onTabChange={(e) => {
            setMenuIndex(activeMenuIndex)
            switch (e.index) {
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
        
        {/* <Button  className='border-round font-bold flex' text icon="pi pi-shopping-cart" outlined badge={itemCount} badgeClassName="p-badge-danger" size="large" onClick={goToOrder}/> */}
       
      { 
       itemCount ? 
            <a href="/order"  >
            <i className="pi pi-shopping-cart p-overlay-badge" style={{ fontSize: '2rem' }}>
                    <Badge value={itemCount} severity="danger"></Badge>
            </i> 
            </a> 
        : null} 
      </div>
    </PrimeReactProvider>
  )
}
