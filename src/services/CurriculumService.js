
export class ProductService {



    getProducts() {
        return fetch('http://localhost:4000/usuario/onCv').then(res => res.json()).then(d => d.data);
    }

}
