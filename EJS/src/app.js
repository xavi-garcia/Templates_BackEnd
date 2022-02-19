const express= require('express');
const ProductManager = require('./Managers/manager');
const uploader = require('./services/Upload')


const app = express();
const productService = new ProductManager();

const PORT = 8080;
const server = app.listen(8080,()=>console.log(`Listening on ${PORT}`));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname +'/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.get('/',(req,res)=>{
    let phrase = "Upload products"
    res.render('home',{ 
        phrase:phrase
    })
})


app.get('/products', async (req,res)=>{
    let data = await productService.getAll()
    products = data.payload
    res.render('history',{
        products:products
    })
})

app.get('/:id/delete', (req,res)=>{
    let id = req.params.id;
    if(isNaN(id)) return res.status(400).send({error:"incorrect id"});
    let number = parseInt(id);
    productService.deleteProduct(number).then(result=>res.send(result))
})

app.post('/',uploader.single('file'),(req,res)=>{
    let product = req.body;
    console.log(product);
    productService.add(product).then(result=>res.send(result));
})

