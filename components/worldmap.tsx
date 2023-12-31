"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';


import "../css/styles_map.css";
import { SelectedContextContinent } from './context'
import Filters from './filters'
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { ScrollPanel } from 'primereact/scrollpanel';
// import WorldMap from 'react-world-map';
const WorldMap = require('react-world-map');
// const { yourModule } = require('your-module');

//https://github.com/heatherbooker/react-world-map/blob/main/docs/index.jsx

export default function MapWorld() {
    const [selected1, onSelect2] = useState<any>();
    const [ContinentSelectattrans, setContinentSelectattrans] = useState<any>();


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
                // console.log("No continent selected!");
                break;
        }
    };



    useEffect(() => {

        selectedCont(ContinentSelectattrans)


    }, [ContinentSelectattrans])

    return (

    <Card className='container'>
         <div className='content'> 

        <div className="grid">

            {/* <div className="col-2 sm:col-2 lg:col-3 xl:col-3"> */}
            <div className="col-fixed" style={{ width: "180px" }}>

                <div className="h-full flex">


                    <SelectedContextContinent.Provider value={selected1}>
                        <ScrollPanel
                            // style={{ height: '600px' }}
                            className='min-h-screen'
                        >
                            <Filters />
                        </ScrollPanel>
                    </SelectedContextContinent.Provider>
                </div>

            </div>
            {/* <div className="col-1 sm:col-4 lg:col-4 xl:col-8">    */}
            <div className="col-1 sm:col-4 lg:col-4 xl:col-8">
                {selected1 ? <Tag className='sm:text-xs xl:text-xl' severity="info" value={selected1} rounded></Tag> : null}
                <div className="body">
                    <WorldMap
                        multiple={true}
                        selected={ContinentSelectattrans} onSelect={setContinentSelectattrans} />

                </div>

            </div>

        </div>

</div>
</Card>


    );

}
