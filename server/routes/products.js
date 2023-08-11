var router = require('express').Router();
const { Products_db } = require('../firebase');
router.get('/men', async (req, res) => {
    const ref = Products_db.ref('/Products');
    ref.on('value', (Products) => {
        const All_products = Products.val();
        const men_products = Object.keys(All_products)
            .filter((key) =>
                All_products[key].product_category_tree[1].slice(1, 2) === 'M'
            )
            .reduce((res, key) =>
                (res[key] = All_products[key], res)
                , {});
        res.send(men_products);
    }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
    });
})

router.get('/women', async (req, res) => {
    let ref = Products_db.ref('/Products');
    // ref = await ref.where('product_category_tree[1].slice(1, 2)', '==', 'W')
    ref.on('value', (Products) => {
        const All_products = Products.val();
        // res.send(All_products);
        const women_products = Object.keys(All_products)
            .filter((key) =>
                All_products[key].product_category_tree[1].slice(1, 2) === 'W'
                && All_products[key].product_category_tree[3] !== ' Bras '
            )
            .reduce((res, key) =>
                (res[key] = All_products[key], res)
                , {});
        res.send(women_products);
    });
})

module.exports = router;