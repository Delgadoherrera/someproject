
export class ProductService {


    getEvoluciones(id) {
        return fetch(`http://localhost:4000/paciente/evolucion/${id}`).then(res => res.json()).then(d => d.data);
    }

}
