import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../assets/NuevaFactura.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import '../assets/FileUpload.css'

import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';



export default function ReactFinalFormDemo({ products, element }) {

    const [formData, setFormData] = useState('');
    const [successful, setSuccessful] = useState(false)
    const [apiResponse, setApiResponse] = useState(false)


    const validate = (data) => {
        let errors = {};

        if (!data.name) {
            errors.name = 'Name is required.';
        }

        if (!data.email) {
            errors.email = 'Email is required.';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Invalid email address. E.g. example@email.com';
        }

        if (!data.accept) {
            errors.accept = 'You need to agree to the terms and conditions.';
        }

        return errors;
    };




    const onSubmit = (data, form) => {
        data.preventDefault();
        setFormData(data);
        setSuccessful(true)

    };
    console.log('products', element)

    useEffect(function (onSubmit) {

        /*    console.log('nueva factura id: ',products) */
        if (formData) {
            if (successful) {
                axios.post("http://localhost:4000/paciente/facturacion", {
                    idPaciente: element.id,
                    numeroFactura: formData.target[0].value,
                    fechaFactura: formData.target[1].value,
                    valor: formData.target[3].value,
                    notasVarias: formData.target[4].value,
                    status: formData.target[5].value,
                }).then((response) => {
                    console.log('response Api:', response)
                    setSuccessful(false)
                })

            }



        }
    }, [successful]);
    /* 
        useEffect(function (onSubmit) {
            if (apiResponse === true) {
                setSuccessful(true)
            }
        }, [apiResponse]); */

    /*     useEffect(function () {
    
            if (products.idPaciente) {
                setId(products[0].idPaciente)
            }
        }, [setId]); */




    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;

    };
    return (

        <div className="form-demo">
            <div className="flex justify-content-center">
                <div className="cardRegister">
                    <h5 className="text-center">Cargar una nueva factura</h5>

                    <Form onSubmit={onSubmit} initialValues={{ numeroFactura: 0, idPaciente: '', fechaFactura: null, valor: '', notasVarias: '', status: '' }} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={onSubmit} className="p-fluid">

                            <Field on name="numeroFactura" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="numeroFactura" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="numeroFactura" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Numero de factura</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Field name="fechaFactura" render={({ input }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Calendar id="fechaFactura" {...input} dateFormat="dd/mm/yy" showIcon />
                                        <label htmlFor="fechaFactura">Fecha de la factura</label>
                                    </span>
                                </div>
                            )} />
                            <Field name="valor" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <InputText id="valor" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="valor" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Valor</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Field on name="notasVarias" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="notasVarias" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="notasVarias" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Notas varias</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field on name="status" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="status" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="status" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Status</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
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