"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'
import ReactDOM from 'react-dom';
import WorldMap from 'react-world-map';
import "../css/styles_map.css";
import { SelectedContextContinent } from './context'
import Filters from './filters'
import { Card } from 'primereact/card';

//https://github.com/heatherbooker/react-world-map/blob/main/docs/index.jsx

export default function MapWorld() {
    const [selected1, onSelect2] = useState<string>();
    const [ContinentSelectattrans, setContinentSelectattrans] = useState<string>();


    const selectedCont = (selected: any) => {
        switch (selected) {
            case "eu":
                onSelect2('Europe')
                break;
            case 'sa':
                onSelect2('South America')
                break;
            case 'na':
                onSelect2('North America')
                break;
            case 'as':
                onSelect2('Asia')
                break;
            case 'oc':
                onSelect2('Oceania')
                break;
            case 'af':
                onSelect2('Africa')
                break;
            default:
                console.log("No continent selected!");
                break;
        }
    };



    useEffect(() => {

        selectedCont(ContinentSelectattrans)


    }, [ContinentSelectattrans])

    return (

<div className="grid">

<div className="col-2">
    
            <div className="h-full flex  justify-content-center">
                     <Card>
                        <SelectedContextContinent.Provider value={selected1}>
                            <Filters />
                        </SelectedContextContinent.Provider>
                    </Card>
                </div>

</div>
    <div className="col-8">    
       
            <div className="h-full  p-10 flex align-items-center justify-content-center">
                    <Card>
                        <WorldMap
                            multiple={true}
                            selected={ContinentSelectattrans} onSelect={setContinentSelectattrans} />
                    </Card>
            </div>
        
    </div>


            {/* <div className="col-2">
                <div className="text-center p-3 border-round-sm  font-bold">
                    <Card>
                    <SelectedContextContinent.Provider value={selected1}>
                        <Filters />
                    </SelectedContextContinent.Provider>
                    </Card>
                </div>
            </div>
            <div className="col-8">
                <div className="text-center p-3 border-round-sm  font-bold ">
                    <Card>
                        <WorldMap
                            multiple={true}
                            selected={ContinentSelectattrans} onSelect={setContinentSelectattrans} />
                    </Card>
                </div>
            </div> */}

        </div>
    );
}