"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/menu_ini';
import { useRouter } from 'next/navigation'
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';
import { Panel } from 'primereact/panel';
import '../../css/style.css'
import axios from 'axios';
import { Toast } from 'primereact/toast';
import Footer from '@/components/footer';
import { Editor } from "primereact/editor";
import { WorldMap } from 'world-svg';
//https://github.com/kushadige/world-svg/blob/4319063e23bb471b1e919fa264a34abe9e2eac58/README.md
//https://www.iban.com/country-codes
export default function Contact() {

  const router = useRouter()
  const handleCountryClick = (countryId: any) => {
    console.log(countryId);  // Outs: RU, TR, US, ... etc.
  }

  const [name, setName] = useState<any>();
  const [email, setEmail] = useState<any>();
  const [phone, setPhone] = useState<any>();
  const [message, setMessage] = useState<any>();
  const toast = useRef(null);

  const showSuccess = () => {
    // toast.current.show({severity:'success', summary: 'Contact message', detail:'Your message has been sent!', life: 3000});
}


  const sendData = async () => {

    const header = {
      ContactDate: new Date,
      Customer: name,
      Email: email,
      Phone: phone,
      Message: message,
    }

    try {
      const response =await axios.post('http://localhost:3000/orders/contact', {header});
      showSuccess();
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      // Handle errors
      console.error('Error submitting :', error);
    }

  }


  return (
<PrimeReactProvider>
<Menu activatedIndex={4} />

  <Card className='container'>
          <div className='content pt-6'>

        <Card className="max-w-full min-h-screen ">
        <Toast ref={toast} />
       
          <div className="grid">
          <WorldMap onCountryClick={handleCountryClick} landColor="#3b82f6"/>

            <div className="xl:col-2 xs:col-1"></div>

            <div className="xl:col-4 xs:col-4 p-3">
              <div className="grid">
                  <Card title="Get in touch" style={{height: "600px"}} className=' w-full'>
                    <div className="flex align-items-center border-bottom-1 surface-border surface-overlay w-full">
                        <p className="w-4 text-xl text-left font-bold text-blue-500 mr-3">Phone</p>
                        <p className="text-xl w-10">0744 444 888</p>
                    </div>
                    <div className="flex align-items-center border-bottom-1 surface-border surface-overlay w-full">
                        <p className="w-4 text-xl text-left font-bold text-blue-500 mr-3">Email</p>
                        <p className="text-xl w-10">coins@coins.ro</p>
                    </div>
                    <div className="flex align-items-center border-bottom-1 surface-border surface-overlay w-full">
                        <p className="w-4 text-xl text-left font-bold text-blue-500 mr-3">Address</p>
                        <p className="text-xl w-10">Brasov, Str. Zizinului, Nr. 23</p>
                    </div>
                    <div className='pt-4' >
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2789.016130395534!2d25.61965800082508!3d45.65049782017623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sro!2sro!4v1702577334133!5m2!1sro!2sro" 
                        style={{border:0, width: '100%'}}  
                        className=' h-26rem'
                        loading="lazy">
                        </iframe>
                    </div>
                  </Card>
              </div>
            </div>
            {/* <div className='xl: w-1rem'></div> */}
            <div className="xl:col-4 xs:col-4 p-3">
              <div className="grid">
                  <Card title="Get in touch" style={{height: "600px"}} className=' w-full'>
                    <div className="flex align-items-center  surface-border surface-overlay w-full">
                        <span className="p-float-label p-input-icon-left w-full">
                            <i className="pi pi-user" />
                            <InputText className='w-full'
                              id="name" value={name} onChange={(e:any) => setName(e.target.value)} />
                            <label htmlFor="name" >Name</label>
                          </span>
                    </div>
                    <div className="flex align-items-center  surface-border surface-overlay w-full pt-4">
                    <span className="p-float-label p-input-icon-left min-w-full">
                      <i className="pi pi-phone" />
                        <InputText className='min-w-full'
                          id="phone" value={phone} onChange={(e:any) => setPhone(e.target.value)} />
                        <label htmlFor="phone">Phone</label>
                      </span>
                    </div>
                    <div className="flex align-items-center surface-border surface-overlay w-full pt-4">
                    <span className="p-float-label p-input-icon-left min-w-full">
                      <i className="pi pi-envelope" />
                        <InputText className='min-w-full'
                          id="email" value={email} onChange={(e:any) => setEmail(e.target.value)} />
                        <label htmlFor="email">Email</label>
                      </span>
                    </div>
                    <div className="flex align-items-center  surface-border surface-overlay w-full pt-4" style={{width: '100%'}}>
                       <span className="p-float-label">
                       <Editor value={message} onTextChange={(e:any) => setMessage(e.htmlValue)} style={{ height: '260px' }} />
                        <label htmlFor="message">Message</label>
                      </span>
                    </div>
                    <div className='pt-3'>
                      <Button label="Submit" icon="pi pi-check" onClick={sendData}/>         
                    </div>

                  </Card>
              </div>
            </div>
            
            <div className="xl:col-2 xs:col-3 p-3">

            </div> 

          </div>
          
        </Card>
      
  </div>
  </Card>
  
  <Footer />

</PrimeReactProvider>
      )
    }


       