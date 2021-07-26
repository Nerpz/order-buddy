import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import FormContainer from '../components/FormContainer'
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import ProductModal from '../components/ProductModal'
import {getPiSheet, addNewProduct, editQtyProduct} from '../actions/piActions'



const HomeScreen = ({history}) => {
   const [showModal, setShowModal] = useState(false);
  
  const handleShowModal = () => setShowModal(true);

   const dispatch = useDispatch()
   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

   const piData = useSelector((state)=> state.piData)
   const {loading, error, piInfo} = piData;

   useEffect(() => {
      if (!userInfo) {
        history.push('/login')
      }
    }, [dispatch, history, userInfo])

   useEffect(()=>{
      dispatch(getPiSheet(userInfo.token))
   }, [])

   const editQtyHandler = (qty, productId, itemId) => {
      dispatch(editQtyProduct(qty, productId, itemId))
   }
   return <FormContainer>
     
      
      {loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>): (
         <>
         <Button variant="primary" onClick={handleShowModal}>
        Add Product
      </Button>
      
     
        
        <ProductModal show={showModal} onHide={()=>{setShowModal(false)}}/>
        
         <Table striped bordered hover responsive className='table-sm'>
            
            <thead>
               <tr>
                  <th >PRODUCT</th>
                  <th>MATERIAL</th>
                  <th>COLOR</th>
                  <th>QTY</th>
                  <th>TH</th>
                  
               </tr>
            </thead>
            {piInfo && piInfo.products && piInfo.products.map((product)=>(
               <>
               <tr>
                  <th> {product.title} </th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
               </tr>
               {product.items && product.items.length > 0 && product.items.map((item)=>(
                  <tr>
                     <td></td>
                     <td>{item.material}</td>
                     <td>{item.color}</td>
                     <td>{item.qty}</td>
                     <td>{item.threshold}</td>
                     <td><Button variant='success' size='lg' style={{border: '0px'}} onClick={e=>dispatch(editQtyProduct(1, product._id, item._id))}>+</Button><Button variant='danger' size='lg' style={{border: '0px'}} onClick={e=>editQtyHandler(-1, product._id, item._id)}>-</Button></td>
                                      </tr>
               ))}
               </>
            ))}
         </Table>
         </>
      )}
   </FormContainer>
}

export default HomeScreen