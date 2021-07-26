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
   const [material, setMaterial] = useState('');
   const [color, setColor] = useState('')
   const [quantity, setQuantity] = useState('')
   const [threshold, setThreshold] = useState('')
   
   const submitHandler = () => {
      
      const body = {
         title,
         material,
         color,
         quantity,
         threshold
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
        <Form.Group controlId='material'>
          <Form.Label>Material</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Product Material'
            value={material}
            onChange={e=>setMaterial(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='color'>
          <Form.Label>Color</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Color'
            value={color}
            onChange={e=>setColor(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='quantity'>
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Current Quantity'
            value={quantity}
            onChange={e=>setQuantity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='threshold'>
          <Form.Label>Warning Threshold</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Threshold'
            value={threshold}
            onChange={e=>setThreshold(e.target.value)}
          ></Form.Control>
        </Form.Group>
        
      
  <Button type='submit' variant='primary' onClick={props.onHide}>
          Add Product
        </Button>
      </Form>

  
      </FormContainer>
   </Modal.Body>
   </Modal>
}

export default ProductModal