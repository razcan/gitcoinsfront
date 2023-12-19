"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';
import  Menu  from '../../components/menu';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Footer from '@/components/footer';
import { Slider } from "primereact/slider";
import { InputText } from "primereact/inputtext";
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';
import  '../../css/style.css' 
import { ScrollPanel } from 'primereact/scrollpanel';
import { InputNumber } from 'primereact/inputnumber';

export default function News() {

const [products, setProducts] = useState([]);
const [days, setDays] = useState(30);
const [layout, setLayout] = useState('grid');

const fetchCoinData = () => {
  fetch(
    `http://localhost:3000/coins/byCreated/${days}`
  )
      .then(response => {
          return response.json()
      })
      .then(coins => {
          setProducts(coins)
      })
}

useEffect(() => {
  fetchCoinData()
}, [days])

const gridItem = (product) => {
  return (
      <div className="col-2 sm:col-2 lg:col-2 xl:col-2 pl-4">
          <div className="p-2 border-1 surface-border surface-card border-round">
              <div className="flex flex-wrap align-items-center justify-content-between gap-1">
                  <div className="flex align-items-center gap-2">
                      <i className="pi pi-tag"></i>
                      <span className="text-xl">{product.Country}</span>
                  </div>
                  <Tag value={product.Catalog}></Tag>
              </div>
              <div className="flex flex-column align-items-center gap-1 py-2">
                  <img className="w-6 shadow-1 border-round"
                      src={`http://localhost:3000/coins/download/${product.Photo1}`}
                      alt={product.Photo1} />
                  <div className="text-xl">{product.Value} / {product.Year}</div>

              </div>
              <div className="flex align-items-center justify-content-between">
                  <span className="text-xl font-semibold">{product.Status}</span>
                  <Button icon="pi pi-shopping-cart" className="p-button-rounded" onClick={() => setProductVisible(product, true)}></Button>
              </div>
          </div>
      </div>
  );
};


const itemTemplate = (product, layout) => {
  if (!product) {
      return;
  }

  if (layout === 'list') return listItem(product);
  else if (layout === 'grid') return gridItem(product);
};
  
  return (
    <PrimeReactProvider>
                  <Menu activatedIndex={1} />
        <Card className='container'>
          <div className='content'>
  

            <ScrollPanel style={{ width: '100%', height: '650px' }}>
   
                      <div className="card justify-content-center">
                      <div className="grid">
                          <div className="flex pt-0 col-1">
              
                           <div className="col-12">
                                 
                                  <Tag value="Added in the last days"></Tag>
                                  <InputText value={days} onChange={(e) => setDays(e.target.value)} className="w-full" />
                                  <Slider value={days} max={60} onChange={(e) => setDays(e.value)} className="w-full" />
                              </div>

                          </div>
                          <div className="col-11">
                             <DataView value={products} itemTemplate={itemTemplate} layout={layout}
                              // header={header()} --if we want buttons for list and grid
                              paginator rows={18} />
                          </div>
                      </div>
                  </div>

            </ScrollPanel>
            </div>
        </Card>
      
<Footer />
    </PrimeReactProvider>
  )
}




                              {/* <div className="col-12">
                                 
                                  <Tag value="Added in the last days"></Tag>
                                  <InputText value={days} onChange={(e) => setDays(e.target.value)} className="w-full" />
                                  <Slider value={days} onChange={(e) => setDays(e.value)} className="w-full" />
                              </div> */}

                                          {/* <div className=" flex justify-content-center">
                          <div className="col-8 card flex flex-wrap p-fluid">
                            <div className=' flex-auto'>
                                  <label htmlFor="horizontal-buttons"></label>
                                  <InputNumber inputId="horizontal-buttons" 
                                      value={days} onValueChange={(e) => setDays(e.value)} 
                                      showButtons buttonLayout="vertical" step={1}
                                      decrementButtonClassName="p-button-danger" 
                                      incrementButtonClassName="p-button-success" 
                                      incrementButtonIcon="pi pi-plus" 
                                      decrementButtonIcon="pi pi-minus"
                                      />
                                </div>
                              </div>

                          </div> */}
