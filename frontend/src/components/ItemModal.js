import {useDispatch} from 'react-redux'
import FormContainer from './FormContainer'
import {useState} from 'react'
import {deleteProductItem, deleteProduct} from '../actions/piActions'
import {Modal, Button, Table, Form, Container} from 'react-bootstrap'

const ItemModal = (props) => {
  const {product, token} = props;

  const [show, setShow] = useState(false);
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('')
  const [quantity, setQuantity] = useState('')
  const [threshold, setThreshold] = useState('')
  const [productstate, setProductState] = useState()
  
  const dispatch = useDispatch()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddItem = () => {
    if(material === '' || color === '' || quantity === '' || threshold === ''  ){
      alert('fill in all fields')
    } else {
      alert('Nice')
    }
  }
  const handleDeleteProduct = ( ) => {
   if(window.confirm('are you sure?')){
     
     dispatch(deleteProduct(token, product._id))
     setShow(false)
   } else {
     return
   }
  }
  const handleDeleteItem = ( itemId) => {
   if(window.confirm('are you sure?')){
    
     dispatch(deleteProductItem(token, product._id, itemId))
   } else {
     return
   }
  }

  return (
    <>
 
      <Button size="sm" className="ms-2" variant="primary" onClick={handleShow}>
        +
      </Button>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{product.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container>
        <Table className="ms-3">
        {product.items && product.items.map((item)=>(
          <tr>
         
          <td>{item.material}</td>
          <td>{item.color}</td>
          <td>{item.qty}</td>
          <td>{item.threshold}</td>
          <td><Button size="sm" onClick={e=>handleDeleteItem(item._id)}>X</Button></td>
          </tr>
        ))}
      
      </Table>
      </Container>
          <FormContainer>

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
          <Form.Label>Initial Quantity</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Current Quantity'
            value={quantity}
            onChange={e=>setQuantity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='threshold'>
          <Form.Label>Warn at Quantity</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Threshold'
            value={threshold}
            onChange={e=>setThreshold(e.target.value)}
          ></Form.Control>
        </Form.Group>
          </FormContainer>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="danger" onClick={handleDeleteProduct}>
            Delete Product
          </Button>
        <Button variant="primary" onClick={handleAddItem}>
            Add Item
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
  //  const {product} = props;
  //  const dispatch = useDispatch()
   
  //  // form inputs
  //  const [material, setMaterial] = useState('');
  //  const [color, setColor] = useState('')
  //  const [quantity, setQuantity] = useState('')
  //  const [threshold, setThreshold] = useState('')
   
  //  const submitHandler = () => {
      
  //     const body = {
  //       material, color, threshold
  //     }
  //     dispatch(addNewProduct(body))
  //  }

  //  return <Modal {...props} size="lg" centered>
  //  <Modal.Header closeButton><Modal.Title>{console.log(product.title)}</Modal.Title></Modal.Header>
  //  <Modal.Body>
  //     <FormContainer>

  //     <Form onSubmit={submitHandler}>
  //       {/* Item Section */}
        
  //       <Form.Group controlId='material'>
  //         <Form.Label>Material</Form.Label>
  //         <Form.Control
  //           type='text'
  //           placeholder='Enter Product Material'
  //           value={material}
  //           onChange={e=>setMaterial(e.target.value)}
  //         ></Form.Control>
  //       </Form.Group>

  //       <Form.Group controlId='color'>
  //         <Form.Label>Color</Form.Label>
  //         <Form.Control
  //           type='text'
  //           placeholder='Enter Color'
  //           value={color}
  //           onChange={e=>setColor(e.target.value)}
  //         ></Form.Control>
  //       </Form.Group>

  //       <Form.Group controlId='quantity'>
  //         <Form.Label>Quantity</Form.Label>
  //         <Form.Control
  //           type='text'
  //           placeholder='Enter Current Quantity'
  //           value={quantity}
  //           onChange={e=>setQuantity(e.target.value)}
  //         ></Form.Control>
  //       </Form.Group>

  //       <Form.Group controlId='threshold'>
  //         <Form.Label>Warning Threshold</Form.Label>
  //         <Form.Control
  //           type='text'
  //           placeholder='Enter Threshold'
  //           value={threshold}
  //           onChange={e=>setThreshold(e.target.value)}
  //         ></Form.Control>
  //       </Form.Group>
        
      
  // <Button type='submit' variant='primary' onClick={props.onHide}>
  //         Add Product
  //       </Button>
  //     </Form>

  
  //     </FormContainer>
  //  </Modal.Body>
  //  </Modal>
}

export default ItemModal