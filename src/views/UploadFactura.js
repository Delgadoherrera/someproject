import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../assets/Form.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import '../assets/FileUpload.css'
import { CitiesService } from '../services/CitiesService';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';



export default function ReactFinalFormDemo({ idValue }) {

    const [formData, setFormData] = useState('');
    const [file, setFile] = useState()
    const [successful, setSuccessful] = useState(false)
    const [apiResponse, setApiResponse] = useState(false)
    const [facturaId, setFacturaId] = useState(0)

    const selectedHandler = e => {
        setFile(e.target.files[0])
        /*   console.log('del select handler', e.target.files[0]) */
    }


    const validate = (data) => {
        let errors = {};
        /*        if (!data.name) {
                   errors.name = 'Name is required.';
               }
      */
    };


    const onSubmit = async (data, form) => {
        setFormData(file);
        setFormData(data);
    };

    useEffect(function (onSubmit) {
        setFacturaId(idValue)
    }, [idValue]);

    console.log('valorId usfx', idValue)

    useEffect(function (onSubmit) {
        if (apiResponse === true) {
            setSuccessful(true)
        }
    }, [apiResponse]);

    useEffect(function (onSubmit) {
        setFormData(file)
        setFacturaId(idValue);
        setFormData(formData)
        const sendData = async () => {
            setApiResponse(true)
            const finalValues = new FormData();
            finalValues.append('file', file)

            await axios.post("http://localhost:4000/paciente/facturacion/uploadFactura", file, {
            }).then((response) => {
                console.log('response Api:', response)



            })

        }
        sendData()

    }, [ formData]);


    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;

    };
    return (

        <div className="form-demo">
            <div className="flex justify-content-center">
                <div className="cardRegister">
                    <h5 className="text-center">Carga tu solucitud</h5>
                    <Form onSubmit={onSubmit} initialValues={{ name: '', email: '', telefono: '', experiencia: '', date: null, country: null, oficio: null }} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">

                            <Field on name="idFactura" render={({ input, meta }) => (
                                <div className="field">
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

                                        <label htmlFor="fichero" className="circle"> </label>
                                        <input id="fichero" onChange={selectedHandler} className="form-control" type="file" name='file' autoFocus />
                                    </span>
                                </div>
                            )} />
                            <Field name="accept" type="checkbox" render={({ input, meta }) => (
                                <div className="field-checkbox">
                                    <Checkbox inputId="accept" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) }, 'otraclase')} />
                                    <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid(meta) }, 'otraclase')}>He verificado los datos*</label>
                                </div>
                            )} />

                            <Button type="submit" label="Submit" className="mt-2" />

                        </form>


                    )} />
                </div>
            </div>
        </div>
    );
}