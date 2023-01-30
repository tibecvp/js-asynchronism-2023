import fetch from 'node-fetch';
const API = 'https://api.escuelajs.co/api/v1';

async function* fetchData(urlApi) {
    const response = await fetch(urlApi);
    const data = await response.json();
    yield data;
}

async function anotherFn(urlApi) {
    try {
        const products = await (await fetchData(`${urlApi}/products`).next()).value;
        const product = await (await fetchData(`${urlApi}/products/${products[0].id}`).next()).value;
        const category = await (await fetchData(`${urlApi}/categories/${product.category.id}`).next()).value;
        
        console.log('--------PRODUCTS');
        console.log(products);
        console.log('--------PRODUCT');
        console.log(product.title);
        console.log('--------CATEGORY');
        console.log(category.name);
    } catch (error) {
        console.error('Error: ', error);
    }
}

anotherFn(API);