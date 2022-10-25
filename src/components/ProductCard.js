import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { CartContext } from "../CartContext";
import { useContext } from "react";

const ProductCard = (props) => {
    const product = props.product;

    // we have access to all the functions from our Context
    const cart = useContext(CartContext);
    const productQuantity = cart.getProductQuantity(product.id);

    return (
        <Card>
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                { productQuantity > 0 ? <>
                                <Form as={Row}>
                                    <Form.Label column="true" sm="6">In Cart: {productQuantity}</Form.Label>
                                    <Col sm="6">
                                        <Button sm="6" className="mx-2" onClick={() => cart.addOneToCart(product.id)}>+</Button> 
                                        <Button sm="6" className="mx-2" onClick={() => cart.removeOneFromCart(product.id)}>-</Button> 
                                    </Col>
                                    <Button variant="danger" onClick={() => cart.deleteFromCart(product.id)} className="my-2">Remove from cart</Button>
                                </Form>
                            </> 
                            :
                            <Button variant="primary" onClick={() => cart.addOneToCart(product.id)}>Add To Cart</Button>
                }
            </Card.Body>
        </Card>
    )
}

export default ProductCard;