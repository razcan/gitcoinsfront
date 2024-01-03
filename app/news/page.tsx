"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';
import  Menu  from '../../components/menu_ini';
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
import { Dialog } from 'primereact/dialog';
import { useRouter } from 'next/navigation';
import { Galleria } from 'primereact/galleria';


export default function News() {

    const [images, setImages] = useState<any>([]);
 
    const responsiveOptions = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];
  
    const itemTemplate = (item:any) => {
        return <img src={`http://localhost:3000/coins/download/${item.Photos}`} alt={item.Photos}
        style={{ width: '100%' }} />
        
    }
    
    const thumbnailTemplate = (item:any) => {
        return <img src={`http://localhost:3000/coins/download/${item.Photos}`} alt={item.Photos}
        style={{ width: '100%' }} />
      }


const router = useRouter();
const [products, setProducts] = useState<any>();
const [days, setDays] = useState<any>(30);
const [layout, setLayout] =useState<any>('grid');
const [visible, setVisible] =useState<any>(false);
const [selected_product, setSelected_product] = useState<any>([]);
const [menuIndex, setMenuIndex] = useState<any>(0);
const [ordered_qtty, setOrdered_qtty] = useState<any>(1);

const setProductVisible = (product: any, bol: boolean) => {
  setSelected_product(product);
  setVisible(true);
 
  type imagesType= {
    Photos: string;
}

let arrayOfImages: imagesType[] = [];

arrayOfImages.push({Photos: product.Photo1})
arrayOfImages.push({Photos: product.Photo2})

setImages(arrayOfImages);

}

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
}, [days,ordered_qtty])

const viewOrder = () => {
  router.push('/order')
}

const resetValue = () => {
  setVisible(false);
  setOrdered_qtty(1);
}



const addToOrder = () => {

  var existingData = localStorage.getItem("YourOrder");

  // Parse existing data (if any)
  var existingArray = existingData ? JSON.parse(existingData) : [];

  // Add a new item to the array
  var newItem = {
      Catalog: selected_product.Catalog,
      Code: selected_product.Code,
      Composition: selected_product.Composition,
      Continent: selected_product.Continent,
      Country: selected_product.Country,
      Name: selected_product.Name,
      Photo1: selected_product.Photo1,
      Photo2: selected_product.Photo2,
      Price: selected_product.Price,
      References: selected_product.References,
      Status: selected_product.Status,
      Value: selected_product.Value,
      Year: selected_product.Year,
      id: selected_product.id,
      Qtty: ordered_qtty,
      Amount: null

  }

  existingArray.push(newItem);

  // Convert the updated array to a string and store it back in localStorage
  localStorage.setItem("YourOrder", JSON.stringify(existingArray));
  setVisible(false);
  setMenuIndex((prevKey:any) => prevKey + 1);
  // router.push('/order')

}


const gridItem = (product:any) => {
  return (
    //   <div className="col-2 sm:col-2 lg:col-2 xl:col-2 pl-4">
    <div className="col-12 sm:col-6 lg:col-3 xl:col-2 p-2">
          <div className="p-2 border-1 surface-border surface-card border-round">
              <div className="flex flex-wrap align-items-center justify-content-between gap-1">
                  <div className="flex align-items-center gap-2">
                      <i className="pi pi-tag"></i>
                      <span className="text-xl">{product.Country}</span>
                  </div>
                  <Tag value={'KM:'+ product.Catalog}></Tag>
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


const itemTemplate2 = (product:any, layout:any) => {
  if (!product) {
      return;
  }

//   if (layout === 'list') return listItem(product);
//   else 
  if (layout === 'grid') return gridItem(product);
};
  
  return (
    <PrimeReactProvider>
                          <div key={menuIndex}>
                               <Menu activatedIndex={1} />
                          </div>
        <Card className='container'>
          <div className='content pt-6'>
  

            <ScrollPanel style={{ width: '100%', height: '90%'}}>
   
                      <div className="card justify-content-center">

                      <Dialog visible={visible} modal={false} style={{ width: '22vw', height: '50vw' }}
                        onHide={() => resetValue()}>
                        
                        <p className="ml-6 mr-6">
                            {/* <img src={`http://localhost:3000/coins/download/${selected_product.Photo1}`} alt={selected_product.Photo1} style={{ width: '40%', padding: '10px' }} />
                            <img src={`http://localhost:3000/coins/download/${selected_product.Photo2}`} alt={selected_product.Photo2} style={{ width: '40%', padding: '10px' }} /> */}
                            {images ?
                                <div className="card pt-1">
                                    <Galleria 
                                    value={images} 
                                    responsiveOptions={responsiveOptions} 
                                    numVisible={2} 
                                    style={{ maxWidth: '240px' }} 
                                    item={itemTemplate} thumbnail={thumbnailTemplate} />
                                </div> : null}

                            <div>
                                <Divider />

                                <div className="w-26rem  h-1rem text-xl font-bold">
                                    Name: {selected_product.Name}
                                </div>
                                <Divider />
                                <div className=" w-16rem h-1rem text-xl font-bold">
                                    Continent: {selected_product.Continent}
                                </div>
                                <Divider />
                                <div className=" w-16rem h-1rem text-xl font-bold">
                                    Country: {selected_product.Country}
                                </div>
                                <Divider />
                                <div className=" w-16rem h-1rem text-xl font-bold">
                                    Value: {selected_product.Value}
                                </div>
                                <Divider />
                                <div className=" w-16rem h-1rem text-xl font-bold">
                                    Year: {selected_product.Year}
                                </div>
                                <Divider />
                                <div className=" w-16rem h-1rem text-xl font-bold">
                                    Composition: {selected_product.Composition}
                                </div>
                                <Divider />
                                <div className=" w-16rem h-1rem text-xl font-bold">
                                    Status: {selected_product.Status}
                                </div>
                                <Divider />
                                <div className=" w-16rem h-1rem text-xl font-bold">
                                    References: {selected_product.References}
                                </div>
                                <Divider />
                                <div className=" w-16rem h-1rem text-xl font-bold">
                                    Price: {selected_product.Price}
                                </div>
                                <Divider />
                                <div className="text-orange-500 w-16rem h-2rem text-3xl font-bold pb-6">
                                    Value:{selected_product.Price * ordered_qtty}
                                </div>
                            </div>

                            <div className="card flex flex-wrap gap-1 p-fluid">
                                <label className="font-bold "></label>
                                <div className="flex-auto ">
                                     <div className="flex-auto">
                                     {/* <i className="pi pi-cart-plus pr-2" style={{ fontSize: '1.5rem' }}></i> */}
                                    <InputNumber className="pt-1" 
                                     value={ordered_qtty} onValueChange={(e:any) => {
                                        setOrdered_qtty(e.value)
                                        selected_product.Value = (selected_product.Price * e.value)
                                    }} 
                                    showButtons 
                                    
                                    buttonLayout="horizontal" 
                                    style={{ width: '14rem' }} 
                                    decrementButtonClassName="p-button-indigo-600" 
                                    incrementButtonClassName="p-button-indigo-600" 
                                    
                                    incrementButtonIcon="pi pi-plus" 
                                    decrementButtonIcon="pi pi-minus" />
                                  </div>

                                </div>
                                <div className="flex-auto">
                                    <label className="font-bold block mb-1 pt-0"></label>
                                    <Button label="Add" onClick={addToOrder} ></Button>
                                </div>
                                <div className="flex-auto">
                                    <label className="font-bold block mb-1 pt-0 "></label>
                                    <Button label="Check Order" onClick={viewOrder}></Button>
                                </div>
                            </div>
                        </p>
                    </Dialog>

                    


                      <div className="grid">
                          <div className="flex pt-0 col-2 xs:col-6  ">
              
                           <div className="col-12 pt-3">
                                 
                                  <Tag  value="Last added:"></Tag>
                                  
                                  <InputText disabled value={'D: '+days} onChange={(e:any) => setDays(e.target.value)} className="w-full" />
                                  <Slider value={days} max={60} onChange={(e:any) => setDays(e.value)} className="w-full" />
                              </div>

                          </div>
                          <div className="col-11">
                             <DataView value={products} itemTemplate={itemTemplate2} layout={layout}
                              // header={header()} --if we want buttons for list and grid
                              paginator rows={24} />
                          </div>
                      </div>
                  </div>
                  <Footer />
            </ScrollPanel>
            </div>
            
        </Card>
        

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
