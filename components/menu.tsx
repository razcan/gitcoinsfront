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
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup'; 
import { Chip } from 'primereact/chip';

export default function Menu(props) {

  const [activeMenuIndex, setMenuIndex] = useState(props.activatedIndex);
  const [itemCount, setItemCount] = useState(0);

  const [username, setUserName] = useState([]);

  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const [expireToken, setExpireToken] = useState(false); 

  const showSuccess = () => {
      toast.current.show({severity:'success', summary: 'Success', detail:'You are now connected', life: 1000});
  }

  const showError = () => {
      toast.current.show({severity:'error', summary: 'Error', detail:'Invalid Username or Password!', life: 1000});
  }

const router = useRouter()

const Login = async () => {

  router.push('/login');

// try {
//   const response =await axios.post('http://localhost:3000/auth/login', {username, password});
  
//   showSuccess();
//   setToken(response.data)
 
//   setVisible(false)
//   // Remove the item from local storage
//   localStorage.removeItem("token");
//   // Store token in local storage
//   localStorage.setItem("token", JSON.stringify(response.data));
//  // Read token from local storage
//  const myStoredItem = localStorage.getItem('token');
//  const rez = JSON.parse(myStoredItem);

//  //data la care expira token
// //  console.log(rez.expire_date_token)
//  setExpireToken(rez.expire_date_token)

//   //expire_date_token
 
// } catch (error) {
//   // Handle errors
//   localStorage.removeItem("token");
//   showError();
//   console.error('Error submitting :', error);
// }
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

  const checkUserLogged = () => {

    var existingUser = sessionStorage.getItem("token");

    // Parse existing data (if any)
    var user = existingUser ? JSON.parse(existingUser) : [];

    const username = user.username;
    setUserName(username)

  }

 const goToOrder = () => {
  router.push('/order');
 }

  useEffect(() => {
    checkOrderedItem(),
    checkUserLogged()
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
        

{/* <Button label="Show" icon="pi pi-user" onClick={() => setVisible(true)} /> */}
{username ? 
<div className='pt-5 pr-2 pl-2'>
    <Chip  label={username} removable />
</div>
: null }
<Avatar icon="pi pi-user" size="xlarge" onClick={() => Login()}/>

{/* {expireToken} */}

{ 
       itemCount ? 
               <div className="flex-auto pl-2">
               <Avatar
                 className="p-overlay-badge"
                 icon="pi pi-shopping-cart"
                 size="xlarge"
                 onClick={goToOrder}
               >
                 <Badge value={itemCount} size="large" />
               </Avatar>
             </div>
               : null }
      </div>
    </PrimeReactProvider>
  )
}
