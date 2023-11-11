"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';
import axios, { isCancel, AxiosError } from 'axios';

export default function Exchange() {

    const [exchangeRate, setaExchangeRate] = useState<number>(0)
    const axiosRequest = () => {
        useEffect(() => {
            axios.get('http://localhost:3000/')
                .then(function (response) {
                    setaExchangeRate(response.data);
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }, []);
    }

    axiosRequest();

    return (
        <PrimeReactProvider>

            {exchangeRate > 0 &&
                <div style={{ color: 'var(--highlight-text-color)', textAlign: 'right'}  }>
                    Curs EUR: {exchangeRate}
                </div>
            }


        </PrimeReactProvider>
    )
}

