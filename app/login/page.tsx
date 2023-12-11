"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/menu';
import { useRouter } from 'next/navigation'
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';

export default function Contact() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState([]);
    const toast = useRef(null);
    const [visible, setVisible] = useState(false);

    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'You are now connected', life: 6000});
    }

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'Invalid Username or Password!', life: 6000});
    }

const router = useRouter()

const Login = async () => {

  try {
    const response =await axios.post('http://localhost:3000/auth/login', {username, password});
    showSuccess();

    
    setToken(response.data)
    
    // Remove the item from local storage
    localStorage.removeItem("token");
    // Store token in local storage
    localStorage.setItem("token", JSON.stringify(response.data));
   
  } catch (error) {
    // Handle errors
    showError();
    console.error('Error submitting :', error);
  }
}

// useEffect(() => {
//     const getValues =  () => {
//       setRetrievedObject(JSON.parse(localStorage.getItem('YourOrder')))
//       setDataFetched(true)
//     }

//     getValues();
//     summaryOrder();
      
//   }, [dataFetched])

    //http://localhost:3000/auth/login
//{"username": "razvan", "password": "vasilica"}

  return (
    <PrimeReactProvider>

      <Menu activatedIndex={6} />

      <div className="card flex justify-content-center">
            <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} />
            <Dialog header="Header" visible={visible} onHide={() => setVisible(false)}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
               
                <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Username</label>
                        <InputText id="username" type="text" className="w-12rem" value={username} onChange={(e) => setUserName(e.target.value)}/>
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Password</label>
                        <InputText id="password" type="password" className="w-12rem" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="flex flex-wrap  gap-2">
                        <label className="w-6rem"></label>
                        <Button label="Login" icon="pi pi-user" className="w-10rem mx-auto" onClick={Login}></Button>
                    </div>
                
            </Dialog>
        </div>

      {/* <div>
          Login page
          <Toast ref={toast} />
  
</div>
<div className="card">
            <div className="flex flex-column md:flex-row">
                <div className="field w-full md:w-5 flex flex-column gap-3 py-5">
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Username</label>
                        <InputText id="username" type="text" className="w-12rem" value={username} onChange={(e) => setUserName(e.target.value)}/>
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Password</label>
                        <InputText id="password" type="password" className="w-12rem" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="flex flex-wrap  gap-2">
                        <label className="w-6rem"></label>
                        <Button label="Login" icon="pi pi-user" className="w-10rem mx-auto" onClick={Login}></Button>
                    </div>
                    
                </div>
            </div>
        </div> */}

    </PrimeReactProvider>

  )
}