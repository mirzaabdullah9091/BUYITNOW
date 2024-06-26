'use client'
import React, { useEffect, useState } from 'react'
import CartContext from '@/context/CartContext'
import { useRouter } from 'next/navigation'
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const router = useRouter()
    useEffect(() => {
        setCartToState()
    }, [])

    const setCartToState = () => {
        setCart(
            localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart"))
                :
                []
        )
    }

    async function addItemToCart({
        product,
        name,
        price,
        image,
        stock,
        seller,
        quantity = 1,
    }) {

        const item = {
            product,
            name,
            price,
            image,
            stock,
            seller,
            quantity,
        };

        const isItemExist = cart?.cartItems?.find(
            (i) => i.product === item.product
        )

        let newCartItems;

        if (isItemExist) {
            newCartItems = cart?.cartItems?.map((i) =>
                i.product === isItemExist.product ? item : i
            );
        } else {
            newCartItems = [...(cart?.cartItems || []), item];
        }

        localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
        setCartToState();
    }

    const deleteCartItems = (id) => {
        const newCartItems = cart?.cartItems?.filter((i) => i.product !== id);

        localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
        setCartToState();
    }
    const saveOnCheckout = ({ amount, tax, totalAmount }) => {
        const checkoutInfo = {
            amount,
            tax,
            totalAmount,
        };

        const newCart = { ...cart, checkoutInfo };

        localStorage.setItem("cart", JSON.stringify(newCart));
        setCartToState();
        router.push("/shipping");
    };


    const clearCart = () => {
        localStorage.removeItem("cart");
        setCartToState()

    }
    return (
        <>
            <CartContext.Provider value={{ cart, deleteCartItems, addItemToCart, saveOnCheckout, clearCart }}>
                {children}
            </CartContext.Provider>
        </>
    )
}

export default CartProvider
