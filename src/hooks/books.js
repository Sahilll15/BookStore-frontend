import { useState } from 'react'
import { useToast } from '@chakra-ui/react'

export function useDelete() {
    const [isLoading, setisLoading] = useState(false);
    const toast = useToast();
    const host = `https://bookstore-ksae.onrender.com`;

    const deleteBook = async (id) => {
        setisLoading(true);
        try {
            const response = fetch(`${host}/api/book/delete/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "super-secret-key": localStorage.getItem("super-secret-key"),
                    },

                })


            toast({
                title: 'Book deleted',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error(error);

            toast({
                title: 'Error deleting book',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setisLoading(false);
        }
    };
    return { deleteBook, isLoading };
}


export function useUpdate() {
    const [isLoading, setisLoading] = useState(false);
    const toast = useToast();
    const host = `http://localhost:4000`;

    const updateBook = async (id, bookData) => {
        try {


            const response = fetch(`${host}/api/book/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "super-secret-key": localStorage.getItem("super-secret-key"),
                },
                body: JSON.stringify(bookData),
            })


            // Check if the response was successful
            if (!response.ok) {
                toast({
                    title: 'Book updated',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error(error);
            // Display error toast message
            toast({
                title: 'Error updating book',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setisLoading(false);
        }
    };

    return { updateBook, isLoading };
}
