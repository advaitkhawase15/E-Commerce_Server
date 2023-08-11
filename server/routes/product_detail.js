var router = require('express').Router();
const { Products_db } = require('../firebase');
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const ref = Products_db.ref(`/Products/${id}`);
    ref.on('value', (snapshot)=>{
        const Product_detail = snapshot.val();
        res.send(Product_detail);
    })
})
module.exports = router;