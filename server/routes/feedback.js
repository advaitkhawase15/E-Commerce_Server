var router = require('express').Router();
const { Database } = require('../firebase');
router.post('/', async (req, res) => {
    const email = req.body.email;
    const message = req.body.message;

    await Database.collection('Feedback').add({
        Customer_Email: email,
        Message: message
    });
    res.json({ emailMsg: "Feedback sent sucessfully" });
})

module.exports = router;