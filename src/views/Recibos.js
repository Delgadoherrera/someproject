import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
/* import '../../index.css'; */
import '../assets/RecibosUpload.css'


import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../services/RecibosService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import UploadRecibo from './UploadRecibo'
import '../assets/FacturaUpload.css';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import PrivateNavbar from './PrivateNavbar'
import axios from 'axios'

export default function Recibos() {


    let emptyProduct = {
        emisor: '',
        precio: '',
        fechaEjecucion: '',
        referencia: '',
        cuitBeneficiario: '',
        imagenRecibo: '',
        importe: '',
        cbuBeneficiario: '',
        valor: '',
        numeroOperacion: '',
        notasVarias: '',
        status: '',
        beneficiario: ''
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
    const [uploadReciboDialog, setUploadReciboDialog] = useState(false)
    const toast = useRef(null);
    const dt = useRef(null);
    const productService = new ProductService();

    useEffect(() => {
        productService.getRecibos().then(data => setProducts(data));
        console.log('cambio product')



    }, [saved]); // eslint-disable-line react-hooks/exhaustive-deps

    /*     console.log('productos primer usfx',products) */



    /* 
        useEffect(() => {
            console.log('Submited Fx')
    
    
        }, [product]) */

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
        setUploadReciboDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    const saveProduct = () => {
        setSubmitted(true);

        if (product.emisor.trim()) {
            let _products = [...products];
            let _product = { ...product };





            if (product.id) {
                const index = findIndexById(product.id);
                console.log(_product)

                axios.post("http://localhost:4000/recibos/edit", _product, {
                }).then((response) => {
                    console.log('response Api:', response)
                })



                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            }
            else {
                console.log('aqui debe ir fetch')

                axios.post("http://localhost:4000/recibos/create", _product, {
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
            setSaved(true)

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
            axios.post("http://localhost:4000/recibos/destroy", product, {
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
                <Button label="Nuevo recibo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                {/*              <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} /> */}
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
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    }

    const statusBodyTemplate = (rowData) => {
        return <span className={`product-badge status-${rowData.inventoryStatus/* .toLowerCase() */}`}>{rowData.inventoryStatus}</span>;
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-circle" className="p-button-rounded p-button-success mr-2" onClick={() => uploadRecibo(rowData)} />
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    const uploadRecibo = (product) => {
        setProduct({ ...product });
        setUploadReciboDialog(true);
        /*      console.log('id del producto: ', product.id) */

    }

    const facturaPreview = (rowData) => {
        console.log('rowData', rowData)

        return (
            <React.Fragment>
                <iframe className='iframeFacturacion' src={rowData.imagenRecibo} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Mis recibos</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
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
    const subirReciboDialog = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        </React.Fragment>
    );

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
                    <Column /* selectionMode="single" */ headerStyle={{ width: '1rem' }} exportable={false}></Column>
                    <Column field="emisor" header="emisor" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="fechaEjecucion" header="fechaEjecucion" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="beneficiario" header="beneficiario" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="numeroOperacion" header="Numero de operacion" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="cuitBeneficiario" header="cuitBeneficiario" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="cbuBeneficiario" header="cbuBeneficiario" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="referencia" header="referencia" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="importe" header="importe" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column body={facturaPreview} field="imagenRecibo" header="Imagen del recibo" sortable style={{ minWidth: '12rem' }} />
                    <Column field="notasVarias" header="Notas sobre la operacion" sortable style={{ minWidth: '5rem' }}></Column>

                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '15rem' }}></Column>
                    {/*    <Column field="notasVarias" header="Notas varias" sortable style={{ minWidth: '5rem' }}></Column> */}
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '450px' }} header="Nuevo recibo" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`images/product/${product.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.image} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="emisor">Emisor</label>
                    <InputText id="emisor" value={product.emisor} onChange={(e) => onInputChange(e, 'emisor')} autoFocus className={classNames({ 'p-invalid': submitted && !product.emisor })} />
                    {submitted && !product.emisor && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="fechaEjecucion">Fecha de ejecucion</label>
                    <InputText type='date' id="fechaEjecucion" value={product.fechaEjecucion} onChange={(e) => onInputChange(e, 'fechaEjecucion')} autoFocus className={classNames({ 'p-invalid': submitted && !product.fechaEjecucion })} />
                    {submitted && !product.fechaEjecucion && <small className="p-error">fechaEjecucion is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="numeroOperacion">Numero de operacion</label>
                    <InputText id="numeroOperacion" value={product.numeroOperacion} onChange={(e) => onInputChange(e, 'numeroOperacion')} autoFocus className={classNames({ 'p-invalid': submitted && !product.numeroOperacion })} />
                    {submitted && !product.numeroOperacion && <small className="p-error">numeroOperacion is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="cbuBeneficiario">CBU del beneficiario</label>
                    <InputText type='number' value={product.cbuBeneficiario} id="cbuBeneficiario" placeholder={product.cbuBeneficiario} onChange={(e) => onInputChange(e, 'cbuBeneficiario')} autoFocus className={classNames({ 'p-invalid': submitted && !product.cbuBeneficiario })} />
                    {submitted && !product.cbuBeneficiario && <small className="p-error">cbuBeneficiario is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="cuitBeneficiario">CUIT del beneficiario</label>
                    <InputText type='cuitBeneficiario' value={product.cuitBeneficiario} id="cuitBeneficiario" onChange={(e) => onInputChange(e, 'cuitBeneficiario')} autoFocus className={classNames({ 'p-invalid': submitted && !product.cuitBeneficiario })} />
                    {submitted && !product.cuitBeneficiario && <small className="p-error">cuitBeneficiario is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="beneficiario">Beneficiario</label>
                    <InputText value={product.beneficiario} id="beneficiario" placeholder={product.beneficiario} onChange={(e) => onInputChange(e, 'beneficiario')} autoFocus className={classNames({ 'p-invalid': submitted && !product.beneficiario })} />
                    {submitted && !product.beneficiario && <small className="p-error">Name is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="referencia">Referencia</label>
                    <InputText id="referencia" value={product.referencia} onChange={(e) => onInputChange(e, 'referencia')} autoFocus className={classNames({ 'p-invalid': submitted && !product.referencia })} />
                    {submitted && !product.referencia && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="importe">Importe</label>
                    <InputText id="importe" value={product.importe} onChange={(e) => onInputChange(e, 'importe')} autoFocus className={classNames({ 'p-invalid': submitted && !product.importe })} />
                    {submitted && !product.importe && <small className="p-error">importe is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="notasVarias">Notas varias</label>
                    <InputTextarea id="notasVarias" value={product.notasVarias} onChange={(e) => onInputChange(e, 'notasVarias')} rows={3} cols={20} />
                </div>
            </Dialog>
            <Dialog visible={uploadReciboDialog} style={{ width: '450px' }} header={'Adjuntar imagen al recibo'} modal className="p-fluid" footer={subirReciboDialog} onHide={hideDialog} >
                <UploadRecibo idValue={product.id} imagenRecibo={product.imagenRecibo} />

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
