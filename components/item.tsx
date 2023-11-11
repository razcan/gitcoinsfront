"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';
import axios, { isCancel, AxiosError } from 'axios';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';

export default function Item() {


    const prefix_api = 'http://localhost:3000/coins/download/';

    const [coins, setCoins] = useState([])
    const fetchCoinData = () => {
        fetch("http://localhost:3000/coins")
            .then(response => {
                return response.json()
            })
            .then(coins => {
                setCoins(coins)
            })
    }

    useEffect(() => {
        fetchCoinData()
    }, [])


    const [aacoins, setaaCoins] = useState([])
    const axiosRequest = () => {
        useEffect(() => {
            axios.get('http://localhost:3000/coins')
                .then(function (response) {
                    setaaCoins(response.data);
                    // console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }, []);
    }

    axiosRequest();

    const [visible, setVisible] = useState(false);
    const [modal_selected_item, setModal_selected_item] = useState([]);
    const [order_qtty, setOrder_qtty] = useState(1);

    const chooseModalItem = (visible: string) => {
        setVisible(true);
        setModal_selected_item(visible);
    };

    return (
        <PrimeReactProvider>

            <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <p className="m-0">
                    {/* Do you want to buy this item? Are you insane? It is to expensive ... */}
                    {/* {modal_selected_item} */}
                    <div className="flex-auto">
                        <label htmlFor="minmax-buttons" className="font-bold block mb-2">Order Qunatity</label>
                        <InputNumber inputId="minmax-buttons" value={order_qtty} onValueChange={(e) => setOrder_qtty(e.value)} mode="decimal" showButtons min={0} max={100} />
                    </div>
                    <div className="card flex justify-content-center">
                        <Button label="Submit" icon="pi pi-check" iconPos="right" size="small" onClick={() => setVisible(false)}/>
                    </div>
                    {modal_selected_item}
                </p>
            </Dialog>


            <ScrollPanel style={{ width: '100%', height: '100%' }}>
                <div>
                    <div>
                        {coins.length > 0 && (
                            <ul>
                                {
                                    coins.map(
                                        nested =>

                                            nested.fileinfos.map(element =>
                                                <Splitter style={{ height: '180px' }}>
                                                    <SplitterPanel className="flex align-items-center justify-content-center" size={35} minSize={10}>
                                                        <img src={prefix_api + element.filename} width="150" onClick={()=> chooseModalItem(prefix_api) }/>
                                                    </SplitterPanel>

                                                    <SplitterPanel className="flex align-items-center justify-content-center" size={65}>
                                                        <Card title={'Weight: ' + nested.Weight} style={{ width: '100%', height: '100%' }} header={nested.Value}>
                                                            <span className="flex align-items-center gap-1">
                                                                <i className="pi pi-tag"></i>
                                                                <span className="font-semibold">Year: {nested.Year}</span>
                                                            </span>
                                                            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-2 sm:gap-1">
                                                                <span className="font-semibold"> {nested.Price} Lei</span>
                                                                <div>
                                                                    <Button icon="pi pi-shopping-cart" className="p-button-rounded" onClick={() => chooseModalItem(element.filename)}
                                                                        style={{ width: '30px', height: '30px' }}></Button>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    </SplitterPanel>
                                                </Splitter>
                                            ))}

                            </ul>
                        )}
                    </div>
                </div>
            </ScrollPanel>
        </PrimeReactProvider>
    )
}

