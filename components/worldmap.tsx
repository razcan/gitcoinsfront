"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import WorldMap from 'react-world-map';
import "../css/styles_map.css";
import { SelectedContextContinent } from './context'
import Filters from './filters'
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { ScrollPanel } from 'primereact/scrollpanel';

//https://github.com/heatherbooker/react-world-map/blob/main/docs/index.jsx

export default function MapWorld() {
    const [selected1, onSelect2] = useState<string>('Please select a continent');
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

//  <Card className='container'>
    // <div className='content'> 

<div className="grid">

<div className="col-2">
    
            <div className="h-full flex  justify-content-center">
            
                     {/* <Card className="border-1 border-pink-50">
                    </Card> */}

                    <SelectedContextContinent.Provider value={selected1}>                                                    
                            <ScrollPanel style={{ width: '86%', height: '600px' }}>
                            <Filters />
                    </ScrollPanel>
                        </SelectedContextContinent.Provider>
                </div>

</div>
    <div className="col-8">      
    {selected1 ? <Tag  className='text-xl' severity="info" value={selected1} rounded></Tag> : null}    
            <div className="flex align-items-center justify-content-center">
                    {/* <Card className="border-1 border-pink-50">     
                    </Card>                */}
                   
                        <WorldMap
                            multiple={true}
                            selected={ContinentSelectattrans} onSelect={setContinentSelectattrans} />
                    
            </div>
        
    </div>

        </div>
        //  </div>
        // </Card>
    );
}