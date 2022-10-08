import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';
import '../assets/GestionPaciente.css';
import Facturacion from './Facturacion'


import React, { useState, useEffect } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';

export default function TabMenuDemo({ products, facturas }) {

    const [activeIndex, setActiveIndex] = useState(1);
    const [state, setState] = useState([]);
    const [id, setId] = useState('')


    useEffect(() => {

        setState(products)
        if (id.length > 0) {
            setId(state.id)

        }
    }, [products]); // 



/*     console.log('stateId: ', state)   */
 



    return (
        <div>
            <div className="detallePacienteDiv">
          
           <Facturacion  facturaId={state} facturas={facturas} dataValuesProducts={products}  />

            </div>

        </div>
    );
}
