"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';

export default function Footer() {

    const cur_date = new Date;
    const year = cur_date.getFullYear()
   

return (

<div style={{ position: 'fixed', bottom: 0, width: '100%', background: '#f0f0f0', padding: '10px', textAlign: 'center' }}>
© [{year}] coinzzz.ro . All rights reserved. For inquiries, please contact: coins@coins.ro.
</div>
)

}