"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/menu_ini';
import { useRouter } from 'next/navigation'
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import config from '../../../coins-front/config.json';


export default function Login() { 
  
    const IP: string = config.IP;
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState([]);
    const toast = useRef<any>(null);
    const [visible, setVisible] = useState(true);

    const showSuccess = () => {
      toast.current.show(
        {severity:'success', summary: 'Success', detail:'You are now connected', life: 1000}
      );
      
      setTimeout(() => {
        setVisible(false)
        router.push('/');
        // console.log("Delayed for 1 second.");
      }, 1000);
  }

    const showError = () => {
        toast.current.show(
          {severity:'error', summary: 'Error', detail:'Invalid Username or Password!', life: 1000}
          );

    }

const router = useRouter()

const Login = async () => {

    try {
      const response =await axios.post(`http://${IP}:3000/auth/login`, {username, password});
      
     
      setToken(response.data)
     
      
      // Remove the item from local storage
      sessionStorage.removeItem("token");
      // Store token in local storage
      sessionStorage.setItem("token", JSON.stringify(response.data));
     // Read token from local storage
     const myStoredItem:any = sessionStorage.getItem('token');
     const rez = JSON.parse(myStoredItem);
    
     showSuccess();
    

     //data la care expira token
    //  console.log(rez.expire_date_token)
    // router.push('/');
      //expire_date_token
     
    } catch (error) {
      // Handle errors
      localStorage.removeItem("token");
      showError();
      console.error('Error submitting :', error);
    }
    }
    
  return (
    <PrimeReactProvider>
      <Menu activatedIndex={1} />
      <div className="card flex justify-content-center">
      <Dialog header="Login" visible={visible} style={{ width: '30vw' }} onHide={() => setVisible(false)}>
      <Toast ref={toast} />      
                <div className="flex flex-wrap justify-content-center align-items-center gap-2 p-2">
                        <label className="w-6rem">Username</label>
                        <InputText id="username" type="text" className="w-12rem" value={username} onChange={(e) => setUserName(e.target.value)}/>
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2 p-2">
                        <label className="w-6rem">Password</label>
                        <InputText id="password" type="password" className="w-12rem" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="flex flex-wrap p-4 pl-3">
                        <label className="w-6rem"></label>
                        <Button label="Login" icon="pi pi-user" className="w-12rem" onClick={Login}></Button>
                    </div>
        </Dialog>
        </div>

    </PrimeReactProvider>

  )
}