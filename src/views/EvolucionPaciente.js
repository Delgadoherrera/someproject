import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../services/EvolucionService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import PrivateNavbar from '../views/PrivateNavbar';
import axios from 'axios'
import '../assets/Pacientes.css';
export default function DataTableCrudDemo({ evolucionId, datosPaciente }) {


    let emptyProduct = {

        nombre: '',
        rating: 0

    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [saved, setSaved] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    const productService = new ProductService();

    useEffect(() => {

        if (products !== emptyProduct) {

            productService.getEvoluciones(evolucionId).then(data => setProducts(data));
        }

    }, [saved]);

    console.log('del usf evolucionId', evolucionId)

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
        console.log('ACA DEL CONSOLe', product)
        let id = evolucionId

        let _products = [...products];
        let _product = { ...product, id };

        if (product.id) {
            const index = findIndexById(product.id);
            axios.post("http://localhost:4000/paciente/evolucion/edit", _product, {
            }).then((response) => {
                console.log('response Api:', response)
            })
            _products[index] = _product;
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        }

        else {
            console.log('aqui debe ir fetch')

            console.log('envio antes del product', _product)

            axios.post("http://localhost:4000/paciente/evolucion/create", _product, {
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
            axios.post("http://localhost:4000/curriculums/destroy", product, {
            }).then((response) => {
                console.log('response Api:', response)
            }));
        console.log('delete product function', _products)
        setProducts(_products);

        setDeleteProductDialog(false);
        setProduct(emptyProduct);


        console.log('eliminador de la derecha', _products)
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

            // Prepare DataTable
            const cols = data[0].replace(/['"]+/g, '').split(',');
            data.shift();

            const importedData = data.map(d => {
                d = d.split(',');
                const processedData = cols.reduce((obj, c, i) => {
                    c = c === 'Status' ? 'inventoryStatus' : (c === 'Reviews' ? 'rating' : c.toLowerCase());
                    obj[c] = d[i].replace(/['"]+/g, '');
                    (c === 'price' || c === 'rating') && (obj[c] = parseFloat(obj[c]));
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
        console.log('delete derechos')
        setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {
        let _products = products.filter(val => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        console.log('productos:', products)
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
                <Button label="Nueva evolucion" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                <Button label="Borrar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php" accept=".csv" chooseLabel="Import" className="mr-2 inline-block" onUpload={importCSV} />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
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
        return <Rating value={rowData.rating} cancel={false} />;
    }

    const statusBodyTemplate = (rowData) => {
        return <span className={`product-badge status-${rowData.inventoryStatus/* .toLowerCase() */}`}>{rowData.inventoryStatus}</span>;
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    const cvView = (rowData) => {
        console.log('rowData', rowData)
        return (
            <React.Fragment>
                <iframe className='iframeFacturacion' src={rowData.cv} />
            </React.Fragment>


        );
    }

    const header = (
        <div className="table-header-pacientes">
            <h5 className="mx-0 my-1 tituloEvolucion"><span className=''>Evolucion paciente: <span className='spanEvolucion'> {datosPaciente.nombre} {datosPaciente.apellido}</span></span> </h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
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

    console.log('datospaciente:', products)
    return (

        <div className="datatable-crud-demo">

            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column /* selectionMode="single" */ headerStyle={{ width: '1rem' }} exportable={false}></Column>
                    <Column field="pacienteId" header="Id del paciente" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="obraSocial" header="Obra Social" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="diagnostico" header="Diagnostico" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="fecha" header="Fecha" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="hora" header="Hora" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="evolucionDiaria" header="Evolucion diaria" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="personal" header="Personal a cargo" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="observaciones" header="Obersvaciones" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '15rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '450px' }} header="Nueva evolucion" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`images/product/${product.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.image} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="pacienteId">pacienteId</label>
                    <InputNumber id="pacienteId" value={evolucionId} onChange={(e) => onInputChange(e, 'pacienteId')} autoFocus className={classNames({ 'p-invalid': submitted && !product.pacienteId })} />
                    {submitted && !product.pacienteId && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="obraSocial">obraSocial</label>
                    <InputText id="obraSocial" value={product.obraSocial} onChange={(e) => onInputChange(e, 'obraSocial')} autoFocus className={classNames({ 'p-invalid': submitted && !product.obraSocial })} />
                    {submitted && !product.obraSocial && <small className="p-error">obraSocial is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="diagnostico">diagnostico</label>
                    <InputText id="diagnostico" value={product.diagnostico} onChange={(e) => onInputChange(e, 'diagnostico')} autoFocus className={classNames({ 'p-invalid': submitted && !product.diagnostico })} />
                    {submitted && !product.diagnostico && <small className="p-error">diagnostico is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="fecha">fecha</label>
                    <InputText type='date' id="fecha" value={product.fecha} onChange={(e) => onInputChange(e, 'fecha')} autoFocus className={classNames({ 'p-invalid': submitted && !product.fecha })} />
                    {submitted && !product.fecha && <small className="p-error">fecha is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="hora">hora</label>
                    <InputText id="hora" placeholder={product.hora} value={product.hora} onChange={(e) => onInputChange(e, 'hora')} autoFocus className={classNames({ 'p-invalid': submitted && !product.hora })} />
                    {submitted && !product.hora && <small className="p-error">hora is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="evolucionDiaria">evolucionDiaria</label>
                    <InputTextarea id="evolucionDiaria" value={product.evolucionDiaria} onChange={(e) => onInputChange(e, 'evolucionDiaria')} rows={3} cols={20} />
                </div>

                <div className="field">
                    <label htmlFor="personal">personal</label>
                    <InputText id="personal" placeholder={product.personal} value={product.personal} onChange={(e) => onInputChange(e, 'personal')} autoFocus className={classNames({ 'p-invalid': submitted && !product.personal })} />
                    {submitted && !product.personal && <small className="p-error">personal is required.</small>}
                </div>
                <div className="observaciones">
                    <label htmlFor="observaciones">observaciones</label>
                    <InputText id="observaciones" placeholder={product.observaciones} value={product.observaciones} onChange={(e) => onInputChange(e, 'observaciones')} autoFocus className={classNames({ 'p-invalid': submitted && !product.observaciones })} />
                    {submitted && !product.observaciones && <small className="p-error">observaciones is required.</small>}
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
