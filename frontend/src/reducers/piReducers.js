import {
   GET_PI_REQUEST,
GET_PI_SUCCESS,
GET_PI_FAIL,
ADD_PRODUCT_SUCCESS,
ADD_PRODUCT_FAIL,
ADD_PRODUCT_REQUEST,
ADD_ITEM_SUCCESS,
ADD_ITEM_FAIL,
ADD_ITEM_REQUEST,
EDIT_QTY_REQUEST,
EDIT_QTY_SUCCESS,
EDIT_QTY_FAIL,
DELETE_ITEM_REQUEST,
DELETE_ITEM_SUCCESS,
DELETE_ITEM_FAIL,
DELETE_PRODUCT_REQUEST,
DELETE_PRODUCT_SUCCESS,
DELETE_PRODUCT_FAIL,

} from '../constants/piConstants'

export const getPiSheetReducer = (state = {}, action) => {
   switch (action.type) {
     case GET_PI_REQUEST:
       return { loading: true };
     case GET_PI_SUCCESS:
       return { loading: false, piInfo: action.payload };
     case GET_PI_FAIL:
       return { loading: false, error: action.payload };
     default:
       return state;
   }
}

export const addNewProductReducer = (state = {}, action) => {
   switch (action.type) {
     case ADD_PRODUCT_REQUEST:
       return { loading: true };
     case ADD_PRODUCT_SUCCESS:
       return { loading: false };
     case ADD_PRODUCT_FAIL:
       return { loading: false, error: action.payload };
     default:
       return state;
   }
 };
export const addNewItemReducer = (state = {}, action) => {
   switch (action.type) {
     case ADD_ITEM_REQUEST:
       return { loading: true };
     case ADD_ITEM_SUCCESS:
       return { loading: false };
     case ADD_ITEM_FAIL:
       return { loading: false, error: action.payload };
     default:
       return state;
   }
 };

export const editQtyProductReducer = (state = {}, action) => {
   switch (action.type) {
     case EDIT_QTY_REQUEST:
       return { loading: true };
     case EDIT_QTY_SUCCESS:
       return { loading: false };
     case EDIT_QTY_FAIL:
       return { loading: false, error: action.payload };
     default:
       return state;
   }
 };

export const deleteProductReducer = (state = {}, action) => {
   switch (action.type) {
     case DELETE_PRODUCT_REQUEST:
       return { loading: true };
     case DELETE_PRODUCT_SUCCESS:
       return { loading: false, success: true };
     case DELETE_PRODUCT_FAIL:
       return { loading: false, success: false, error: action.payload };
     default:
       return state;
   }
 };
export const deleteItemReducer = (state = {}, action) => {
   switch (action.type) {
     case DELETE_ITEM_REQUEST:
       return { loading: true };
     case DELETE_ITEM_SUCCESS:
       return { loading: false, success: true };
     case DELETE_ITEM_FAIL:
       return { loading: false, success: false, error: action.payload };
     default:
       return state;
   }
 };