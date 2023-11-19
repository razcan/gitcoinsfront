"use client";
import { PrimeReactProvider, PrimeReactContext, PrimeIcons } from 'primereact/api';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/menu';
import { FileUpload } from 'primereact/fileupload';
import { Dropdown } from 'primereact/dropdown';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import countries_all from "../../css/country.json";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useMountEffect } from 'primereact/hooks';
import { Messages } from 'primereact/messages';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { OrderList } from 'primereact/orderlist';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { Slider } from 'primereact/slider';


export default function Admin() {
  const prefix_api = 'http://localhost:3000/coins/download/';
  const [products, setProducts] = useState([]);
  const countries = countries_all;

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};


  const [filters, setFilters] = useState({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      'Name': { value: null, matchMode: FilterMatchMode.CONTAINS },
      'Country': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      'Status': { value: null, matchMode: FilterMatchMode.EQUALS },
      'Stock': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
};


const clearFilter = () => {
  setFilters();
};

const renderHeader = () => {
  return (

    <div className="flex justify-content-between">
    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
    <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
    </span>
    </div>
  );
};




  const itemTemplate = (item) => {
    return (
        <div className="flex align-items-center gap-4">
        <div className={`fi fi-${item.Code}`} style={{ width: "40px" }}>
        {/* <span>{item.Country}</span> */}
          <div style={{ paddingLeft: "40px" }}>
          {item.Country}
          </div>
        </div>
        </div>
    );
};

const imageTemplate = (products) => {
  return <img className="w-9 sm:w-16rem xl:w-8rem shadow-2 block xl:block mx-auto border-round" 
  src={`http://localhost:3000/coins/download/${products.Photo1}`} alt={products.Photo1} />
};

// type FilterFunction<T> = (element: T) => boolean;
// function filterArray<T>(arr: T[], predicate: FilterFunction<T>): T[] {s
//   return arr.filter(predicate);
// }
  const fetchCoinData = () => {
    fetch("http://localhost:3000/coins")
        .then(response => {
            return response.json()
        })
        .then(coins => {
            setProducts(coins)
        })
}

useEffect(() => {
     fetchCoinData()
}, [])

const header = renderHeader();


const stockFilterTemplate = (options) => {
  return <InputNumber value={options.value} onChange={(e) => 
    options.filterCallback(e.value, options.index)} 
    mode="currency" currency="USD" />;
};



const stockBodyTemplate = (product) => {
  return <Tag value={`Stock: ${product.Stock}`} severity={getSeverity(product)}></Tag>;
};

const getSeverity = (product) => {
if (product.Stock > 0 && product.Stock <=5) {
  return 'warning';
}
if ( product.Stock >5 ) {
  return 'success';
}
if ( product.Stock =0 ) {
  return 'danger';
}
};

const getStatus = (product) => {

  console.log(product)
  // console.log(product.status)
  switch (product) {
    case 'VG/G':
        return 'danger';

    case 'UNC/AUNC':
        return 'success';

    case 'VF/F':
        return 'info';
}
  };

const statusItemTemplate = (option) => {
  return <Tag value={option} severity={getSeverity(option)} />;
};

const [statuses] = useState(['UNC/AUNC','VF/F' , 'VG/G']);


const statusBodyTemplate = (product) => {
  return <Tag value={`Status: ${product.Status}`} severity={getStatus(product.Status)}></Tag>;
};

const statusRowFilterTemplate = (options) => {
  return (
      <Dropdown value={options.value} options={statuses} 
      onChange={(e) => options.filterApplyCallback(e.value)} 
      placeholder="Select One" 
      className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
  );
};
 
  return (
    <PrimeReactProvider>

      <Menu activatedIndex={4} />
      <div>Admin Page</div>

      <div className="card">
            <DataTable value={products} paginator rows={10}  
            globalFilterFields={['Country','Status']}
            dataKey="id"
            filters={filters} filterDisplay="row"
            header={header}
            tableStyle={{ minWidth: '50rem' }}>
                <Column header="Image" body={imageTemplate}></Column>
                <Column field="Name" filterField="Name" filter filterPlaceholder="Search by name" 
                header="Name"></Column>
                <Column header="Country" filterField="Country" style={{ minWidth: '12rem' }} 
                body={itemTemplate} filter filterPlaceholder="Search by country" />
                
                <Column field="Stock" 
                body={stockBodyTemplate} 
                filter filterElement={stockFilterTemplate}
                filterField="Stock"
                dataType="numeric"
                style={{ minWidth: '10rem' }}
                header="Stock"></Column>
                
                <Column field="Status" header="Status" 
                filterField="Status"
                body={statusBodyTemplate}
                showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} 
                style={{ minWidth: '12rem' }} 
                filter filterElement={statusRowFilterTemplate}
                ></Column>
              
            </DataTable>
        </div>
  
      
    </PrimeReactProvider>

  )
}