import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import FormContainer from '../components/FormContainer'
import { Table, Button, Modal, Form, Row, Col, Container } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import ProductModal from '../components/ProductModal'
import ItemModal from '../components/ItemModal'
import {getPiSheet, addNewProduct, editQtyProduct} from '../actions/piActions'



const HomeScreen = ({history}) => {
   const [showModal, setShowModal] = useState(false);
   const [showItemModal, setShowItemModal] = useState(false);
   const [itemClicked, setItemClicked] = useState({});
   const [productClicked, setProductClicked] = useState({});
  
   const handleShowModal = () => setShowModal(true);
   const handleItemModal = (thisProduct) => {setProductClicked(thisProduct);setShowItemModal(true)};

   const dispatch = useDispatch()
   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

   const piData = useSelector((state)=> state.piData)
   const {loading, error, piInfo} = piData;
   const token = userInfo.token;
   useEffect(() => {
      if (!userInfo) {
        history.push('/login')
      }
    }, [dispatch, history, userInfo])

   useEffect(()=>{
      dispatch(getPiSheet(userInfo.token))
      
   }, [])
   
   const editQtyHandler = async (qty, productId, itemId) => {
     
      dispatch(editQtyProduct(token, qty, productId, itemId))
   }
   
   const clickedItemHandler = (productId, itemId) => {
      setItemClicked({productId, itemId})
   }
   return <FormContainer>
      
      
      {loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>): (
         <>
         <Button variant="primary" className="m-3"onClick={handleShowModal}>
        Add Product
      </Button>
      
     
        
        <ProductModal show={showModal} onHide={()=>{setShowModal(false)}}/>
        
        
        
       
            
            
            {piInfo && piInfo.products && piInfo.products.map((product)=>(
               <>
               <h3><span>{product.title}</span><ItemModal product={product} token={token}/></h3>
               <Table hover size="sm" variant="dark">
               
               <thead>
               <tr>
                  
                  <th>MATERIAL</th>
                  <th>COLOR</th>
                  <th>QTY</th>
                  <th>TH</th>
                  
               </tr>
               </thead>
              
               {product.items && product.items.length > 0 && product.items.map((item)=>(
                  <tr onClick={e=>clickedItemHandler(product._id, item._id)}>
                    

                     
                   
                     <td>{item.material}</td>
                     <td>{item.color}</td>
                     <td>{item.qty}</td>
                     <td>{item.threshold}</td>
                     <td><Button variant='success' size='lg' style={{border: '0px'}} onClick={e=>{e.preventDefault();editQtyHandler(1, product._id, item._id)}}>+</Button><Button variant='danger' size='lg' style={{border: '0px'}} onClick={e=>editQtyHandler(-1, product._id, item._id)}>-</Button></td>
                     
                                      </tr>
               ))}
               </Table>
               </>
            ))}
            
         </>
      )}
   </FormContainer>
}

export default HomeScreen