
export class ProductService {



    getProducts() {
        return fetch('http://localhost:4000/personalList').then(res => res.json()).then(d => d.data);
    }

}
    