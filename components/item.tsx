"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { Image } from 'primereact/image';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Galleria } from 'primereact/galleria';

import { Divider } from 'primereact/divider';


export default function Item() {


    const prefix_api = 'http://localhost:3000/coins/download/';
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [visible, setVisible] = useState(false);
    const [selected_product, setSelected_product] = useState([]);
    const [images, setImages] = useState(null);
    const [ordered_qtty, setOrdered_qtty] = useState(1);


    const setProductVisible = (product: any, bol: boolean) => {
        setSelected_product(product);
        setVisible(true);
        console.log(product);
    }


    const fetchCoinData = () => {
        fetch("http://localhost:3000/coins")
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



    const listItem = (product) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:3000/coins/download/${product.Photo1}`} alt={product.Photo1} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.Name}</div>
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
            <div className="col-6 sm:col-6 lg:col-6 xl:col-2 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.Name}</span>
                        </div>
                        <Tag value={5}></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={`http://localhost:3000/coins/download/${product.Photo1}`} alt={product.Photo1} />
                        <div className="text-2xl font-bold">{product.Name}</div>
                        <Rating value={4} readOnly cancel={false}></Rating>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${product.price}</span>
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
        <div className="card">

            <Dialog header="Details" visible={visible} modal={false} style={{ width: '25vw' }} onHide={() => setVisible(false)}>
                <p className="m-4">

                    <img src={`http://localhost:3000/coins/download/${selected_product.Photo1}`} alt={selected_product.Photo1} style={{ width: '50%', padding: '10px' }} />
                    <img src={`http://localhost:3000/coins/download/${selected_product.Photo2}`} alt={selected_product.Photo2} style={{ width: '50%', padding: '10px' }} />
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
                            Stock: {selected_product.Stock}
                            </div>
                            <Divider />
                            {/* Price: {selected_product.Price}
                            <Divider /> */}
                    </div>
            <div className="card flex flex-wrap gap-3 p-fluid">
                <label className="font-bold block mb-2"></label>
                <div className="flex-auto">
                    <label htmlFor="mile" className="font-bold block mb-2"></label>
                    <InputNumber value={ordered_qtty} onValueChange={(e) => setOrdered_qtty(e.value)} 
                    mode="decimal" showButtons min={0} max={100} />
                </div>
                <div className="flex-auto">
                <label className="font-bold block mb-2"></label>
                <Button label="Add"></Button>    
                </div>
                <div className="flex-auto">
                <label className="font-bold block mb-2"></label>
                <Button label="Order"  ></Button> 
                </div>   
            </div>
                </p>
            </Dialog>

            <DataView value={products} itemTemplate={itemTemplate} layout={layout}
                // header={header()} --if we want buttons for list and grid
                paginator rows={12} />
        </div>
    )
}
