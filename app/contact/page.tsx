"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/menu';
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

export default function Contact() {

  const router = useRouter()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({severity:'success', summary: 'Contact message', detail:'Your message has been sent!', life: 3000});
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
  <div className ='min-h-screen'>
      
        <Card className="max-w-full pt-8 min-h-screen ">
        <Toast ref={toast} />
       
          <div className="grid nested-grid">

          <div className="col-2"></div>
            <div className="col-4 p-3">
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
                    <div className='pt-6' >
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2789.016130395534!2d25.61965800082508!3d45.65049782017623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sro!2sro!4v1702577334133!5m2!1sro!2sro" 
                        style={{border:0}}   
                        className='min-w-full h-26rem'
                        loading="lazy">
                        </iframe>
                    </div>
                  </Card>
              </div>
            </div>
            <div className='w-1rem'></div>
            <div className="col-4 p-2">
              <Card title="Contact Me"  style={{height: "600px"}}>
                <div className="col-12">
                  <div className="text-center border-round-sm font-bold">
                    <div className="field col-12 md:col-12 p-2 min-w-full">
                      <span className="p-float-label p-input-icon-left min-w-full">
                        <i className="pi pi-user" />
                        <InputText className='min-w-full'
                          id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="name">Name</label>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="text-center border-round-sm font-bold">
                    <div className="field col-12 md:col-12 p-2 min-w-full">
                      <span className="p-float-label p-input-icon-left min-w-full">
                      <i className="pi pi-phone" />
                        <InputText className='min-w-full'
                          id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <label htmlFor="phone">Phone</label>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="text-center border-round-sm font-bold">
                    <div className="field col-12 md:col-12 p-2 min-w-full">
                      <span className="p-float-label p-input-icon-left min-w-full">
                      <i className="pi pi-envelope" />
                        <InputText className='min-w-full'
                          id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="email">Email</label>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="text-center border-round-sm  font-bold">
                    <div className="field col-12 md:col-12 pt-2">
                      <span className="p-float-label">
                        <InputTextarea className='min-w-full'
                          autoResize
                          id="message" value={message} onChange={(e) => setMessage(e.target.value)}
                          pt={{
                            root: {
                              rows: 15,

                            }
                          }}
                        />
                        <label htmlFor="message">Message</label>
                      </span>
                    </div>
                  </div>
                </div>
                <div className='ml-3'>
                <Button label="Submit" icon="pi pi-check" onClick={sendData}/>         
                </div>
              
              </Card>
            </div>
            <div className="col-2 p-3"></div>
          
            <div className="col-12 p-3 border-blue-500">

            </div>

          </div>
          

          {/* <div className="flex flex-wrap align-items-center justify-content-center">
              <div className="py-5 bg-primary-100 w-50rem border-round">
                  <div className="border-round bg-primary font-bold p-3 flex align-items-center justify-content-center">
                     <Tag severity="danger" value="Danger" className='py-5'></Tag>
                  </div>
              </div>
          </div> */}

        </Card>
      
  </div>
  
  <Footer />

</PrimeReactProvider>
      )
    }


       