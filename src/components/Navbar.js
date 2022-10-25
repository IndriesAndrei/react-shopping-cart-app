import { Button, Container, Navbar, Modal } from "react-bootstrap";
import { useState, useContext } from "react";
import { CartContext } from "../CartContext";
import CartProduct from "./CartProduct";

const NavbarComponent = () => {
    const cart = useContext(CartContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // total products count on cart
    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

    return (
        <>
            <Navbar expand="sm">
                <Navbar.Brand href="/">ReactStripeApp</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Button onClick={handleShow}>Cart ({productsCount} Items)</Button>
                </Navbar.Collapse>
            </Navbar>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productsCount > 0 ?
                            <>
                                <p>Items in your cart:</p>
                                {cart.items.map((currentProduct, index) => (
                                   <CartProduct key={index} id={currentProduct.id} quantity={currentProduct.quantity}></CartProduct>
                                ))}

                                <h3>Total: {cart.getTotalCost().toFixed(2)}</h3>

                                <Button variant="success">
                                    Purchase items!
                                </Button>
                            </>
                        : 
                        <h3>There are no items in your cart!</h3>
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}

export default NavbarComponent;