exports.handler = async (events, context) => {
    return {
        statusCode: 200,
        body: `public key: ${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`
    };
}