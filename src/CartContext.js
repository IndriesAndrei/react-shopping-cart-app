import { createContext, useState } from "react";
import { getProductData, productsArray } from "./productsStore";

export const CartContext = createContext({
    // Context (cart, addToCart, removeCart)
    // Provider -> gives your React app access to all the things in your context
    items: [],

    // here we only define the function in context
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
});

// provider here
export const CartProvider = ({children}) => {
    // state specific to our provider
    const [cartProducts, setCartProducts] = useState([]);

    // cart info will have { id, quantity}
    const getProductQuantity = (id) => {
        const quantity = cartProducts.find(product => product.id === id)?.quantity;
        
        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    }

    const addOneToCart = (id) => {
        const quantity = getProductQuantity(id);

        if (quantity === 0) { // product not in cart
            setCartProducts([
                ...cartProducts,
                {
                    id: id,
                    quantity: 1
                }
            ])
        } else { // product is in cart already
            setCartProducts(
                cartProducts.map((product) => 
                    product.id === id 
                        ? { ...product, quantity: product.quantity + 1}
                        : product
                )
            )
        }
    }

    const removeOneFromCart = (id) => {
        const quantity = getProductQuantity(id);

        if (quantity == 1) {
            deleteFromCart(id)
        } else {
            setCartProducts(
                cartProducts.map((product) => 
                    product.id === id 
                        ? { ...product, quantity: product.quantity - 1}
                        : product
                )
            )
        }

    }

    const deleteFromCart = (id) => {
        setCartProducts(
            cartProducts => cartProducts.filter(currentProduct => {
                return currentProduct.id != id;
            }) //[] if an object meets a condition, add the object to the array
        )
    }

    const getTotalCost = () => {
        let totalCost = 0;
        cartProducts.map((cartItem) => {
            const productData = getProductData(cartItem.id);
            totalCost += (productData.price * cartItem.quantity);
        })

        return totalCost;
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
    }
    return <CartContext.Provider value={contextValue}>
        {children}
    </CartContext.Provider>
} 

export default CartProvider;