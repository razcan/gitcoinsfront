"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
// import axios, {isCancel, AxiosError} from 'axios';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';

         

export default   function Home() {
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


  return (
    <PrimeReactProvider>

<div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                </span>
                <InputText placeholder="Username" />
            </div>
            <div className="p-inputgroup flex-1">
    <span className="p-inputgroup-addon">$</span>
    <InputNumber placeholder="Price" />
    <span className="p-inputgroup-addon">.00</span>
</div>

<div className="p-inputgroup flex-1">
    <span className="p-inputgroup-addon">www</span>
    <InputText placeholder="Website" />
</div>
              <div className="card flex flex-wrap justify-content-center gap-3">
    <Button icon="pi pi-check" />
    <Button label="Submit" icon="pi pi-check" />
    <Button label="Submit" icon="pi pi-check" iconPos="right" />

    <Card title="Title" subTitle="Subtitle"  className="md:w-25rem">
    <p className="m-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
        numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
    </p>
</Card>

</div>  
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

