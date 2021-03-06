import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import {
  getPiSheetReducer,
  addNewProductReducer,
  editQtyProductReducer,
  deleteItemReducer,
  deleteProductReducer,
  addNewItemReducer
} from './reducers/piReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  piData:   getPiSheetReducer,
  addNewProduct: addNewProductReducer,
  editQtyProduct: editQtyProductReducer,
  deleteItem: deleteItemReducer,
  deleteProduct: deleteProductReducer,
  addNewItem: addNewItemReducer

});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;