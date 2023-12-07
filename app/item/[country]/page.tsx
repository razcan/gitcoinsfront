"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import Menu from '../../../components/menu';
import { useRouter } from 'next/navigation';
import '../../../css/style.css'
import OrderSteps from  '../../../components/steps'


export default function Item(params:any) {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [visible, setVisible] = useState(false);
    const [selected_product, setSelected_product] = useState([]);
    const [ordered_qtty, setOrdered_qtty] = useState(1);
    const [menuIndex, setMenuIndex] = useState(0);

    const setProductVisible = (product: any, bol: boolean) => {
        setSelected_product(product);
        setVisible(true);
        
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
             setMenuIndex((prevKey) => prevKey + 1);
            // router.push('/order')
   
    }



    const fetchCoinData = () => {
        fetch(`http://localhost:3000/coins/getcoinsbycountry/${params.params.country}`)
            .then(response => {
                return response.json()
            })
            .then(coins => {
                setProducts(coins)
                // setProducts(coins)
                // console.log(coins)
            })
    }

    useEffect(() => {
        fetchCoinData()
    }, [])

    const viewOrder = () => {
        router.push('/order')
    }



    const listItem = (product) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-8rem shadow-2 block xl:block mx-auto border-round" 
                    src={`http://localhost:3000/coins/download/${product.Photo1}`} alt={product.Photo1} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.Country}</div>
                            <Rating value={4} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.Year}</span>
                                </span>
                                <Tag value={product.inventoryStatus}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.Price}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded"></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (product) => {
        return (
            <div className="col-4 sm:col-4 lg:col-2 xl:col-2 p-4">
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

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="container">
<div className="content">

        <div className="card">
            <div key={menuIndex}>
             <Menu activatedIndex={0} />
           <OrderSteps />
            </div>

            <Dialog visible={visible} modal={false} style={{ width: '25vw' }} 
            onHide={() => resetValue()}>
                <p className="m-1">
                    <img src={`http://localhost:3000/coins/download/${selected_product.Photo1}`} alt={selected_product.Photo1} style={{ width: '40%', padding: '10px' }} />
                    <img src={`http://localhost:3000/coins/download/${selected_product.Photo2}`} alt={selected_product.Photo2} style={{ width: '40%', padding: '10px' }} />
                    <div>
                            <Divider />
                            
                            <div className="text-orange-500 w-16rem h-1rem text-sm font-bold">
                                Name: {selected_product.Name}
                            </div>
                            <Divider />
                            <div className="text-orange-500 w-16rem h-1rem text-sm font-bold">
                               Continent: {selected_product.Continent}
                            </div>
                            <Divider />
                            <div className="text-orange-500 w-16rem h-1rem text-sm font-bold">
                            Country: {selected_product.Country}
                            </div>
                            <Divider />
                            <div className="text-orange-500 w-16rem h-1rem text-sm font-bold">
                            Value: {selected_product.Value}
                            </div>
                            <Divider />
                            <div className="text-orange-500 w-16rem h-1rem text-sm font-bold">
                            Year: {selected_product.Year}
                            </div>
                            <Divider />
                            <div className="text-orange-500 w-16rem h-1rem text-sm font-bold">
                            Composition: {selected_product.Composition}
                            </div>
                            <Divider />
                            <div className="text-orange-500 w-16rem h-1rem text-sm font-bold">
                            Status: {selected_product.Status}
                            </div>
                            <Divider />
                            <div className="text-orange-500 w-16rem h-1rem text-sm font-bold">
                            References: {selected_product.References}
                            </div>
                            <Divider />
                            <div className="text-orange-500 w-16rem h-1rem text-sm font-bold">
                            Price: {selected_product.Price}
                            </div>
                            <Divider /> 
                            <div className="text-red-800 w-16rem h-2rem text-xl font-bold">
                            Value: {selected_product.Price * ordered_qtty}
                            </div>
                           
                            
                           
                    </div>
            <div className="card flex flex-wrap gap-3 p-fluid">
                <label className="font-bold block mb-2"></label>
                <div className="flex-auto">
                <label htmlFor="mile" className="font-bold block mb-2"></label>
                    <InputNumber allowEmpty={false} min={1} max={1000} value={ordered_qtty} onValueChange={(e) => setOrdered_qtty(e.value)} />
                </div>
                <div className="flex-auto">
                <label className="font-bold block mb-2"></label>
                <Button label="Add" onClick={addToOrder} ></Button>    
                </div>
                <div className="flex-auto">
                <label className="font-bold block mb-2"></label>
                <Button label="Check Order"  onClick={viewOrder}></Button> 
                </div>   
            </div>
            </p>
            </Dialog>

            <DataView value={products} itemTemplate={itemTemplate} layout={layout}
                // header={header()} --if we want buttons for list and grid
                paginator rows={18} />
        </div>
        </div>
        </div>
    )
}
