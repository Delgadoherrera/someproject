export class ProductService {



   async getProducts() {
        return fetch('http://localhost:4000/pacientesList').then(res => res.json()).then(d => d.data);
    }
    getDetails(id) {
        console.log('desde el midel',id)
       return fetch(`{http://localhost:4000/detallepaciente/${id}`).then(res => res.json()).then(d => d.data);
    }
    async getFacturas (id) {
        console.log('desde el midel',id)
        fetch(`{http://localhost:4000/paciente/facturacion/${id}`).then(res => res.json()).then(d => d.data);
    }
}


// return 