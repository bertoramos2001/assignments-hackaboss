let users = [{
    email: 'ejemplo@ejemplo.com',
    hashedPassword: '$2b$10$10vPJjGTvKzVQcJCLdr9h.KskMyyRrdrkB3KEsLnA4UHBFXOwzX06' //la contraseña sin hash es '1234'
}]
let products = [];
let globalId = 0;

const addProduct = (name, stock, price) => {
    products.push({
        id: globalId++,
        name,
        stock,
        price
    })
    return;
}
const readList = () => {
    return(products);
}
const getUser = (email) => {
    const matchEmail = user => user.email === email;
    return users.find(matchEmail);
}
const modifyProduct = (id, name, stock, price) => {
    const matchId = product => parseInt(product.id) === parseInt(id);
    const modifiedProduct = products.find(matchId);
    console.log(modifiedProduct);
    modifiedProduct.name = name;
    modifiedProduct.stock = stock;
    modifiedProduct.price = price;
    return;
}

module.exports = {
    addProduct,
    readList,
    getUser,
    modifyProduct
}