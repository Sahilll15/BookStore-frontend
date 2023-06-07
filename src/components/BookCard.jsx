
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useDelete, useUpdate } from "../hooks/books";
import { Box, Heading, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from '@chakra-ui/react';
const BookCard = ({ item ,ondeletion}) => {
  const { deleteBook, isLoading }=useDelete();
  const { updateBook }=useUpdate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedBook,setEditedBook]=useState(item);

  const deletebook=async()=>{
    await deleteBook(item._id)
  //  window.location.reload();
 
  }
  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };
  const handleInputChange = (e) => {
    setEditedBook({ ...editedBook, [e.target.name]: e.target.value });
  };


  const handledit=()=>{
    setIsEditModalOpen(true);
    console.log(editedBook)
  }

  const handleUpdateEvent = () => {
    updateBook(item._id,editedBook);
    setIsEditModalOpen(false);
  
  };
  
      const isEventCreatedByUser=localStorage.getItem('super-secret-key');
    return (
      <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      p="4"
      mb="4"
    >
      <div className="col-sm-3 mt-4" key={item._id}>
       
          <div className="card" style={{ width: "22rem",height:"42rem" }}>
            <div className="card-image-container">
            <Link to={`/book/${item._id}`} style={{ textDecoration: "none" }}>
              <img
                style={{ width: "100%", height: "450px" }}
                src={item.image || "default-image.jpg"} 
                className="card-img-top"
                alt="Book Cover"
                onError={(e) => {
                  e.target.src =
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Bhv9K6DJZZkBX2C3s16vO0X6580sWCrxVQ&usqp=CAU";
                }}
              />
                </Link>
            </div>
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">
                {item.description.length > 20
                  ? item.description.substring(0, 40) + "..."
                  : item.description}
              </p>
              <p className="card-text mb-0 mx-2 my-2"><strong>Author: </strong> {item.author}</p>
              <div className="d-flex align-items-center">
                <p className="card-text mb-0 mx-2 my-2"><strong>Price:</strong>  {item.price} Rs</p>
                <i class="fa-solid fa-indian-rupee-sign" style={{marginTop:"10px"}}></i>
                
              </div>
              <a className="btn btn-primary my-2">Add to cart</a>

              {isEventCreatedByUser && (
        <>
          <DeleteIcon marginLeft={10} boxSize={5} mr="2" size="lg"  onClick={deletebook} />
          <EditIcon marginLeft={2} boxSize={5} mr="2" size="lg" onClick={handledit}/>
        </>
      )}
            </div>
          </div>
          
      
      </div>
      
 <Modal isOpen={isEditModalOpen} onClose={handleEditModalClose}>
 <ModalOverlay />
 <ModalContent>
   <ModalHeader>Edit Event</ModalHeader>
   <ModalCloseButton />
   <ModalBody>
     <FormControl mb="4">
       <FormLabel>Title</FormLabel>
       <Input name="title" value={editedBook.title} onChange={handleInputChange} />
     </FormControl>
     <FormControl mb="4">
       <FormLabel>Description</FormLabel>
       <Input name="description" value={editedBook.description} onChange={handleInputChange} />
     </FormControl>
     <FormControl mb="4">
       <FormLabel>Author</FormLabel>
       <Input name="author" value={editedBook.author} onChange={handleInputChange} />
     </FormControl>
     
     <FormControl mb="4">
       <FormLabel>Price</FormLabel>
       <Input name="price" value={editedBook.price} onChange={handleInputChange} />
     </FormControl>
     <FormControl mb="4">
       <FormLabel>Pricing</FormLabel>
       <Input name="image" value={editedBook.image} onChange={handleInputChange} />
     </FormControl>
     <Button colorScheme="teal" onClick={handleUpdateEvent}>
       Update Event
     </Button>
   </ModalBody>
 </ModalContent>
</Modal>
</Box>
      
    );
  };
  
export default BookCard;