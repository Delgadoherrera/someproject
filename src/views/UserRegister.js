import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../assets/Form.css'
import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios'
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { useAuthContext } from "../contexts/authContext"


export default function ReactFinalFormDemo() {
  const { login } = useAuthContext();
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState('');






  console.log(formData)


  const validate = (data) => {
    let errors = {};

    if (!data.name) {
      errors.name = 'Name is required.';
    }
    
    if (!data.telefono) {
      errors.name = 'Phone is required.';
    }

    if (!data.apellido) {
      errors.name = 'Lastname is required.';
    }

    if (!data.email) {
      errors.email = 'Email is required.';
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = 'Invalid email address. E.g. example@email.com';
    }

    if (!data.password) {
      errors.password = 'Password is required.';
    }

    if (!data.accept) {
      errors.accept = 'You need to agree to the terms and conditions.';
    }

    return errors;
  };
  const onSubmit = (data, form) => {
    setFormData(data);
    setShowMessage(true);
    console.log(formData)

    /* 
        form.restart(); */
  };

  useEffect(function (onSubmit) {
    /*  setFormData(formData) */

    /*     sendData() */

  }, [onSubmit]);

  function firstLogin() {
    console.log('envio de datos')
    const sendData = async () => {

      if (formData === undefined) {
        console.log('es undefined')
        console.log('formData aqui: ', formData)
      }

      else if (formData !== '') {
        let res = await axios.post("http://localhost:4000/usuario/register", formData).then((response) => {
          console.log('response Api:', response)
          if (response.status === 200) {
            localStorage.setItem('usuario', response.data.nombre)
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('apellido', response.data.apellido)
            localStorage.setItem('id', response.data.id)
          

            if (localStorage.email === response.data.email)
              login();
          }
          else if (res.status !== 200) {
            console.log('error')
          }

        })
      }
    }
    sendData()
    setShowMessage(false)
  }
  console.log(formData)

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };

  const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={firstLogin} /></div>;
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  return (
    <div className="form-demo">
      <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
        <div className="flex align-items-center flex-column pt-6 px-3">
          <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
          <h5>Registration Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
            Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days without activation. Please check <b>{formData.email}</b> for activation instructions.
          </p>
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className="cardRegister">
          <h5 className="text-center">Registrate</h5>
          <Form onSubmit={onSubmit} initialValues={{ name: '', email: '', password: '', date: null, apellido:'', telefono:'', country: null, accept: false }} validate={validate} render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="p-fluid">

              <Field on name="name" render={({ input, meta }) => (
                <div className="field">
                  <span className="p-float-label">
                    <InputText id="name" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                    <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Nombre*</label>
                  </span>
                  {getFormErrorMessage(meta)}
                </div>
              )} />
              <Field on name="apellido" render={({ input, meta }) => (
                <div className="field">
                  <span className="p-float-label">
                    <InputText id="apellido" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                    <label htmlFor="apellido" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Apellido*</label>
                  </span>
                  {getFormErrorMessage(meta)}
                </div>
              )} />
              <Field on name="telefono" render={({ input, meta }) => (
                <div className="field">
                  <span className="p-float-label">
                    <InputText id="telefono" {...input} autoFocus type="number" className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                    <label htmlFor="telefono" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Telefono*</label>
                  </span>
                  {getFormErrorMessage(meta)}
                </div>
              )} />

              <Field name="email" render={({ input, meta }) => (
                <div className="field">
                  <span className="p-float-label p-input-icon-right">
                    <i className="pi pi-envelope" />
                    <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                    <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email*</label>
                  </span>
                  {getFormErrorMessage(meta)}
                </div>
              )} />
              <Field name="password" render={({ input, meta }) => (
                <div className="field">
                  <span className="p-float-label">
                    <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter} />
                    <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Contraseña*</label>
                  </span>
                  {getFormErrorMessage(meta)}
                </div>
              )} />
              <Field name="date" render={({ input }) => (
                <div className="field">
                  <span className="p-float-label">
                    <Calendar id="date" {...input} dateFormat="dd/mm/yy" showIcon />
                    <label htmlFor="date">Fecha de nacimiento</label>
                  </span>
                </div>
              )} />
              <Field name="accept" type="checkbox" render={({ input, meta }) => (
                <div className="field-checkbox">
                  <Checkbox inputId="accept" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                  <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid(meta) })}>I agree to the terms and conditions*</label>
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