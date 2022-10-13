import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef, } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../services/PacientesService.js';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import axios from 'axios'
import '../assets/Pacientes.css';
import Facturacion from './Facturacion'
import PrivateNavbar from './PrivateNavbar'
import EvolucionPaciente from './EvolucionPaciente'





export default function DataTableCrudDemo({ successfull }) {

    let emptyProduct = {
        id: '',
        nombre: '',
        precio: 0,
        nombreFamiliar: '',
        apellidoFamiliar: '',
        telefono: 0,
        email: '',
        patologia: '',
        asistente: '',
        valores: '',
        fechaInicio: '',
        fechaFinal: '',
        notasVarias: '',
        status: '',
        direccion: ''
    };
    const [saved, setSaved] = useState(false);
    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [detalleProducto, setdetalleProducto] = useState('')
    const [toggle, setToggle] = useState(false)
    const [toggleEvolucion, setToggleEvolucion] = useState(false)
    const toast = useRef(null);
    const dt = useRef(null);
    const productService = new ProductService();

    useEffect(() => {
        productService.getProducts().then(data => setProducts(data));
    }, [saved]);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    const saveProduct = () => {
        setSubmitted(true);

        if (product.nombre.trim()) {
            let _products = [...products];
            let _product = { ...product };

            if (product.id) {
                const index = findIndexById(product.id);
                axios.post("http://localhost:4000/pacientesList/edit", _product, {
                }).then((response) => {
                    console.log('response Api:', response)
                })
                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            }
            else {
                axios.post("http://localhost:4000/pacientesList/create", _product, {
                }).then((response) => {
                    console.log('response Api:', response)
                })
                _product.id = createId();
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);

        }
    }

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    }
    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }
    const deleteProduct = () => {
        let _products = products.filter(val => val.id !== product.id,
            axios.post("http://localhost:4000/pacientesList/destroy", product, {
            }).then((response) => {
                console.log('response Api:', response)
            }));
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }
    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    const importCSV = (e) => {
        const file = e.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const csv = e.target.result;
            const data = csv.split('\n');
            const cols = data[0].replace(/['"]+/g, '').split(',');
            data.shift();
            const importedData = data.map(d => {
                d = d.split(',');
                const processedData = cols.reduce((obj, c, i) => {
                    c = c === 'Status' ? 'inventoryStatus' : (c === 'Reviews' ? 'rating' : c/* .toLowerCase() */);
                    obj[c] = d[i].replace(/['"]+/g, '');
                    (c === 'precio' || c === 'rating') && (obj[c] = parseFloat(obj[c]));
                    return obj;
                }, {});
                processedData['id'] = createId();
                return processedData;
            });
            const _products = [...products, ...importedData];
            setProducts(_products);
        };
        reader.readAsText(file, 'UTF-8');
    }
    const exportCSV = () => {
        dt.current.exportCSV();
    }
    const confirmDeleteSelected = () => {
        /*         console.log('delete derechos') */
        setDeleteProductsDialog(true);
    }
    const deleteSelectedProducts = () => {
        let _products = products.filter(val => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        /*    console.log('productos:', products) */
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }
    const onCategoryChange = (e) => {
        let _product = { ...product };
        _product['category'] = e.value;
        setProduct(_product);
    }
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    }
    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    }
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>

                <Button label="Alta paciente" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                {/*              <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} /> */}
            </React.Fragment>
        )
    }
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php" accept=".csv" chooseLabel="Importar" className="mr-2 inline-block" onUpload={importCSV} />
                <Button label="Exportar" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }
    const imageBodyTemplate = (rowData) => {
        return <img src={`images/product/${rowData.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />
    }
    const precioBodyTemplate = (rowData) => {
        return formatCurrency(rowData.precio);
    }
    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    }
    const statusBodyTemplate = (rowData) => {
        return <span className={`product-badge status-${rowData.inventoryStatus/* .toLowerCase() */}`}>{rowData.inventoryStatus}</span>;
    }
    const detallePaciente = (product) => {
        setProduct({ ...product });
        setdetalleProducto({ ...product });
        setToggle(!toggle)
    }
    const evolucionPaciente = (product) => {
        setProduct({ ...product });
        setdetalleProducto({ ...product });
        setToggleEvolucion(!toggleEvolucion)
        setToggle(!toggle)
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {/*                 <Button icon="pi pi-book" className="p-button-rounded p-button-success mr-2" onClick={() => evolucionPaciente(rowData)} />
 */}                <Button icon="pi pi-book" className="p-button-rounded p-button-success mr-2" onClick={() => detallePaciente(rowData)} />
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header-pacientes">
            <h5 className="mx-0 my-1 tituloEvolucion"> <span>Gestion de pacientes </span></h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar paciente" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    const togglear = () => {
        setToggle(!toggle)

    }

    console.log('desde pacientes', successfull)

    return (

        <div className="datatable-crud-demo">

            <PrivateNavbar />





            <Toast ref={toast} />




            <div className="card">




                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column hidden field="id" header="id" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column /* selectionMode="single" */ headerStyle={{ width: '1rem' }} exportable={false}></Column>
                    <Column field="nombre" header="Nombre del paciente" sortable style={{ minWidth: '5rem' }} />
                    <Column field="apellido" header="Apellido del paciente" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="nombreFamiliar" header="Nombre del familiar" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="apellidoFamiliar" header="Apellido del familiar" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="telefono" header="Telefono" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="direccion" header="Direccion" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="email" header="Email" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="patologia" header="Patologia" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="asistente" header="Asistente" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="fechaInicio" header="Fecha de inicio" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="fechaFinal" header="Fecha final" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="notasVarias" header="Notas varias" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="precio" header="precio" body={precioBodyTemplate} sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="valores" header="valores" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="status" header="status" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '15rem' }}></Column>
                </DataTable>
                {detalleProducto !== '' && toggle == ! false ? <Facturacion onClick={scroll.scrollToBottom({ behaivor: 'smooth', top: 100, left: 0, delay: 1, duration: 40 })} datafromPaciente={product} /> : <p> </p>}

                {toggle === true ? <i className='pi pi-caret-up toggleTouch' onClick={togglear} /> : <p></p>}
                {detalleProducto !== '' && toggle == ! false ? <EvolucionPaciente evolucionId={product.id} datosPaciente={product} /> : <p> </p>}

                {toggle === true ? <i className='pi pi-caret-up toggleTouch' onClick={togglear} /> : <p></p>}

            </div>

            <Dialog visible={productDialog} style={{ width: '450px' }} header="Alta de paciente" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`images/product/${product.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.image} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="nombre">Nombre del Paciente</label>
                    <InputText id="nombre" value={product.nombre} onChange={(e) => onInputChange(e, 'nombre')} autoFocus className={classNames({ 'p-invalid': submitted && !product.nombre })} />
                    {submitted && !product.nombre && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="apellido">Apellido del Paciente</label>
                    <InputText id="apellido" value={product.apellido} onChange={(e) => onInputChange(e, 'apellido')} autoFocus className={classNames({ 'p-invalid': submitted && !product.apellido })} />
                    {submitted && !product.apellido && <small className="p-error">apellido is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="nombreFamiliar">Nombre del familiar</label>
                    <InputText value={product.nombreFamiliar} id="nombreFamiliar" placeholder={product.nombreFamiliar} onChange={(e) => onInputChange(e, 'nombreFamiliar')} autoFocus className={classNames({ 'p-invalid': submitted && !product.nombreFamiliar })} />
                    {submitted && !product.nombreFamiliar && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="apellidoFamiliar">Apellido del familiar</label>
                    <InputText value={product.apellidoFamiliar} id="apellidoFamiliar" placeholder={product.apellidoFamiliar} onChange={(e) => onInputChange(e, 'apellidoFamiliar')} autoFocus className={classNames({ 'p-invalid': submitted && !product.apellidoFamiliar })} />
                    {submitted && !product.apellidoFamiliar && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="telefono">telefono</label>
                    <InputNumber value={product.telefono} id="telefono" onValueChange={(e) => onInputNumberChange(e, 'telefono')} />
                </div>
                <div className="field">
                    <label htmlFor="direccion">Direccion</label>
                    <InputText value={product.direccion} id="direccion" placeholder={product.direccion} onChange={(e) => onInputChange(e, 'direccion')} autoFocus className={classNames({ 'p-invalid': submitted && !product.apellidoFamiliar })} />
                    {submitted && !product.direccion && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <InputText id="email" value={product.email} onChange={(e) => onInputChange(e, 'email')} autoFocus className={classNames({ 'p-invalid': submitted && !product.email })} />
                    {submitted && !product.email && <small className="p-error">email is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="patologia">Patologia</label>
                    <InputText id="patologia" value={product.patologia} onChange={(e) => onInputChange(e, 'patologia')} autoFocus className={classNames({ 'p-invalid': submitted && !product.patologia })} />
                    {submitted && !product.patologia && <small className="p-error">patologia is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="asistente">asistente</label>
                    <InputText id="asistente" value={product.asistente} onChange={(e) => onInputChange(e, 'asistente')} autoFocus className={classNames({ 'p-invalid': submitted && !product.asistente })} />
                    {submitted && !product.asistente && <small className="p-error">asistente is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="fechaInicio">fechaInicio</label>
                    <InputText type='date' id="fechaInicio" placeholder={product.fechaInicio} value={product.fechaInicio} onChange={(e) => onInputChange(e, 'fechaInicio')} autoFocus className={classNames({ 'p-invalid': submitted && !product.fechaInicio })} />
                    {submitted && !product.fechaInicio && <small className="p-error">fechaInicio is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="fechaFinal">fechaFinal</label>
                    <InputText type='date' id="fechaFinal" placeholder={product.fechaFinal} value={product.fechaFinal} onChange={(e) => onInputChange(e, 'fechaFinal')} autoFocus className={classNames({ 'p-invalid': submitted && !product.fechaFinal })} />
                    {submitted && !product.fechaFinal && <small className="p-error">fechaFinal is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="notasVarias">notasVarias</label>
                    <InputTextarea id="notasVarias" value={product.notasVarias} onChange={(e) => onInputChange(e, 'notasVarias')} rows={3} cols={20} />
                </div>
                <div className="field">
                    <label htmlFor="status">Status</label>
                    <InputText id="status" placeholder={product.status} value={product.status} onChange={(e) => onInputChange(e, 'status')} autoFocus className={classNames({ 'p-invalid': submitted && !product.status })} />
                    {submitted && !product.status && <small className="p-error">status is required.</small>}
                </div>
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="precio">precio</label>
                        <InputNumber id="precio" value={product.precio} onValueChange={(e) => onInputNumberChange(e, 'precio')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                </div>
            </Dialog>
            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete <b>{product.name}</b>?</span>}
                </div>
            </Dialog>
            <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    );
}
