import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../assets/PrivateNavbar.css';
import React, { useState, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import SolicitudCv from './SolicitudCvLogic'
import { useAuthContext } from "../contexts/authContext";
import Pacientes from './Pacientes'
import Personal from './Personal'
import Curriculums from './Curriculums'
import Corporativos from './Corporativos'
import QuienesSomos from './QuienesSomos'
import ServiciosParticulares from './ServiciosParticulares'
import RecibosPacientes from './RecibosPacientes'
import SolicitarPresupuesto from './SolicitarPresupuesto'
import 'primeicons/primeicons.css';





export default function MenubarDemo({ cvEnviado }) {

    const { logout } = useAuthContext();


    const [state, setState] = useState([]);

    useEffect(() => {
        console.log(cvEnviado)

    }, [cvEnviado]);



    const items = [
        {
            label: 'Servicios',
       /*      icon: 'pi pi-heart-fill', */
            items: [
                {
                    label: 'Corporativos',
                    icon: 'pi pi-shield',
                    command: (event) => {
                        setState(event.item)
                    },

                },
                {
                    label: 'Particulares',
                    icon: 'pi pi-home',
                    command: (event) => {
                        setState(event.item)
                    },

                },
                {
                    separator: true
                },
                {
                    label: 'Solicitar presupuesto',
                    command: (event) => {
                        setState(event.item)
                    },
                    icon: 'pi pi-fw pi-external-link'
                }
            ]
        },

        {
            label: 'Quienes somos?',
            command: (event) => {
                setState(event.item)
            },
      /*       icon: 'pi pi-tags', */

        },
        {
            label: 'Trabaja con nosotros',
    /*         icon: 'pi pi-map-marker', */
            items: [
                {
                    label: 'Carga tu solicitud',
                    command: (event) => {
                        setState(event.item)
                    },
                    icon: 'pi pi-fw pi-user-plus',

                },

            ]
        },

        {


            label: 'Contactanos',
        /*     icon: 'pi pi-pencil', */
            items: [
                {
                    label: 'Whatsapp',
                    command: (event) => {
                        setState(event.item)
                    },
                    url: 'https://api.whatsapp.com/send?phone=34123456789',
                    icon: 'pi pi-whatsapp',
                },
                {
                    label: 'Email',
                    command: (event) => {
                        setState(event.item)
                    },
                    icon: 'pi pi-envelope',
                }
            ]
        },

        {
            label: 'Gestiones administrativas',
/*             icon: 'pi pi-user-edit ', */
            items: [
                {
                    label: 'Cargar factura ',
                    icon: 'pi pi-fw pi-calendar-times',
                }, {
                    label: 'Mis recibos',
                    icon: 'pi pi-fw pi-calendar-times',
                    command: (event) => {
                        setState(event.item)
                    },
                }
            ]
        },
        {
            label: 'Cerrar Sesion',
            command: () => {
                logout()
            },
   /*          icon: 'pi pi-fw pi-power-off' */
        }
    ];
    const itemsAdmin = [
        {
            label: 'Gestiones administrativas',
            icon: 'pi pi-fw pi-power-off',
            items: [
                {
                    label: 'Pacientes',
                    url: '/private/pacientes',
                    icon: 'pi pi-user-minus',
                },
                {
                    label: 'Personal',
                    icon: 'pi pi-user',
                    url: '/private/personal',
                },
                {
                    label: 'Ver curriculums',
                    icon: 'pi pi-align-justify',
                    url: '/private/curriculums'
                }, {
                    label: 'Mis recibos',
                    icon: 'pi pi-book',
                    url: '/private/recibos'
                }
            ]
        },
        {
            label: 'Cerrar Sesion',
            command: () => {
                logout()
            },
            icon: 'pi pi-fw pi-power-off'
        }
    ];

    const start = <img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="mr-2"></img>;
    const end = <InputText placeholder="Search" type="text" />;

    return (
        < div >
            <div className="PrivateNavbar">
                {localStorage.tipoUsuario === '2' ? <Menubar model={itemsAdmin} /* start={start} end={end} */ /> : <Menubar className='PrivateNavbar' model={items} /* start={start} end={end}  */ />}

            </div>

            {state.label === "Carga tu solicitud" ? <SolicitudCv /> : <p>  </p>}
            {state.label === "Pacientes" ? <Pacientes /> : <p>  </p>}
            {state.label === "Personal" ? <Personal /> : <p>  </p>}
            {state.label === "Ver curriculums" ? <Curriculums /> : <p>  </p>}
            {state.label === "Corporativos" ? <Corporativos /> : <p>  </p>}
            {state.label === "Quienes somos?" ? <QuienesSomos /> : <p>  </p>}
            {state.label === "Particulares" ? <ServiciosParticulares /> : <p>  </p>}
            {state.label === "Mis recibos" ? <RecibosPacientes /> : <p>  </p>}
            {state.label === "Solicitar presupuesto" ? <SolicitarPresupuesto /> : <p>  </p>}
        </div >

    );
}