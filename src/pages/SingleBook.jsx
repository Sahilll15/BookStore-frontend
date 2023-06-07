
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Singlebook.css'
const SingleBook = () => {
  
   const { id } = useParams();
  const [book, setBook] = useState(null);
  let host = "https://bookstore-ksae.onrender.com";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NDdmNmQ2MzgyMDQ1OTE0NjYzYmRjZTYiLCJpYXQiOjE2ODYwNzI4MzZ9.hbOgfgCYiuBfTqfQX8Smg8BWZQ33KiIsmnovvxbz7kA";

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`${host}/api/book/getbook/${id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`

            }  
        });

        const data = await response.json();
        console.log(data.book)
        setBook(data.book);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, []);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 text-center">
          <img src={book.image} alt="Book Cover" className="book-image" />
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <div className="book-details">
            <h1 className="book-title"><strong>Title :</strong> {book.title}</h1>
            <p className="book-info"> <strong>Author:</strong> {book.author}</p>
            <p className="book-info"> <strong>Description:</strong> {book.description}</p>
            <p className="book-info"> <strong>Price:</strong> {book.price} Rs</p>
            <a className="btn btn-primary my-2">Add to cart</a>
          </div>
        </div>
      </div>
    </div>
  );
  
};


 

export default SingleBook