import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../assets/CardServices.css'
import '../assets/CardServices.css'
import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom'
import imagen from '../assets/img/doctorFreepik.jpg'
import enfermeros from '../assets/img/enfermera6.jpg'
import kinesiologos from '../assets/img/kinesio1.jpg'
import radiologos from '../assets/img/radiologo1.jpg'


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
            <Card title="Médicos" subTitle=" Especialistas de todas las áreas lo atenderán en forma presencial o por telemedicina; es el ofrecimiento  de servicios médicos a distancia, utilizando para ello tecnologías de  información y  comunicación. 

Por lo tanto, en cualquier lugar del mundo donde se encuentre puede recibir asistencia." style={{
                    width: '30em',
                    margin: '1rem'
                }} footer={footer} header={ <img alt="Card" src={imagen} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />} >
            </Card>
            <Card title="Enfermeros" subTitle=" Respondiendo a la complejidad de las prestaciones se asignará personal profesional o auxiliares según sea el caso, siempre previa visita de la Coordinadora quien chequeará que el domicilio o la institución donde esté alojado cuente con los medios adecuados para su atención segura." style={{
                width: '30em',
                margin: '1em'
            }} footer={footer} header={<img alt="Card" src={enfermeros} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />} >
            </Card>
            <Card title="Kinesiólogos" subTitle="Además de dedicarse a rehabilitar pacientes con problemas motrices o de movimiento corporal, la necesidad del tratamientos por  problemas respiratorios que estamos transitando colocan en un rol de relevancia a estos profesionales.
                " style={{
                    width: '30em',
                    margin: '1em'
                }} footer={footer} header={<img alt="Card" src={kinesiologos} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />} >
            </Card>
            <Card title="Otros Profesionales" subTitle="
            Nuestro equipo esta conformado por un equipo multidisciplinario de profesionales, entre los que se encuentran:            
                        Fonoaudiólogos, psicólogos, meditación presencial y a distancia,  terapista ocupacional, asistente social,  radiólogos. laboratorio . hisopados, electrocardiogramas"
                style={{
                    width: '30em',
                    margin: '1em'
                }} footer={footer} header={<img alt="Card" src={radiologos} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />} >

            </Card>

        </div>
    )
}
