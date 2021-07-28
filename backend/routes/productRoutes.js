import express, { Router } from 'express';
const router = express.Router();
import {
  getProductInventory,
  postNewProduct,
  postNewProductItem,
  putProductEdit,
  addQtyItem,
  deleteProductItem,
  deleteProduct
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router
  .route('/')
  .get(protect, getProductInventory)
router
  .route('/product')
  .post(protect, postNewProduct)
router
  .route('/product/:productid')
  .post(protect, postNewProductItem)
  .put(protect, putProductEdit)
router
  .route('/qty/:productid/:itemid')
  .put(protect, addQtyItem)
  
  router
  .route('/product/:productId')
  .delete(protect, deleteProduct)

  router
  .route('/item/:productId/:itemId')
  .delete(protect, deleteProductItem)

export default router;
