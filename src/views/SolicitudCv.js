/* import CardDemo from './Card'; */
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';





export default function SolicitudCvView({ onSubmit, validate, countries, oficio, experiencia, selectedHandler }) {


    

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

                            <Field name="date" render={({ input }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Calendar id="date" {...input} dateFormat="dd/mm/yy" showIcon />
                                        <label htmlFor="date">Fecha de nacimiento</label>
                                    </span>
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

                            <Field on name="telefono" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText type="number" id="telefono" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="telefono" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Telefono*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="country" render={({ input }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Dropdown id="country" {...input} options={countries} optionLabel="name" />
                                        <label htmlFor="country">Localidad</label>
                                    </span>
                                </div>
                            )} />
                            <Field name="oficio" render={({ input }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Dropdown {...input} className='field' autoFocus htmlFor="oficio" options={oficio} /* onChange={experienceChange}  */ optionLabel="oficio" placeholder="En que area deseas postularte?" />
                                        <label htmlFor="oficio">Aplicar como personal: </label>
                                    </span>
                                </div>
                            )} />

                            <Field name="experiencia" render={({ input }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Dropdown {...input} className='field' autoFocus htmlFor="experiencia" options={experiencia} /* onChange={experienceChange}  */ optionLabel="cantidad" placeholder="Tenes experiencia?" />
                                        <label htmlFor="experiencia">Experiencia</label>
                                    </span>
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