import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../assets/Form.css'
import '../assets/FacturaUpload.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { classNames } from 'primereact/utils';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { useNavigate, useRouteLoaderData } from "react-router-dom";




export default function ReactFinalFormDemo({ idValue, imagenFactura }) {


    const [file, setFile] = useState()
    const [successful, setSuccessful] = useState(false)
    const [apiResponse, setApiResponse] = useState(false)
    const [facturaId, setFacturaId] = useState(0)
    const [enviada, setEnviada] = useState(false)
    const selectedHandler = e => {
        setFile(e.target.files[0])
        /*   console.log('del select handler', e.target.files[0]) */
    }
    const navigate = useNavigate()

    const validate = (data) => {
        let errors = {};
        /*        if (!data.name) {
                   errors.name = 'Name is required.';
               }
      */
    };


    const onSubmit = async (data, form) => {
        data.preventDefault()
        setSuccessful(true)
        sendData()

    };

    useEffect(function (onSubmit) {
        setFacturaId(idValue)
    }, [idValue]);

    useEffect(function () {

        if (enviada === true) {
            window.location.reload()
        }

    }, [enviada]);

    console.log('valorId usfx', idValue)


    const sendData = () => {

        const finalValues = new FormData();
        finalValues.append('file', file)

        axios.post(`http://localhost:4000/paciente/facturacion/uploadFactura/${idValue}`, finalValues, {
        }).then((response) => {
            console.log('response Api:', response)

        })
        setEnviada(true)
        setSuccessful(false)
    }





    useEffect(function (onSubmit) {
        setFacturaId(idValue);
     


    }, [onSubmit]);

    console.log('imagenFActura', imagenFactura)
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;

    };
    return (


        <div className="form-demo">
            <div className="flex justify-content-center">
                <div className="cardRegister">
                    <h5 className="text-center">Factura actual:</h5>
                    <iframe className='iframe' src={imagenFactura} alt='aqui nada' />

                    <Form onSubmit={onSubmit}/*  initialValues={{}}  */ validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={onSubmit} className="p-fluid">

                            <Field  on name="idFactura" render={({ input, meta }) => (
                                <div className="field" hidden>
                                    <span className="p-float-label">
                                        <InputText id="idFactura" disabled value={idValue}   {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="idFactura" className={classNames({ 'p-error': isFormFieldValid(meta) })}></label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Field name="file" render={({ input }) => (
                                <div className="field">
                                    <span className="p-float-label">

                                        <label htmlFor="fichero" className="circle" name='file'> </label>
                                        <input id="fichero" onChange={selectedHandler} className="form-control" type="file" name='file' autoFocus />
                                    </span>
                                </div>
                            )} />

                            <Button type="submit" label="Aceptar" className="mt-2 aceptarButton" />

                        </form>


                    )} />
                </div>
            </div>
        </div>

    );
}