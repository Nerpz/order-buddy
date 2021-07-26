import axios from 'axios';
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
} from '../constants/piConstants';
import {logout} from './userActions'

export const getPiSheet = (token) => async (dispatch) => {
try {
   dispatch({
      type: GET_PI_REQUEST
   })

   
   const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/pi`, config);
    dispatch({
      type: GET_PI_SUCCESS,
      payload: data,
    });

} catch (error) {
  dispatch({

    type: GET_PI_FAIL,

    payload:

      error.response && error.response.data.message

        ? error.response.data.message

        : error.message,

  });
  if(error.response.data.message === 'Not authorized, token failed' || error.message === 'Not authorized, token failed'){
     dispatch(logout())
  }
}

};

export const addNewProduct = (body) => async (dispatch, getState) => {
try {
   const {
      userLogin: { userInfo },
    } = getState()
   
   dispatch({
      type: ADD_PRODUCT_REQUEST
   })

  
 
   
   const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    

    const { data } = await axios.post(`/api/pi/product`, body, config);

    dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: data
    });

} catch (error) {
   if(error.message === 'Not authorized, token failed'){
      dispatch(logout())
   }
  dispatch({

    type: ADD_PRODUCT_FAIL,

    payload:

      error.response && error.response.data.message

        ? error.response.data.message

        : error.message,

  });
 }
};

export const editQtyProduct = (quantity, productId, itemId) => async (dispatch, getState) => {
      try {
         dispatch({type: EDIT_QTY_REQUEST})
         const {
               userLogin: { userInfo },
            } = getState()
         const config = {headers: {Authorization: `Bearer ${userInfo.token}`}};
         const body = {qty: quantity}
         const data = axios.put(`/api/pi/qty/${productId}/${itemId}`, body, config)

         dispatch({type: EDIT_QTY_SUCCESS, payload: data})
         dispatch({type: GET_PI_REQUEST})
         dispatch({type: GET_PI_SUCCESS, payload: data})


      } catch (error) {
            if(error.message === 'Not authorized, token failed'){
               dispatch(logout())
            }
         dispatch({
            type: EDIT_QTY_FAIL,
         
            payload:
         
               error.response && error.response.data.message
         
               ? error.response.data.message
         
               : error.message,
         
         });
       }
      };
