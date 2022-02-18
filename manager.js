const fs = require('fs');

const pathToProducts = __dirname +'/files/products'

class ProductManager {

    add = async (product) => {
        if (fs.existsSync(pathToProducts)) {
            try {
                let data = await fs.promises.readFile(pathToProducts, 'utf-8');
                let products = JSON.parse(data);
                if (products.length === 0) {
                    product.id = 1;
                    products.push(product);
                    await fs.promises.writeFile(pathToProducts, JSON.stringify(products, null, 2))
                    return { status: "success", message: "Added 1 product" }
                }
                product.id = products[products.length - 1].id + 1;
                products.push(product);
                await fs.promises.writeFile(pathToProducts, JSON.stringify(products, null, 2));
                return { status: "success", message: "Added 1 product" }
            }
            catch(error){
                return {status:"error",error:error}
            }
        }
        else{
            try{
                product.id=1;
                await fs.promises.writeFile(pathToProducts,JSON.stringify([product],null,2));
                return {status:"success",message:"Added 1 product"}
            }catch(error){
                return {status:"error",error:error}
            }
        }
    }
    get = async() =>{
        if(fs.existsSync(pathToProducts)){
            try{
                let data = await fs.promises.readFile(pathToProducts, 'utf-8');
                let products = JSON.parse(data);
                return {status:"success",payload:products}
            }catch(error){
                return {status:"error",error:error}
            }
        }else{
            return {status:"success",payload: products}
        }
    }

    getById = async (id) =>{
        if(fs.existsSync(pathToProducts)){
            let data = await fs.promises.readFile(pathToProducts, 'utf-8');
            let products = JSON.parse(data);
            let product = products.find(p=>p.id===id);
            if(product) return {status: "success", payload:product}
            else return {status: "fail", error:"no such product"}
        }
    }

    deleteProduct = async (id) =>{
        if(fs.existsSync(pathToProducts)){
            let data = await fs.promises.readFile(pathToProducts, 'utf-8')
            let products = JSON.parse(data);
            let newProduct = products.filter(product=>product.id!==id)
            await fs.promises.writeFile(pathToProducts,JSON.stringify(newProduct,null,2))
            return {status:"success", message:"product deleted"}
        }
    }

    modifyProduct = async (id) =>{
        if(fs.existsSync(pathToProducts)){
            let data = await fs.promises.readFile(pathToProducts, 'utf-8');
            let products = JSON.parse(data);
            let product = products.find(p=>p.id===id);
            if(product) return {status: "success", payload:product}
            else return {status: "fail", error:"no such product"}
        }
    }
}
module.exports = ProductManager;