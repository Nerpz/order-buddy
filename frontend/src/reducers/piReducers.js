import {
   GET_PI_REQUEST,
GET_PI_SUCCESS,
GET_PI_FAIL,
ADD_PRODUCT_SUCCESS,
ADD_PRODUCT_FAIL,
ADD_PRODUCT_REQUEST,
EDIT_QTY_REQUEST,
EDIT_QTY_SUCCESS,
EDIT_QTY_FAIL,
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