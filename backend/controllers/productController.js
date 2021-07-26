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
   const {title, description, material, color, quantity, threshold} = req.body;

   if(!title || !material || !color || !quantity || !threshold){
      res.json({message: "Include a product title."})
   }
   const productInventory = await ProductInventory.findOne({user});
   const newItem = {
      material: material,
      color: color,
      qty: quantity,
      threshold: threshold
   }

   if(productInventory){
      let titleIndex = -1;
      await productInventory.products.forEach((thing, i)=>{
         if(thing.title === title){
            titleIndex = i;
         } else return;
      })
      if(titleIndex !== -1){
         productInventory.products[titleIndex].items.push(newItem)
         productInventory.save()
         res.json(productInventory)
      } else {

         let product = {};
         product.title = title;
         product.description = description || '';
         product.items = [];
         product.items.push(newItem);
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
         if(`${product._id}` === `${req.params.productid}`){
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
      console.log(req.body.item)
      res.json({message: 'putedit'})
   }
})



export {
   getProductInventory,
   postNewProduct,
   postNewProductItem,
   putProductEdit,
   addQtyItem
}