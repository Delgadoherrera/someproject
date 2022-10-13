import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../services/PacientesService';
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
import axios from 'axios'
import UploadFactura from './UploadFactura'
import '../assets/FacturaUpload.css';


export default function DataTableCrudDemo({ facturaId, formDataValues, facturaEnviada, dataValuesProducts, datafromPaciente }) {
    let emptyProduct = {
        id: null,
    };
    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [uploadFacturaDialog, setUploadFacturaDialog] = useState(false)
    const [facturas, setFacturas] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [toggle, setToggle] = useState(true)


    useEffect(() => {
        fetch(`http://localhost:4000/detallepaciente/${datafromPaciente.id}`).then(res => res.json()).then(d => setProducts(d.data));
        fetch(`http://localhost:4000/paciente/facturacion/${datafromPaciente.id}`).then(res => res.json()).then(d => setFacturas(d.data));
    }, [toggle, submitted, deleteProductDialog,]);


    useEffect(() => {
        setToggle(!toggle)
        setProducts(product)
    }, []);

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    }
    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
        setUploadFacturaDialog(false)
    }
    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }
    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }
    const saveProduct = () => {
        setSubmitted(true);
        let id = product.id
        let pacienteId = datafromPaciente.id

        let _products = [...facturas];
        let _product = { ...product, id, datafromPaciente };

        if (product.id) {
            const index = findIndexById(product.id);
            axios.post("http://localhost:4000/paciente/facturacion/edit", _product)
                .then((response) => {
                    console.log('response Api:', response)
                })

            _products[index] = _product;
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        }
        else {

            axios.post("http://localhost:4000/paciente/facturacion/", _product, {
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
    const uploadFactura = (product) => {
        setProduct({ ...product });
        setUploadFacturaDialog(true);
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
        let _products = facturas.filter(val => val.id !== product.id);
        axios.post("http://localhost:4000/paciente/facturacion/destroy", product, {
        }).then((response) => {
            console.log('response Api:', response)
        });
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
    /*     console.log('facturacion: products: ', products) */

    const exportCSV = () => {
        dt.current.exportCSV();
    }
    /*  console.log('buscando iumagen: ', products) */
    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {
        let _products = products.filter(val => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
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
                <Button label="Nueva factura" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                {/*                 <Button label="Borrar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
 */}            </React.Fragment>
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
    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    }

    const statusBodyTemplate = (rowData) => {
        return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-camera" className="p-button-rounded p-button-success mr-2" onClick={() => uploadFactura(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    const facturaPreview = (rowData) => {
        /*   console.log('rowData', rowData) */

        return (


            <React.Fragment>
                <iframe className='iframeFacturacion' src={rowData.imagenFactura} />
            </React.Fragment>


        );
    }
    /*  console.log('titutlo para facturacion',dataValuesProducts)  */




    const header = (
        <div className="table-header-pacientes">
            {products ? <h5 className="mx-0 my-1 tituloFacturacion"> Facturacion paciente: <span className='spanFacturacion'> {datafromPaciente.nombre} {datafromPaciente.apellido}</span></h5> : <h5 className="mx-0 my-1">Facturacion del paciente </h5>}

            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar factura" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
    );

    const subirFacturaDialog = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
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




    return (
        <div className="datatable-crud-demo">
            {/*   <iframe src={product.imagenFactura} /> */}
            <Toast ref={toast} />
            {facturas ? <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable ref={dt} value={facturas} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column /* selectionMode="multiple"  */ headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    <Column hidden field="id" header="id" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="numeroFactura" header="Numero de factura" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column hidden field="idPaciente" header="ID del paciente" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="fechaFactura" header="Fecha de facturacion" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="valor" header="Valor" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="notasVarias" header="Notas varias" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={facturaPreview} field="imagenFactura" header="Imagen de la factura" sortable style={{ minWidth: '12rem' }}>



                    </Column>
                    <Column field="status" header="Status" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                    {/*    <Column body={facturaPreview} exportable={false} style={{ minWidth: '8rem' }}></Column> */}
                </DataTable>
            </div> : <p> </p>}


            <Dialog visible={productDialog} style={{ width: '450px' }} header="Crear factura" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog} >
                {product.image && <img src={`images/product/${product.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.image} className="product-image block m-auto pb-3" />}
                <div hidden hclassName="field">
                    <InputText id="id" value={datafromPaciente.id} onChange={(e) => onInputChange(e, 'id')} autoFocus className={classNames({ 'p-invalid': submitted && !datafromPaciente.id })} />
                    {submitted && !datafromPaciente.id && <small className="p-error">id is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="numeroFactura">numeroFactura</label>
                    <InputText id="numeroFactura" value={product.numeroFactura} onChange={(e) => onInputChange(e, 'numeroFactura')} autoFocus className={classNames({ 'p-invalid': submitted && !product.numeroFactura })} />
                    {submitted && !product.numeroFactura && <small className="p-error">numeroFactura is required.</small>}
                </div>
                <div className="field">

                    {facturas ? <InputText id="idPaciente" hidden value={product.id} onChange={(e) => onInputChange(e, 'idPaciente')} autoFocus className={classNames({ 'p-invalid': submitted })} /> : <p> no hay facturas</p>}
                    {/* 
                    {submitted && !product.idPaciente && <small className="p-error">Name is required.</small>} */}
                </div>
                <div className="field">
                    <label htmlFor="fechaFactura">Fecha de facturacion</label>
                    <InputText type='date' id="fechaFactura" value={product.fechaFactura} onChange={(e) => onInputChange(e, 'fechaFactura')} autoFocus className={classNames({ 'p-invalid': submitted && !product.fechaFactura })} />
                    {submitted && !product.fechaFactura && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="valor">Valor</label>
                    <InputText id="valor" value={product.valor} onChange={(e) => onInputChange(e, 'valor')} autoFocus className={classNames({ 'p-invalid': submitted && !product.valor })} />
                    {submitted && !product.valor && <small className="p-error">Name is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="notasVarias">Notas adicionales</label>
                    <InputTextarea id="notasVarias" value={product.notasVarias} onChange={(e) => onInputChange(e, 'notasVarias')} rows={3} cols={20} />
                </div>
                <div className="field">
                    <label htmlFor="status">Estado</label>
                    <InputText id="status" value={product.status} onChange={(e) => onInputChange(e, 'status')} autoFocus className={classNames({ 'p-invalid': submitted && !product.status })} />
                    {submitted && !product.status && <small className="p-error">Name is required.</small>}
                </div>

            </Dialog>

            {facturaEnviada === true ? <p> enviando</p> : <p> </p>}

            {dataValuesProducts !== null ? <Dialog visible={uploadFacturaDialog} style={{ width: '450px' }} header={` Nueva factura paciente:  ${product.nombre} ${product.apellido}`} modal className="p-fluid" footer={subirFacturaDialog} onHide={hideDialog} >
                <UploadFactura idValue={product.id} imagenFactura={product.imagenFactura} />

            </Dialog> : <p> Nueva facura a nombre de... </p>}


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
