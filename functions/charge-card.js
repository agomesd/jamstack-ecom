const fs = require('fs');
const matter = require('gray-matter');


const getProducts = () => {
    const directory = `${process.cwd()}/content`;
    const filenames = fs.readdirSync(directory);

    const products = filenames.map(filename => {
        const fileContent = fs.readFileSync(`${directory}/${filename}`)
        const { data } = matter(fileContent);
        return data;
    });

    return products
}

exports.handler = async (event, context) => {
    const { newCart } = JSON.parse(event.body);
    const products = getProducts();

    const cartWithProducts = newCart.map(({ id, qty }) => {
        const product = products.find(p => p.id === id);
        return {
            ...product,
            qty
        }
    })

    console.log(cartWithProducts)


    return {
        statusCode: 200,
        body: "Payment has been charged to card!"
    }
}