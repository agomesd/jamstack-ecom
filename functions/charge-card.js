const fs = require('fs');
const matter = require('gray-matter');
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);


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

    const lineItems = cartWithProducts.map(product => ({
        price_data: {
            currency: 'gbp',
            product_data: {
                name: product.name,
            },
            unit_amount: product.price,
        },
        quantity: product.qty
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${event.headers.host}/success`,
        cancel_url: `${event.headers.host}/cancelled`,
    })

    return {
        statusCode: 200,
        body: JSON.stringify({
            id: session.id
        })
    }
}