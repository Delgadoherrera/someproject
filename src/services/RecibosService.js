
export class ProductService {


    getRecibos() {
        return fetch('http://localhost:4000/recibos').then(res => res.json()).then(d => d.data);
    }
}
    