import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';


import React, { useState, useEffect, useRef } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { ProductService } from '../services/RecibosPacientesService';
import '../assets/RecibosPacientes.css';

export default function DataScrollerLoaderDemo () {
    const [products, setProducts] = useState([]);
    const ds = useRef(null);
    const productService = new ProductService();

    useEffect(() => {
        productService.getProducts().then(data => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const itemTemplate = (data) => {
        return (
            <div className="product-item">
                <img src={`images/product/${data.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                <div className="product-detail">
                    <div className="product-name">{data.name}</div>
                    <div className="product-description">{data.description}</div>
              {/*       <Rating value={data.rating} readOnly cancel={false}></Rating> */}
                    <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.category}</span>
                </div>
                <div className="product-action">
   {/*                  <span className="product-price">${data.price}</span> */}
                    <Button icon="pi pi-shopping-cart" label="Ver recibo" disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button>
                 {/*    <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span> */}
                </div>
            </div>
        );
    }

    const footer = <Button type="text" icon="pi pi-plus" label="Load" onClick={() => ds.current.load()} />;

    return (
        <div className="datascroller-demo">
            <div className="cardRecibos">
                <DataScroller className='dataScroll' ref={ds} value={products} itemTemplate={itemTemplate} rows={5}
                    loader footer={footer} header="Historial de Recibos" />
            </div>
        </div>
    );
}
