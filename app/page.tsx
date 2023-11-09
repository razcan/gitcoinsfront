"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
//import 'primereact/resources/themes/lara-light-indigo/theme.css';
//import 'primereact/resources/themes/md-dark-indigo/theme.css';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
// import axios, {isCancel, AxiosError} from 'axios';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { TabMenu } from 'primereact/tabmenu';

import { Panel } from 'primereact/panel';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Image } from 'primereact/image';
import { Carousel } from 'primereact/carousel';
import { Paginator } from 'primereact/paginator';
import { Tag } from 'primereact/tag';


export default function Home() {
  const [date, setDate] = useState(null);

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

  const [activeMenuIndex, setMenuIndex] = useState(0);
  const items = [
    { label: 'Home', icon: 'pi pi-fw pi-home' },
    { label: 'Coins', icon: 'pi pi-fw pi-bitcoin' },
    { label: 'Orders', icon: 'pi pi-fw pi-list' },
    { label: 'About', icon: 'pi pi-fw pi-user' }
  ];

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <PrimeReactProvider>

      <div className="card">
        <TabMenu model={items} activeIndex={activeMenuIndex} onTabChange={(e) => setMenuIndex(e.index)} />
      </div>


      <ScrollPanel style={{
        width: '100%', height: '790px'
      }}>
        <div>
          <div>
            {coins.length > 0 && (
              <ul>
                {
                  coins.map(
                    nested => nested.fileinfos.map(element =>
                      <Splitter style={{ height: '200px' }}>
                        <SplitterPanel className="flex align-items-center justify-content-center" size={25} minSize={10}>
                          <img src={prefix_api + element.filename} width="150" />
                        </SplitterPanel>

                        <SplitterPanel className="flex align-items-center justify-content-center" size={75}>
                          <Card title={nested.Value} style={{ width: '100%', height: '100%' }} header="Detalii">
                            <div>
                                {nested.Value} 
                                ${nested.Price}
                                {nested.Weight}
                                {nested.Year}
                            </div>
                            <div className="mt-1 flex flex-wrap gap-1 justify-content-center">
                              <Button icon="pi pi-search" className="p-button p-button-rounded" style={{ fontSize: '0.5rem' }}/>
                              <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" style={{ fontSize: '1rem' }}/>
                            </div>
                          </Card>

                        </SplitterPanel>
                      </Splitter>
                    ))}s
              </ul>
            )}
          </div>

          {/* data.map(nested => nested.fileinfos.map(element => console.log('http://localhost:3000/coins/download/'+element.filename))) */}
        </div>
      </ScrollPanel>

      <Paginator first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
    </PrimeReactProvider>





    //     <PrimeReactProvider>

    // <div className="card flex justify-content-center">
    //             <Button label="Check" icon="pi pi-check" />
    //         </div>


    //     <main className="flex min-h-screen flex-col items-center justify-between p-24">

    // <div>
    // {coins.length};
    // <div>
    //       {coins.length > 0 && (
    //         <ul>
    //           {
    //           coins.map(
    //             nested => nested.fileinfos.map(element =>
    //             <div>
    //               <li key={nested.id}>
    //                 {nested.CreatedAt}, {nested.id}, {nested.Year}, {nested.Value}, {nested.Weight}    
    //               </li>
    //               <li key={element.filename}>
    //                 {prefix_api+ element.filename} 
    //                 <img src={prefix_api+ element.filename}  />
    //               </li>
    //             </div>
    //           ))}
    //         </ul>
    //       )}
    //     </div>

    //     {/* data.map(nested => nested.fileinfos.map(element => console.log('http://localhost:3000/coins/download/'+element.filename))) */}
    //     <p className="text-sky-400">The coins...</p>     
    // </div>
    //     </main>
    //     </PrimeReactProvider>
  )
}

