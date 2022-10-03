
export class ProductService {

    getProductsSmall() {
        return fetch('data/recibospacientes.json').then(res => res.json()).then(d => d.data);
    }

    getProducts() {
        return fetch('data/recibospacientes.json').then(res => res.json()).then(d => d.data);
    }

    getProductsWithOrdersSmall() {
        return fetch('data/recibospacientes.json').then(res => res.json()).then(d => d.data);
    }
}
    