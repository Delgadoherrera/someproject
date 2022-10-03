import React from "react";
import { useState } from 'react'
import PrivateNavbar from './PrivateNavbar'
import '../assets/Home.css'
const nurse1 = require('../assets/img/tomandoManos.jpg')


export default function Private() {
    const [state, setState] = useState()


    return (
        <div>
            <PrivateNavbar />
            <img src={nurse1} className='fotoPrincipal' />
        </div>
    )
} 