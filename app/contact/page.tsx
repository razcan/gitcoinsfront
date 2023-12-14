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

export default function Contact() {

  const router = useRouter()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  return (
<PrimeReactProvider>
  <div className ='min-h-screen'>
      <Menu activatedIndex={4} />
        <Card className="max-w-full pb-3 min-h-screen">
          <div className="grid nested-grid">
            <div className="col-4 p-3">
              <div className="grid">
                  <Card title="Get in touch" style={{height: "420px"}} className=' w-full'>
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
                        <p className="text-xl w-10">Brasov, Str. Lunga, Nr. 23</p>
                    </div>
                  </Card>
              </div>
            </div>
            <div className="col-8 p-2">
              <Card title="Contact Me"  style={{height: "420px"}}>
                <div className="col-6">
                  <div className="text-center border-round-sm font-bold">
                    <div className="field col-2 md:col-2 p-2 min-w-full">
                      <span className="p-float-label p-input-icon-left min-w-full">
                        <i className="pi pi-user min-w-full" />
                        <InputText className='min-w-full'
                          id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="name">Name</label>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center border-round-sm font-bold">
                    <div className="field col-2 md:col-2 p-2 min-w-full">
                      <span className="p-float-label p-input-icon-left min-w-full">
                      <i className="pi pi-envelope min-w-full" />
                        <InputText className='min-w-full'
                          id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="email">Email</label>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="text-center border-round-sm  font-bold">
                    <div className="field col-6 md:col-6 pt-2">
                      <span className="p-float-label">
                        <InputTextarea className='min-w-full'
                          autoResize
                          id="message" value={message} onChange={(e) => setMessage(e.target.value)}
                          pt={{
                            root: {
                              rows: 5,

                            }
                          }}
                        />
                        <label htmlFor="message">Message</label>
                      </span>
                    </div>
                  </div>
                </div>
                <Button label="Submit" icon="pi pi-check" />  
              </Card>
            </div>
            <div className="col-12 p-3 border-blue-500">
            
            
            <div className="flex flex-wrap align-items-center justify-content-center">
                <div className="py-0 bg-primary-100 w-12rem m-3 border-round">
                    <div className="border-round bg-primary font-bold p-3 flex align-items-center justify-content-center">py-5</div>
                </div>
            </div>

           
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

</PrimeReactProvider>
      )
    }


       