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
import { Image } from 'primereact/image';


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

const checkLogin = () => {
  const response = sessionStorage.getItem("token");
  if (response){
    const res = JSON.parse(response)
    const actualDate = new Date();
    actualDate.setMinutes(actualDate.getMinutes() - 10);

    const dateToken = new Date(res.expire_date_token)
    const dateActual = new Date(actualDate)

    console.log('token:',dateToken,'actual:',dateActual)

  if (dateToken > dateActual ) {
    console.log('a expirat')
  } else {
    console.log('nu a a expirat')
  }

    // console.log(actualDate)
    //to be : cand data actuala -10 min este mai mare decat data din token, sa nu mai fie afisat numele din meniu
    //ora este cu 2 ore in umra
    // console.log('user???',res.expire_date_token)
  }
}

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
    { label: 'Home', icon: 'pi pi-fw pi-home',
    command: () => {
      router.push('/');},  
    },
    { label: 'News', icon: 'pi pi-fw pi-info-circle' ,
    command: () => {
      router.push('/news');} },
    { label: 'Lots', icon: 'pi pi-fw pi-bitcoin' ,
    command: () => {
      router.push('/lots');}},
    { label: 'Conditions', icon: 'pi pi-fw pi-list',
    command: () => {
      router.push('/conditions');} },
    { label: 'Contact', icon: 'pi pi-fw pi-user' ,
    command: () => {
      router.push('/contact');} 
  },
    { label: 'Admin', icon: 'pi pi-fw pi-cog',  
    command: () => {
      router.push('/admin');} 
    },
    // { label: 'Login', icon: 'pi pi-user', 
    // command: () => { Login() }
    // },

  ];

  // const end = <InputText placeholder="Search" type="text" className="w-full" />;
  const end =
  <span>

{username ? <Chip className="mr-2" label={`${username}`} removable /> : null}
<Avatar  icon="pi pi-user" size="large" onClick={() => Login()}/>
{ itemCount ? <Avatar
                 className="p-overlay-badge ml-2"
                 icon="pi pi-shopping-cart"
                 size="large"
                 onClick={() => router.push('/order')}
               >
                 <Badge value={itemCount} 
                //  size="large" 
                 />
               </Avatar> : null}
       
  </span>

 
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

    const response = sessionStorage.getItem("token");
    if (response){
      const res = JSON.parse(response)
      const actualDate = new Date();
      actualDate.setMinutes(actualDate.getMinutes() + 0);
  
      const dateToken = new Date(res.expire_date_token)
      const dateActual = new Date(actualDate)
  
  
    if ( dateToken >dateActual     ) {
      // console.log('it's expired')
      setUserName(username)
     
    } else {
      // console.log('it isn't expired')
      setUserName()
}
    }}

 const goToOrder = () => {
  router.push('/order');
 }

  useEffect(() => {
    checkOrderedItem(),
    checkUserLogged()
    // checkLogin()
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
      <div className="header min-w-full border-round bg-white font-bold flex align-items-start "
      // className="sticky" up - change sticky with header from css
      >
  
        <div className="text-2xl w-12">
            <Menubar model={items}  end={end} />
        </div>
{/* 

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
         */}


{/* <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img> */}


{/* {username ? 
<div className='pt-4 pr-2 pl-2'>
    <Chip  label={username} removable />
</div>
: null }
<div className="flex-auto pl-2 pr-2 pt-2">
<Avatar  icon="pi pi-user" size="large" onClick={() => Login()}/>
</div>
{ 
       itemCount ? 
               <div className="flex-auto pl-1 pr-2 pt-2">
               <Avatar
                 className="p-overlay-badge"
                 icon="pi pi-shopping-cart"
                 size="large"
                 onClick={goToOrder}
               >
                 <Badge value={itemCount} size="large" />
               </Avatar>
             </div>
               : null } */}
      </div>
      
    </PrimeReactProvider>
  )
}
