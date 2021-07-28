
import asyncHandler from 'express-async-handler';
import ProductInventory from '../models/ProductInventoryModel.js'

const getProductInventory = asyncHandler(async(req, res)=>{
   const user = req.user;
   const productInventory = await ProductInventory.findOne({user});
   if(!productInventory){
      const newInventory = ProductInventory.create({
         user
      })
      
      res.json(newInventory)
   } else {
      res.json(productInventory)
   }
})
const postNewProduct = asyncHandler(async(req, res)=>{
   const user = req.user;
   const {title, description} = req.body;

   if(!title){
      res.json({message: "Include a product title."})
   }
   const productInventory = await ProductInventory.findOne({user});
   

   if(productInventory){
      let titleIndex = -1;
      await productInventory.products.forEach((thing, i)=>{
         if(thing.title === title){
            titleIndex = i;
         } else return;
      })
      if(titleIndex !== -1){
         throw new Error('Product Title Exist Already.')
      } else {

         let product = {};
         product.title = title;
         product.description = description || '';
         product.items = [];
      
         productInventory.products.push(product)
         productInventory.save();
         res.json(productInventory)
      }
   } else {
      throw new Error('Product inventory not found')
   }
})

const postNewProductItem = asyncHandler(async (req,res) => {
   const user = req.user;
   const productInventory = await ProductInventory.findOne({user});
   if(!productInventory){throw new Error('Inventory not found')}
   else {
      const {material, color, qty, threshold } = req.body;
      let item = {};
      item.material = material;
      item.color = color;
      item.qty = qty;
      item.threshold = threshold;

      let matchedIndex = -1;
      await productInventory.products.forEach((product, i)=>{
         if(product._id.toString() === req.params.productId){
            matchedIndex = i;
         } else return;
      })
      if(matchedIndex === -1){
         throw new Error('product index not found')
      } else {
         productInventory.products[matchedIndex].items.push(item)
         await productInventory.save();
         return res.json(productInventory)
      }
      
   }
})

// add or subtract from item qty
// put /api/pi/qty/:productid/:itemid
// req.body: qty -qty to add or subtract
// req.params: productid & itemid
const addQtyItem = asyncHandler(async(req, res)=>{
 
   const user = req.user;
   const productInventory = await ProductInventory.findOne({user});
   if(!productInventory){throw new Error('Inventory not found')}
   else {
      
      let productIndex = -1;
      let itemIndex = -1;
      await productInventory.products.forEach((product, i)=>{
         if(`${product._id}` === `${req.params.productid}`){
            productIndex = i;
         } else return;
      })
      if(productIndex !== -1) {
        
         await productInventory.products[productIndex].items.forEach((item, i)=>{
            if(`${item._id}` === `${req.params.itemid}`){
               itemIndex = i
            } else return;
         })
         if(itemIndex !== -1){
            productInventory.products[productIndex].items[itemIndex].qty += req.body.qty;
            if(productInventory.products[productIndex].items[itemIndex].qty < 0){throw new Error('Cant set qty below 0')} else {
            productInventory.save()
            return res.json(productInventory)}
         }else{
            throw new Error('Item index not found')
         }
      } else {throw new Error('Product index not found')}
     
   }
})


const putProductEdit = asyncHandler(async (req,res) => {
   const user = req.user;
   const productInventory = await ProductInventory.findOne({user});
   if(!productInventory){throw new Error('Inventory not found')}
   else {
     
      res.json({message: 'putedit'})
   }
})
const deleteProduct = asyncHandler(async (req,res) => {
   const user = req.user;
   const productId = req.params.productId;
   console.log(productId)
   const productInventory = await ProductInventory.findOne({user})
   console.log(productInventory.products)
   if(!productInventory){
      throw new Error('Product Inventory not found')
   } else {
      let newProductInventory = productInventory;
      let matchedProductIndex = -1;
      await productInventory.products.forEach((product, i)=> {
         if(product._id.toString() === productId){
            matchedProductIndex = i;
         } else return
      })
      if(matchedProductIndex > -1) {
        await newProductInventory.products.splice(matchedProductIndex, 1)
        await newProductInventory.save()

        res.json(newProductInventory)
      }
      
     
      
   }
})

const deleteProductItem = asyncHandler(async (req, res) => {
   
   const user = req.user;
   const productId = req.params.productId;
   const itemId = req.params.itemId;

   const productInventory = await ProductInventory.findOne({user});
   if(!productInventory){throw new Error('Inventory not found')} else {
      let newProductInventory = productInventory
      let matchedProductIndex = -1;
      let matchedItemIndex = -1;

      await productInventory.products.forEach((product, pI) => {
         if(product._id.toString() === productId.toString()) {
            matchedProductIndex = pI;
         }
      })

      if(matchedProductIndex > -1){
         await productInventory.products[matchedProductIndex].items.forEach((item, iI)=>{
            if(item._id.toString() === itemId.toString()){
               matchedItemIndex = iI;
            }
         })
         if(matchedItemIndex > -1) {
            await newProductInventory.products[matchedProductIndex].items.splice(matchedItemIndex, 1)
            await newProductInventory.save()
            res.json(newProductInventory)
         } else {throw new Error('No item match')}
      } else {throw new Error('No product match')}
   }
})

export {
   getProductInventory,
   postNewProduct,
   postNewProductItem,
   putProductEdit,
   addQtyItem,
   deleteProductItem,
   deleteProduct
}