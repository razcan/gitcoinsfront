"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { useRouter } from 'next/navigation'
import '../css/style.css';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import axios from 'axios';

export default function Menu(props) {

  const [activeMenuIndex, setMenuIndex] = useState(props.activatedIndex);
  const [itemCount, setItemCount] = useState(0);

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState([]);

  const [visible, setVisible] = useState(false);
  const toast = useRef(null);

  const showSuccess = () => {
      toast.current.show({severity:'success', summary: 'Success', detail:'You are now connected', life: 1000});
  }

  const showError = () => {
      toast.current.show({severity:'error', summary: 'Error', detail:'Invalid Username or Password!', life: 1000});
  }

const router = useRouter()

const Login = async () => {

try {
  const response =await axios.post('http://localhost:3000/auth/login', {username, password});
   showSuccess();
  setToken(response.data)
  setVisible(false)
  // Remove the item from local storage
  localStorage.removeItem("token");
  // Store token in local storage
  localStorage.setItem("token", JSON.stringify(response.data));
 
} catch (error) {
  // Handle errors
  localStorage.removeItem("token");
  showError();
  console.error('Error submitting :', error);
}
}

  const items = [
    { label: 'Home', icon: 'pi pi-fw pi-home' },
    { label: 'News', icon: 'pi pi-fw pi-info-circle' },
    { label: 'Lots', icon: 'pi pi-fw pi-bitcoin' },
    { label: 'Conditions', icon: 'pi pi-fw pi-list' },
    { label: 'Contact', icon: 'pi pi-fw pi-user' },
    { label: 'Admin', icon: 'pi pi-fw pi-cog' },

    // { label: 'Order', icon: 'pi pi-fw pi-cog' },
    // { label: 'Login', icon: 'pi pi-fw pi-cog' },
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
          model={items} 
          activeIndex={activeMenuIndex}
          onTabChange={(e) => {
            setMenuIndex(activeMenuIndex)
            switch (e.index) {
              case 6:
                router.push('/login');

                break;
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
        
        {/* <Button  className='custom-font-button ' label ="Cart"
             text icon="pi pi-shopping-cart"  badge={itemCount} 
             badgeClassName="custom-badge-danger" size="large" onClick={goToOrder}/> */}
         {/* <Button type="button" label="Cart" icon="pi pi-shopping-cart" 
        outlined badge={itemCount}  size="large" badgeClassName="p-badge-danger" onClick={goToOrder}/> 

<a href="/login"  >
<i className="pi pi-user" style={{ fontSize: '2.5rem' }}></i>
</a> */}

{/* <Button label="Show" icon="pi pi-user" onClick={() => setVisible(true)} /> */}
<Button className="p-button-outlined mb-5 m-1 w-4rem h-4rem" icon="pi pi-user"  onClick={() => setVisible(true)}/>
            <Dialog header="Login" visible={visible} onHide={() => setVisible(false)}
                style={{ width: '30vw' }} breakpoints={{ '960px': '50vw', '641px': '75vw' }}>
               <Toast ref={toast} />
                <div className="flex flex-wrap justify-content-center align-items-center gap-2 p-2">
                        <label className="w-6rem">Username</label>
                        <InputText id="username" type="text" className="w-12rem" value={username} onChange={(e) => setUserName(e.target.value)}/>
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2 p-2">
                        <label className="w-6rem">Password</label>
                        <InputText id="password" type="password" className="w-12rem" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="flex flex-wrap  gap-2">
                        <label className="w-6rem"></label>
                        <Button label="Login" icon="pi pi-user" className="w-10rem mx-auto" onClick={Login}></Button>
                    </div>
                
            </Dialog>

{ 
       itemCount ? 
       <Button className="p-button-outlined mb-5 m-1 w-4rem h-4rem" icon="pi pi-shopping-cart" badge={itemCount}  outlined 
        badgeClassName="p-badge-danger" onClick={goToOrder}/>
            //  <a href="/order"  >
            //     <i className="pi pi-shopping-cart p-overlay-badge" style={{ fontSize: '2.66rem' }}>
            //         <Badge value={itemCount} 
            //         style={{ height: '1.6rem', width: "1.6rem" }}
            //         // size="large" 
            //         severity="danger"></Badge>
            //     </i>
            //     </a>
               : null }

      {/* { 
       itemCount ? 
             <a href="/order"  >
            <i className="pi pi-shopping-cart p-overlay-badge" style={{paddingTop:'1rem', fontSize: '3rem' }}>
                    <Badge value={itemCount}  severity="danger"></Badge>
            </i> 
            </a> 
        : null}  */}
      </div>
    </PrimeReactProvider>
  )
}
