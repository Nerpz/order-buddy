// showModal state is kept on HomePage
import {useDispatch} from 'react-redux'
import FormContainer from './FormContainer'
import {useState} from 'react'
import {addNewProduct} from '../actions/piActions'
import {Modal, Button, Table, Form} from 'react-bootstrap'

const ProductModal = (props) => {
   const {products} = props;
   const dispatch = useDispatch()
   
   // form inputs
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('')
 
   const submitHandler = () => {
      
      const body = {
         title,
         description
      }
      dispatch(addNewProduct(body))
   }

   return <Modal {...props} size="lg" centered>
   <Modal.Header closeButton><Modal.Title>Print Buddy</Modal.Title></Modal.Header>
   <Modal.Body>
      <FormContainer>
     
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='title'>
          <Form.Label>Product Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Product Title'
            value={title}
            onChange={e=>setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3 mt-2" controlId='title'>
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Product Description'
            value={description}
            onChange={e=>setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

{/* Item Section */}
{/*         
       
         */}
      
  <Button type='submit' variant='primary' onClick={props.onHide}>
          Add Product
        </Button>
      </Form>

  
      </FormContainer>
   </Modal.Body>
   </Modal>
}

export default ProductModal