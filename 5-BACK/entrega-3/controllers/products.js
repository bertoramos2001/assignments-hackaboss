const bd = require('./bd_mock');

// let products = [];
// let globalId = 0;

const list = (req, res) => {
    const minPrice = req.query['precioMinimo'];
    const maxPrice = req.query['precioMaximo'];
    const product = req.query['nombreProducto'];
    let listaProductos = bd.readList();


    if (product !== undefined) { //filtramos por nombre
        listaProductos = listaProductos.filter( producto => (((producto.name).trim()).toLowerCase()).replace(' ', '-') === product)
    }
    if (minPrice !== undefined) { //filtramos por precio minimo
        if(isNaN(minPrice)) {
            res.status(400).send(); //error si alguno de los precios enviados en la querystring no son numeros
        }
        listaProductos = listaProductos.filter( producto => parseInt(producto.price) > minPrice)
    }
    if (maxPrice !== undefined) { //filtramos por precio maximo
        if(isNaN(maxPrice)) {
            res.status(400).send(); //error si alguno de los precios enviados en la querystring no son numeros
        }
        listaProductos = listaProductos.filter( producto => parseInt(producto.price) < maxPrice)
    }


    res.json(listaProductos);
}

const add = (req, res) => {
    if (req.body.name === undefined || req.body.stock === undefined || req.body.price === undefined) { //error si alguno de los campos no existe o está vacío
        res.status(400).send();
    }
    if(isNaN(parseInt(req.body.stock)) || isNaN(parseInt(req.body.price))) { //error si el stock o el precio que mete el admin no es un numero
        res.status(400).send()
    }

    bd.addProduct(req.body.name, req.body.stock, req.body.price);
    res.send();
}

const modify = (req, res) => {
    const id = req.params.id;
    bd.modifyProduct(id, req.body.name, req.body.stock, req.body.price);
    res.send();
}

module.exports = {
    add,
    list,
    modify,
}