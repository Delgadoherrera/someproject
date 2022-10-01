import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../assets/Card.css'
import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom'


export default function CardDemo() {
/*     const header = (
        <img alt="Card" src="images/usercard.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
    ); */
    const footer = (
        <span>
            <Link to='/'>
                <Button label="Cerrar" icon="pi pi-times" />
                {/*     <Button label="Cancel" icon="pi pi-check" className="p-button-secondary ml-2" />  */}
            </Link>
        </span>
    );


    return (

        <div>
            <Card title="Solicitud enviada con éxito!" subTitle="Revisaremos su solicitud y nos estaremos poniendo en contacto, muchas gracias!" style={{
                width: '25em',
                margin: 'auto'
            }} footer={footer} /* header={header} */>
                <p className="m-0" style={{ lineHeight: '1.5' }}>En CALM S.R.L Prestamos especial atencion en las solicitudes de empleo, esta compañia
                    se basa en la integridad de todos los que participan en ella.</p>
            </Card>

        </div>
    )
}
