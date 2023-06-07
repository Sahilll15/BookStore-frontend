import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";

export function useAddCart() {
    const toast = useToast();
    const [isLoading, setisLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const host = "https://bookstore-ksae.onrender.com";
    const token = localStorage.getItem("secret-key")
    const addCart = async (bookId, quantity) => {
        setisLoading(true);
        try {
            const response = await fetch(`${host}/api/cart/addtocart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ bookId, quantity }),
            });
            const data = await response.json();
            if (response.ok) {
                toast({
                    title: "Item added to cart",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            }
            else {
                toast({
                    title: "Error adding to cart",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
            setCart(data);
        } catch (error) {
            console.error(error);
            toast({
                title: "Error adding to cart",
                status: "error",
                duration: 3000,
                isClosable: true,
            });

        } finally {
            setisLoading(false);
        }
    };
    return { addCart, isLoading, cart };

}

export function useGetCart() {
    const toast = useToast();
    const [isloading, setisLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const host = "https://bookstore-ksae.onrender.com";
    const token = localStorage.getItem("secret-key")
    const getCart = async () => {
        setisLoading(true);
        try {

            const response = await fetch(`${host}/api/cart/getcartitems`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                toast({
                    title: "Cart Loaded",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });

            }
            else {
                toast({
                    title: "Error Loading cart",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });

            }
            setCart(data.cart.items);
            console.log(data)
            console.log(data.cart.items)
            setisLoading(false);
        } catch (error) {
            console.error(error);
            toast({
                title: "Error Loading cart",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            setisLoading(false);
        }
    }
    return { cart, getCart, isloading };

}