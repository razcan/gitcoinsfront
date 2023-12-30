"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/menu_ini';
import { useRouter } from 'next/navigation'
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';
import { Panel } from 'primereact/panel';
import '../../css/style.css';
// import '../../css/cssmap-continents/cssmap-continents/cssmap-continents.css';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import Footer from '@/components/footer';
import { Editor } from "primereact/editor";
// import { WorldMap } from 'world-svg';
// import WorldMap from 'react-native-world-map-svg'

//https://github.com/kushadige/world-svg/blob/4319063e23bb471b1e919fa264a34abe9e2eac58/README.md
//https://www.iban.com/country-codes
export default function Contact() {

  const router = useRouter()
  const handleCountryClick = (countryId: any) => {
    console.log(countryId);  // Outs: RU, TR, US, ... etc.
  }

  const [name, setName] = useState<any>();
  const [email, setEmail] = useState<any>();
  const [phone, setPhone] = useState<any>();
  const [message, setMessage] = useState<any>();
  const toast = useRef(null);

  const showSuccess = () => {
    // toast.current.show({severity:'success', summary: 'Contact message', detail:'Your message has been sent!', life: 3000});
}


  const sendData = async () => {

    const header = {
      ContactDate: new Date,
      Customer: name,
      Email: email,
      Phone: phone,
      Message: message,
    }

    try {
      const response =await axios.post('http://localhost:3000/orders/contact', {header});
      showSuccess();
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      // Handle errors
      console.error('Error submitting :', error);
    }

  }


  return (
<PrimeReactProvider>
<Menu activatedIndex={4} />

  <Card className='container'>

  <ul>
    <li><strong>ACHIZITIONEZ/ SCHIMB</strong> monede, in functie de stocurile de moment.</li>
    <li>&nbsp;<strong>NU LIVREZ</strong> colete sub valoarea de 100 RON.</li>
    <li>&nbsp;<strong>FOTOGRAFIILE</strong> monedelor sunt cu titlu de exemplu (cu exceptia celor peste 20 de lei/buc, unde veti regasi fotografia monedei comandate).</li>
    <li>Dupa plasarea comenzii/ realizarea platii, puteti solicita fotografii (avers-revers) cu lotul de monede achizitionat.</li>
    <li>&nbsp;<strong>PRETUL</strong> monedelor nu este negociabil.</li>
    <li>&nbsp;Se aplica un discount de 5% pentru comenzile cu valoare mai mare de 200 RON si de 10% pentru comenzile cu valoare mai mare de 500 RON.</li>
</ul>
<p><strong>LIVRAREA</strong>:&nbsp;</p>
<p><strong>TRANSPORTUL</strong> se va realiza prin FAN CURIER sau POSTA ROMANA si va fi suportat de catre cumparator.</p>
<p><strong>PLATA</strong> se va realiza ramburs sau in avans, in contul RONCRT000000.. (coletul urmand a fi expediat ulterior confirmarii platii).</p>
<p>- Se poate face PREDARE PERSONALA doar in mun. Brasov.</p>
<p>- Coletele vor fi expediate in zilele de luni si marti ale fiecarei saptamani.</p>
  </Card>
  
  <Footer />

</PrimeReactProvider>
      )
    }


       