import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../assets/CardServices.css'
import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom'
import imagen from '../assets/img/doctorFreepik.jpg'


export default function CardDemo() {
    const header = (
        <img alt="Card" src={imagen} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
    );
    const footer = (
        <span>
            <Link to='/'>
                <Button label="Enviar solicitud" icon="pi pi-times" />
                {/*     <Button label="Cancel" icon="pi pi-check" className="p-button-secondary ml-2" />  */}
            </Link>
        </span>
    );


    return (

        <div className='contenedorServicios'>
            <Card title="Pediatria" subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat
                    libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat
                    libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!" style={{
                width: '30em',
                margin: '1rem'
            }} footer={footer} header={header} >
                <p className="m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat
                    libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                </p>
            </Card>
            <Card title="Adultos mayores" subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat
                    libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat
                    libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!" style={{
                width: '30em',
                margin: '1em'
            }} footer={footer} header={header} >
                <p className="m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat
                    libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                </p>
            </Card>
            <Card title="Rehabilitacion" subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat
                    libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat
                    libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!" style={{
                width: '30em',
                margin: '1em'
            }} footer={footer} header={header} >
                <p className="m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat
                    libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                </p>
            </Card>
            <Card title="Rehabilitacion" subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat
                    libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat
                    libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!" style={{
                width: '30em',
                margin: '1em'
            }} footer={footer} header={header} >
                <p className="m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat
                    libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                </p>
            </Card>

        </div>
    )
}
