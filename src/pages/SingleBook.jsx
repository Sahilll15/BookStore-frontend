
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Singlebook.css'
import CartAmountToggle from '../components/CartAmountToggle';
import { useAddCart } from '../hooks/carthooks';
const SingleBook = () => {
  const { addCart, isLoading}=useAddCart();
  const [quantity,setQuantity]=useState(1)
  const { id } = useParams();
  const [book, setBook] = useState(null);
  let host = "https://bookstore-ksae.onrender.com";
  const token =localStorage.getItem("secret-key")

  const setDecrease=()=>{
    if(quantity>1){
      setQuantity(quantity-1)
    }
  }
  const setIncrease=()=>{
    setQuantity(quantity+1)
  }
  

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

  const addtocart=async()=>{
    const response=await addCart(id,quantity)
    console.log(response)
  }

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
            <CartAmountToggle quantity={quantity} setDecrease={setDecrease} setIncrease={setIncrease}/>
            <a className="btn btn-primary my-2" onClick={addtocart}>Add to cart</a>
          </div>
        </div>
      </div>
    </div>
  );
  
};


 

export default SingleBook