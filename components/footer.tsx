"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';
import config from '../../coins-front/config.json'

async function getIPDetails(ip: string): Promise<void> {
    try {
        const API_KEY = config.API_KEY_ipstack; 
        const responseIP = await fetch('https://api.ipify.org?format=json');
        const dataIP = await responseIP.json();
        const response = await fetch(`http://api.ipstack.com/${dataIP.ip}?access_key=${API_KEY}`);
        const data = await response.json();
        console.log(`IP Address: ${data.ip}`);
        console.log(`Location: ${data.city}, ${data.region_name}, ${data.country_name}`);
        console.log(`Latitude: ${data.latitude}`);
        console.log(`Longitude: ${data.longitude}`);
    } catch (error) {
        console.error('Error fetching IP details:', error.message);
    }
}


export default function Footer() {
    
    const cur_date = new Date;
    const year = cur_date.getFullYear()
    getIPDetails('81.196.154.197');

return (

<div className='footer'>
© [{year}] coinzzz.ro . All rights reserved. For inquiries, please contact: coins@coins.ro.<a style={{color: 'white'}} href="http://localhost:3001/conditions">@Terms and condtions</a>
</div>
)

}


{/* <div style={{ position: 'fixed', bottom: 0, width: '100%', background: '#f0f0f0', padding: '10px', textAlign: 'center' }}> */}