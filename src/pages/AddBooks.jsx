import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react';


const AddBooks = () => {
    const toast=useToast();
    const [formdata,setFormData]=useState({title:"",author:"",description:"",price:"",image:""})

    const {title,author,description,price,image}=formdata
    const onchange=(e)=>{
        setFormData({...formdata,[e.target.name]:e.target.value})
        console.log(formdata)
    }

    const handlesubmit= async(e)=>{
        e.preventDefault();

        try {
            const response= await fetch('https://bookstore-ksae.onrender.com/api/book/addBook/',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'super-secret-key':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NDdmNzI2MmYzOWVlYjk5ZjBmZTQ3N2MiLCJpYXQiOjE2ODYwODI5MDR9.moPDE1ILxtuxZb0RE_v0XqsJiYKCUx7IZaVf1Ft1774"
                },
                body:JSON.stringify(formdata)
            }
            )
            console.log(response)
            const data=await response.json()

            if(response.ok){
                toast({
                    title: "Book Added Successfully",
                    description: "We've added your book for sale",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  })
            }
            else{
                toast({
                    title: "Error",
                    description: "Something went wrong",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  })
            }


        } catch (error) {
            console.log(error)
            toast({
                title: "Error",
                description: "Something went wrong",
                status: "error",
                duration: 9000,
                isClosable: true,

            })
        }
    }

  return (
    <div>
        <div className="container">
  <h2>Add Book</h2>
  <form onSubmit={handlesubmit}>
    <div className="form-group">
      <label htmlFor="title">Title:</label>
      <input type="text" className="form-control" id="title" placeholder='Enter the title..' name='title' onChange={onchange}/>
    </div>
    <div className="form-group">
      <label htmlFor="author">Author:</label>
      <input type="text" className="form-control" id="author" placeholder='Author name..' name='author' onChange={onchange}/>
    </div>
    <div className="form-group">
      <label htmlFor="description">Description:</label>
      <textarea className="form-control" id="description" placeholder='Descripiton...' name='description' onChange={onchange} /> 
    </div>
    <div className="form-group">
      <label htmlFor="price">Price:</label>
      <input type="text" className="form-control" id="price" placeholder='price..(Rs)' name='price' onChange={onchange}/>
    </div>
    <div className="form-group">
      <label htmlFor="image">Image:</label>
      <input type="text" className="form-control" id="price" placeholder='Image url...' name='image' onChange={onchange}/>
    </div>
    <button type="submit" className="btn btn-primary my-3">Submit</button>
  </form>
</div>

    </div>
  )
}

export default AddBooks;