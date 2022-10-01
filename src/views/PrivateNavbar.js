import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../assets/NavBar.css';
import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import SolicitudCv from './SolicitudCvLogic'
import { useAuthContext } from "../contexts/authContext";
import Pacientes from './Pacientes'
import Personal from './Personal'
import Curriculums from './Curriculums'





export default function MenubarDemo() {

    const { logout } = useAuthContext();


    const [state, setState] = useState([]);


    const items = [
        {
            label: 'Servicios',
            icon: 'pi pi-fw pi-file',
            items: [
                {
                    label: 'Corporativos',
                    icon: 'pi pi-fw pi-plus',
                    command: (event) => {
                        setState(event.item)
                    },
                    items: [
                        {
                            label: 'Centros de rehabilitacion',
                            command: (event) => {
                                setState(event.item)
                            },
                            icon: 'pi pi-fw pi-bookmark'
                        },
                        {
                            label: 'Obras sociales / Prepagas',
                            command: (event) => {
                                setState(event.item)
                            },
                            icon: 'pi pi-fw pi-video'
                        },

                    ]
                },
                {
                    label: 'Particulares',
                    icon: 'pi pi-fw pi-trash',
                    items: [
                        {
                            label: 'Internacion domiciliaria',
                            items: [
                                {
                                    label: 'Pediatria',
                                    command: (event) => {
                                        setState(event.item)
                                    },
                                },
                                {
                                    label: 'Adultos mayores',
                                    command: (event) => {
                                        setState(event.item)
                                    },
                                },
                                {
                                    label: 'Cuidados paliativos',
                                    command: (event) => {
                                        setState(event.item)
                                    },
                                },
                                {
                                    label: 'Rehabilitacion',
                                    command: (event) => {
                                        setState(event.item)
                                    },
                                }
                            ],
                        },
                        {
                            label: 'Servicios',
                            items: [
                                {
                                    label: 'Test a domiclio',
                                    command: (event) => {
                                        setState(event.item)
                                    },
                                },
                                {
                                    label: 'Vacunacion a domicilio',
                                    command: (event) => {
                                        setState(event.item)
                                    },
                                },
                                {
                                    label: 'Enfermeria a domicilio',
                                    command: (event) => {
                                        setState(event.item)
                                    },
                                },
                                {
                                    label: 'Kinesiologia a domicilio',
                                    command: (event) => {
                                        setState(event.item)
                                    },
                                },
                                {
                                    label: 'Medico a domicilio',
                                    command: (event) => {
                                        setState(event.item)
                                    },
                                },
                            ]
                        },
                    ]

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
            icon: 'pi pi-fw pi-pencil',

        },
        {
            label: 'Trabaja con nosotros',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Carga tu solicitud',
                    command: (event) => {
                        setState(event.item)
                    },
                    icon: 'pi pi-fw pi-user-plus',

                },
                {
                    label: 'Consultanos',
                    command: (event) => {
                        setState(event.item)
                    },
                    icon: 'pi pi-fw pi-user-minus',

                },
            ]
        },

        {


            label: 'Contactanos',
            icon: 'pi pi-fw pi-calendar',
            items: [
                {
                    label: 'Whatsapp',
                    command: (event) => {
                        setState(event.item)
                    },
                    url: 'https://api.whatsapp.com/send?phone=34123456789',
                    icon: 'pi pi-fw pi-pencil',
                },
                {
                    label: 'Email',
                    command: (event) => {
                        setState(event.item)
                    },
                    icon: 'pi pi-fw pi-calendar-times',
                }
            ]
        },

        {
            label: 'Gestiones administrativas',
            icon: 'pi pi-fw pi-power-off',
            items: [
                {
                    label: 'Mis gestiones',
                    command: (event) => {
                        setState(event.item)
                    },
                    icon: 'pi pi-fw pi-pencil',
                },
                {
                    label: 'Facturacion',
                    icon: 'pi pi-fw pi-calendar-times',
                    items: [
                        {
                            label: 'Cargar factura'
                        }
                    ]
                },
                {
                    label: 'Cargar historia clinica (Solo vista para el personal)',
                    icon: 'pi pi-fw pi-calendar-times',
                }, {
                    label: 'Mis recibos',
                    icon: 'pi pi-fw pi-calendar-times',
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
    const itemsAdmin = [
     /*    {
            label: 'Pacientes',
            icon: 'pi pi-fw pi-file',
            command: (event) => {
                setState(event.item)
            } */
            /*   items: [
                  {
                      label: 'Pacientes',
                      icon: 'pi pi-fw pi-plus',
                      command: (event) => {
                          setState(event.item)
                      },
                      items: [
                          {
                              label: 'Centros de rehabilitacion',
                              command: (event) => {
                                  setState(event.item)
                              },
                              icon: 'pi pi-fw pi-bookmark'
                          },
                          {
                              label: 'Obras sociales / Prepagas',
                              command: (event) => {
                                  setState(event.item)
                              },
                              icon: 'pi pi-fw pi-video'
                          },
  
                      ] 
                  },
                  {
                      label: 'Particulares',
                      icon: 'pi pi-fw pi-trash',
                      items: [
                          {
                              label: 'Internacion domiciliaria',
                              items: [
                                  {
                                      label: 'Pediatria',
                                      command: (event) => {
                                          setState(event.item)
                                      },
                                  },
                                  {
                                      label: 'Adultos mayores',
                                      command: (event) => {
                                          setState(event.item)
                                      },
                                  },
                                  {
                                      label: 'Cuidados paliativos',
                                      command: (event) => {
                                          setState(event.item)
                                      },
                                  },
                                  {
                                      label: 'Rehabilitacion',
                                      command: (event) => {
                                          setState(event.item)
                                      },
                                  }
                              ],
                          },
                          {
                              label: 'Servicios',
                              items: [
                                  {
                                      label: 'Test a domiclio',
                                      command: (event) => {
                                          setState(event.item)
                                      },
                                  },
                                  {
                                      label: 'Vacunacion a domicilio',
                                      command: (event) => {
                                          setState(event.item)
                                      },
                                  },
                                  {
                                      label: 'Enfermeria a domicilio',
                                      command: (event) => {
                                          setState(event.item)
                                      },
                                  },
                                  {
                                      label: 'Kinesiologia a domicilio',
                                      command: (event) => {
                                          setState(event.item)
                                      },
                                  },
                                  {
                                      label: 'Medico a domicilio',
                                      command: (event) => {
                                          setState(event.item)
                                      },
                                  },
                              ]
                          },
                      ]
  
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
              ] */
    /*     }, */

        /* {
            label: 'Quienes somos?',
            command: (event) => {
                setState(event.item)
            },
            icon: 'pi pi-fw pi-pencil',

        },
        {
            label: 'Trabaja con nosotros',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Carga tu solicitud',
                    command: (event) => {
                        setState(event.item)
                    },
                    icon: 'pi pi-fw pi-user-plus',

                },
                {
                    label: 'Consultanos',
                    command: (event) => {
                        setState(event.item)
                    },
                    icon: 'pi pi-fw pi-user-minus',

                },
            ]
        },

        {


            label: 'Contactanos',
            icon: 'pi pi-fw pi-calendar',
            items: [
                {
                    label: 'Whatsapp',
                    command: (event) => {
                        setState(event.item)
                    },
                    url: 'https://api.whatsapp.com/send?phone=34123456789',
                    icon: 'pi pi-fw pi-pencil',
                },
                {
                    label: 'Email',
                    command: (event) => {
                        setState(event.item)
                    },
                    icon: 'pi pi-fw pi-calendar-times',
                }
            ]
        }, */

        {
            label: 'Gestiones administrativas',
            icon: 'pi pi-fw pi-power-off',
            items: [
                {
                    label: 'Pacientes',
                    command: (event) => {
                        setState(event.item)
                    },
                    icon: 'pi pi-fw pi-pencil',
                },
                {
                    label: 'Personal',
                    icon: 'pi pi-fw pi-calendar-times',
                    command: (event) => {
                        setState(event.item)
                    },
                /*     items: [
                        {
                            label: 'Cargar factura'
                        }
                    ] */
                },
                {
                    label: 'Ver curriculums',
                    icon: 'pi pi-fw pi-calendar-times',
                    command: (event) => {
                        setState(event.item)
                    },
                }, {
                    label: 'Mis recibos',
                    icon: 'pi pi-fw pi-calendar-times',
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
            <div className="card">
                {localStorage.tipoUsuario === '2' ? <Menubar model={itemsAdmin} start={start} end={end} /> : <Menubar model={items} start={start} end={end} />}

            </div>


            {state.label === "Carga tu solicitud" ? <SolicitudCv /> : <p>  </p>}
            {state.label === "Pacientes" ? <Pacientes /> : <p>  </p>}
            {state.label === "Personal" ? <Personal /> : <p>  </p>}
            {state.label === "Ver curriculums" ? <Curriculums /> : <p>  </p>}
        </div >

    );
}
