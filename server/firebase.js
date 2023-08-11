const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
var serviceAccount = require('../serviceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://e-commerce-dbms-default-rtdb.asia-southeast1.firebasedatabase.app/"
})

const Database = getFirestore();
const Products_db = admin.database();
module.exports = { Database, Products_db };