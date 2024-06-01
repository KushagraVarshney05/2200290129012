const express= require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql2 = require('mysql2');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const db = require('./config/db');
const { getCompany, insertCompany } = require('./controller/company');
const { getProducts,
    
    getTopProducts,  } = require('./controller/product');

app.get('/', (req, res) => {
    res.send('Hello World!')
    });
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
    }
    );
app.get('/company', getCompany).post('/company', insertCompany);
app.get('/products', getProducts).get('/getProductsTop', getTopProducts);

