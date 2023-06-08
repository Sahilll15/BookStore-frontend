import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";

export function useCreateOrder() {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const createOrder = async (books, totalAmount) => {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:4000/api/order/createOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("secret-key")}`,
                },
                body: JSON.stringify({ books, totalAmount }),
            });

            const data = await response.json();
            if (response.ok) {
                toast({
                    title: "Order created successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Order creation failed",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error);
            toast({
                title: "Order creation failed",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        setIsLoading(false);
    };

    return { createOrder, isLoading };
}
