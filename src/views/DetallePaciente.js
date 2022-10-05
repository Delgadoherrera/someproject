
import '../assets/Home.css'
import axios from 'axios'
import React, { useState, useEffect, useRef, } from 'react';
import GestionPaciente from './GestionPaciente'

const nurse1 = require('../assets/img/tomandoManos.jpg')


export default function DetallePaciente({ product }) {
    const [products, setProducts] = useState(null);
    const [facturas, setFacturas] = useState(null);
    const [toggle, setToggle] = useState(true)


    useEffect(() => {
        fetch(`http://localhost:4000/detallepaciente/${product.id}`).then(res => res.json()).then(d => setProducts(d.data));
        fetch(`http://localhost:4000/paciente/facturacion/${product.id}`).then(res => res.json()).then(d => setFacturas(d.data));
/*         console.log('buscando por id Detallepaciente; ')
 */
    }, [toggle]);

    useEffect(() => {
        setToggle(!toggle)
        setProducts(product)
    }, [product]);


/* 
    console.log('detallePaciente: products', products)
    console.log('detallePaciente: facturas', facturas) */
    return (
        <div>
           <GestionPaciente facturas={facturas} products={products} />
        </div>

    )
}

