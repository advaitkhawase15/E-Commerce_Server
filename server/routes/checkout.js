var router = require('express').Router();
const { View } = require("grandjs/lib");
View.settings.set("views", "./routes");
const nodemailer = require("nodemailer");
const { Database } = require('../firebase');
const Email_template = View.importJsx('./views/Email_template.jsx');

const STRIPE_SECRECT_API_KEY = process.env.STRIPE_SECRECT_API_KEY;
// This is your test secret API key.
const stripe = require("stripe")(STRIPE_SECRECT_API_KEY);

// app.use(express.static("public"));
// app.use(express.json());

const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
};

var OrderNum = 0;

function OrderGen(OrderNum) {
    let d = new Date();
    let year = d.getYear().toString().slice(1, 3);
    let month = (d.getMonth() + 1).toString();
    let date = d.getDate().toString();
    let OrderId = date + "-" + month + "-" + year + "-" + OrderNum + "-" + Math.floor((Math.random() * 89) + 10);
    return OrderId;
}

router.post('/mailInvoice', async (req, res) => {
    const From_Email = process.env.FROM_EMAIL_ADDRESS;
    const From_Email_Pass = process.env.FROM_EMAIL_ADDRESS_PASS;
    const Customer_Info = req.body.Customer_Info;
    const { Email } = Customer_Info;
    const Products = req.body.Products;
    const TotalPrice = req.body.TotalPrice;
    const Payed = req.body.Payed;

    let mailTransporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: From_Email,
            pass: From_Email_Pass
        }
    });
    const htmlToSend = View.renderToHtml(
        Email_template,
        {
            Customer_Info,
            Products,
            TotalPrice
        })
    let mailDetails = {
        from: From_Email,
        to: Email,
        subject: 'Your E-commerce Order',
        html: htmlToSend,
    };


    try {
        // console.log('Email sent successfully');
        Database.collection('Order_History').add({
            Order_Id: OrderGen(OrderNum),
            Customer_Info: Customer_Info,
            Time: new Date().toUTCString().slice(5),
            Products: Products,
            TotalPrice: TotalPrice,
            Payed: Payed,
        }).then(() => {
            mailTransporter.sendMail(mailDetails, async function (err) {
                if (err) {
                    // console.log('Error Occurs');
                    res.json({ emailMsg: "Payment not Successful. Please try again." })
                } else {
                    res.json({ emailMsg: "Thank You for shopping!!" })
                }
            })
        })
        OrderNum++;
        // console.log('Added document with ID: ', rest.id);
    } catch {
        res.json({ emailMsg: "Server is busy. Please try later" })
    }
});

router.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "inr",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

module.exports = router;