import React, { useState, useRef } from 'react';
import { Steps } from 'primereact/steps';
import { useRouter } from 'next/navigation';

export default function OrderSteps(params) {
    const [activeIndex, setActiveIndex] = useState(params.step);
    const toast = useRef(null);


    const router = useRouter();
    const items = [
        {
            label: 'Cart',
        },
        {
            label: 'Address',
        },
        {
            label: 'Confirmation',
        }
    ];

    return (
        <div className="card">
            <Steps model={items} activeIndex={activeIndex} onSelect={(e) => {setActiveIndex(e.index); 
            
            // switch (e.index) {
            //     case 0:
            //         router.push('/order');
            //       break;
            //     case 1:
            //         router.push('/order/address');
            //       break;
            //       case 2:
            //         router.push('/order');
            //       break;
                
            //     }

        }} readOnly={true} 
         
            />
        </div>
    )
}