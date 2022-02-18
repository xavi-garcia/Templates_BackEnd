const express= require('express');

const app = express();

const PORT = 8080;
const server = app.listen(8080,()=>console.log(`Listening on ${PORT}`));

const ProductManager = require('./manager');
const uploader = require('./services/Upload')
const productService = new ProductManager();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('home')
})


app.get('/products',(req,res)=>{
    let products = req.body;
    console.log(products)
    productService.get(products);
    res.render('history',{
        products
    })
})

app.post('/',uploader.single('file'),(req,res)=>{
    let product = req.body;
    console.log(product)
    productService.add(product).then(result=>res.send(result));
    res.render('home',{
        product
    })
})


// app.post('/',uploader.single('file'),(req,res)=>{
//     let product = req.body;
//     console.log(product);
//     let file = req.file;
//     if (!file) return res.status(500).send({error:"Couldn't upload file"});
//     product.thumbnail = req.protocol+"://"+req.hostname+":8080"+file.filename;
//     productService.add(product).then(result=>res.send(result));
//     res.redirect('/')
// })